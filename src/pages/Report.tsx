import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReport, generateReport } from "../lib/api";
import { PetType } from "../types";
import { PET_NAMES, PET_EMOJIS } from "../data/questions";

const PET_IMAGES: Record<string, string> = {
  cat: "https://lh3.googleusercontent.com/aida-public/AB6AXuCu8edkT4tJst9BHBqOB7zbRKygq8CGkmzLITgDXkN6BolGqT5c1N8ehNj9KK6WgohJEkhAogc3uWXhM8t3H3GyUCCxmYOTfDs6Q7uz_WIZO_qr97____f0RfJuRIBhfIb4odnNl2M6eFcj6LX0ssto_oQRMRN7umY01uUisF6h8f2WmIAaGe3_tebcFW8dJppXqz1bA6StdTpinQLYIa8NkUgTfkLa5gL1grav4H5dyupJY7OIBP-El5hadBRgrxi9ho0Ydfxv8G8",
  dog: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc0J737wdSXGOc5zECXagf7vyx7SklaPBwlbBQR4l96olG2PdCz1R3NKtJ0GfNHMiIKtplHbfT11j-tpb4jzVw0J9bS63MHPYJXOH6exoYKxASu64moMrZhCfAb9CxIPQrdmltUcVNcDr0ln-eAQ1NjRWltAu4Dusb0B469qVMOY2_g9e-XZR3VkwH_7Pos51RJg-SINhAU91qBPBrU0i2SW0Fh1kwD4I0UqafQQnRDwabg_LU5yCdGn4ijrABiVWaTMbz5T515Ko",
};

export default function Report() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const initialPet = (searchParams.get("pet") as PetType) || "cat";
  const initialTypeName = decodeURIComponent(searchParams.get("typeName") || "");

  const [report, setReport] = useState<{
    type_name?: string;
    why_fit?: string;
    daily_scene?: string;
    reminder?: string;
    keywords?: string[];
    personality_base?: string;
    prophecy?: string;
  } | null>(null);
  const [pet, setPet] = useState<PetType>(initialPet);
  const [typeName, setTypeName] = useState(initialTypeName);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        // 先尝试获取已生成的报告
        const result = await getReport(sessionId);
        if (result && result.type_name) {
          setReport(result);
          setTypeName(result.type_name || initialTypeName);
        } else {
          // 没有报告，自动触发AI生成
          setGenerating(true);
          const generated = await generateReport(sessionId);
          setReport(generated);
          setTypeName(generated.type_name || initialTypeName);
        }
      } catch (err) {
        console.error('Failed to fetch report:', err);
        setError("无法获取报告，请稍后重试");
      } finally {
        setLoading(false);
        setGenerating(false);
      }
    };

    fetchReport();
  }, [sessionId, initialPet, initialTypeName]);

  if (loading || generating) {
    return (
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="pt-24 pb-32 px-6 max-w-screen-md mx-auto flex flex-col items-center justify-center min-h-screen"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-primary font-headline text-xl">
            {generating ? "AI 正在生成你的专属报告..." : "正在加载..."}
          </p>
          <p className="text-on-surface-variant mt-2">
            {generating ? "请稍候，预计需要 5-10 秒" : "请稍候"}
          </p>
        </div>
      </motion.main>
    );
  }

  if (error) {
    return (
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="pt-24 pb-32 px-6 max-w-screen-md mx-auto"
      >
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-error text-6xl mb-4">error</span>
          <p className="text-error font-headline text-xl">{error}</p>
          <Link to="/" className="text-primary mt-4 inline-block underline">
            返回首页
          </Link>
        </div>
      </motion.main>
    );
  }

  const petName = PET_NAMES[pet] || pet;
  const petEmoji = PET_EMOJIS[pet] || "🐾";
  const petImage = PET_IMAGES[pet] || PET_IMAGES.cat;
  const keywords = report?.keywords?.length ? report.keywords : ["优雅神秘", "边界感", "深情内敛"];

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-32 px-6 max-w-screen-md mx-auto"
    >
      <header className="mb-12 text-center">
        <div className="inline-block px-4 py-1 bg-surface-container-high rounded-full text-primary font-label text-[10px] uppercase tracking-widest font-bold mb-4">
          Exclusive AI Analysis
        </div>
        <h1 className="font-headline text-5xl md:text-6xl text-primary leading-tight tracking-tight mb-6">
          你的专属缘分报告
        </h1>
        <p className="font-headline italic text-on-surface-variant text-xl opacity-80">
          "在这喧嚣的世界，总有一个灵魂在静候与你相遇。"
        </p>
      </header>

      {/* 缘分对象展示 */}
      <section className="relative mb-16 group">
        <div className="absolute -inset-4 bg-tertiary-fixed opacity-10 blur-3xl rounded-full"></div>
        <div className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm aspect-[4/5] md:aspect-video mb-8">
          <img
            className="w-full h-full object-cover"
            src={petImage}
            alt={petName}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-on-surface/60 to-transparent">
            <h2 className="text-white font-headline text-3xl">
              缘分对象：{petEmoji} {petName}
            </h2>
            {typeName && (
              <p className="text-white/80 font-label">
                {typeName}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 铲屎官人格关键词 */}
      <section className="mb-16">
        <div className="flex flex-wrap gap-4 justify-center">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="bg-surface-container-high px-8 py-4 rounded-full flex flex-col items-center"
            >
              <span className="text-primary font-headline text-2xl">{keyword}</span>
              <span className="text-on-surface-variant text-[10px] uppercase tracking-widest">
                {index === 0 ? "Flow" : index === 1 ? "Boundary" : "Self-Joy"}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-on-surface-variant font-medium">
          —— 铲屎官人格关键词 ——
        </p>
      </section>

      {/* 性格底色 */}
      {report?.personality_base && (
        <section className="mb-12 bg-surface-container-low p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">psychology</span>
            <h3 className="font-headline text-2xl text-primary">性格底色</h3>
          </div>
          <p className="text-on-surface-variant text-lg leading-relaxed italic">
            "{report.personality_base}"
          </p>
        </section>
      )}

      {/* 为什么适合你 */}
      <div className="space-y-16">
        <section className="relative">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">favorite</span>
            </div>
            <div>
              <h3 className="font-headline text-3xl mb-6 text-primary">
                为什么适合你
              </h3>
              <div className="prose prose-stone leading-relaxed text-on-surface-variant space-y-4 text-lg">
                <p className="whitespace-pre-wrap">{report?.why_fit || "正在加载你的性格分析..."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 你们在一起的日常场景 */}
        <section className="bg-surface-container-low p-10 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-9xl">
              auto_stories
            </span>
          </div>
          <h3 className="font-headline text-3xl mb-6 text-primary">
            你们在一起的日常场景
          </h3>
          <div className="relative z-10">
            <p className="font-headline italic text-2xl text-primary-container leading-snug mb-4">
              "{report?.daily_scene || "正在生成你们的日常场景..."}"
            </p>
          </div>
        </section>

        {/* 一个小提醒 */}
        <section className="relative">
          <div className="flex flex-col gap-8 items-start">
            <div className="shrink-0 w-12 h-12 bg-tertiary rounded-full flex items-center justify-center text-on-tertiary">
              <span className="material-symbols-outlined">tips_and_updates</span>
            </div>
            <div>
              <h3 className="font-headline text-3xl mb-6 text-primary">
                一个小提醒
              </h3>
              <div className="prose prose-stone leading-relaxed text-on-surface-variant space-y-4 text-lg">
                <p>{report?.reminder || "正在生成养宠提醒..."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 契合预言 */}
        {report?.prophecy && (
          <section className="bg-gradient-to-br from-primary/5 to-tertiary-fixed/10 p-10 rounded-xl border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h3 className="font-headline text-3xl text-primary">契合预言</h3>
            </div>
            <p className="text-on-surface-variant text-lg leading-relaxed italic">
              "{report.prophecy}"
            </p>
          </section>
        )}
      </div>

      {/* 底部导航 */}
      <footer className="mt-20 flex flex-col items-center">
        <Link
          to={`/share?pet=${pet}&typeName=${encodeURIComponent(typeName)}&sessionId=${sessionId || ''}`}
          className="bg-primary text-on-primary px-12 py-5 rounded-full font-bold tracking-wide shadow-xl flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          <span className="material-symbols-outlined">share</span>
          生成分享卡片
        </Link>
        <Link to={`/destiny?pet=${pet}&typeName=${encodeURIComponent(typeName)}&sessionId=${sessionId || ''}`} className="mt-4 text-primary underline text-sm">
          查看命运之契
        </Link>
        <p className="mt-6 text-on-surface-variant/40 text-sm font-label uppercase tracking-widest">
          Fate is written in the stars, but held in your hands
        </p>
      </footer>

      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-tertiary-fixed blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary-fixed-dim blur-[150px]"></div>
      </div>
    </motion.main>
  );
}
