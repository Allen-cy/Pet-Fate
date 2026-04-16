import { motion } from "motion/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPayment } from "../lib/api";
import { PetType } from "../types";
import { PET_EMOJIS } from "../data/questions";

export default function Destiny() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pet = (searchParams.get("pet") as PetType) || "cat";
  const typeName = decodeURIComponent(searchParams.get("typeName") || "独立灵魂的安静陪伴者");
  const sessionId = searchParams.get("sessionId");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const petEmoji = PET_EMOJIS[pet] || "🐾";

  const handleUnlockReport = async () => {
    if (!sessionId) {
      setError("缺少会话 ID，请重新开始测试");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await createPayment(sessionId);

      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        navigate(`/report?sessionId=${sessionId}&pet=${pet}&typeName=${encodeURIComponent(typeName)}&paid=true`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError("支付接口暂时不可用，请稍后重试");
      setIsProcessing(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-32 px-6 fate-gradient-bg"
    >
      <div className="max-w-xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary/60">
            你的宿命指引 · Your Destiny
          </span>
          <h2 className="text-5xl md:text-6xl font-headline text-on-surface tracking-tight">
            命运之契
          </h2>
        </section>

        <div className="relative group">
          <div className="absolute -inset-4 bg-primary-fixed/20 blur-3xl rounded-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_rgba(114,85,61,0.06)] overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
            <div className="relative h-[450px] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDgF9MsK4NhSMUDq3_EYAKTo0ArteCpg5__cNSioX46hfmDxJuyWzomne1OaNdWhD45HHNfJYRGYUMJCVqMeJIY-pcYK3RArWT1mtWlk3G9X5ooVDLFQ4cNzanVPjuFOX2vKmv61HrDtj7qXgHGOyAVuDikxLDEdyD6USgIV2eDCFiBEvL1LSwWDNpxnn0eDN-g9sC9l_rqmPAcPSWle8FhVSoIYqIK_haxUIvBTwPZ9hnqZx7Em3BQoH9GtnOAIB2YqAOh3u9pKk"
                alt="Cat"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-4xl font-headline italic mb-1">
                  {petEmoji} {pet === 'cat' ? '猫' : pet === 'dog' ? '狗' : pet === 'rabbit' ? '兔子' : pet === 'small' ? '小型啮齿' : pet === 'fish' ? '鱼/爬行类' : '鸟/鹦鹉'}
                </h3>
                <p className="text-lg font-body opacity-90 tracking-wide">
                  {typeName}
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-8 cat-category-blend">
              <div className="space-y-6">
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 rounded-full bg-surface-container-high text-xs font-label tracking-wider text-primary">
                    灵性感应
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-surface-container-high text-xs font-label tracking-wider text-primary">
                    独立边界
                  </span>
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-2xl text-primary italic">
                    "在静谧中，听见灵魂的回响。"
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-body text-lg">
                    你的灵魂深处拥有一种罕见的宁静力量。正如猫科动物在夜色中穿行，你不随波逐流，始终保持着清晰的自我边界与观察力。你不需要喧闹的认同，更倾向于在高质量的独处中汲取能量。这种对精神自由的追求，预示着你与猫之间存在着一种跨越物种的默契：你们不相互占有，却在彼此的沉默中找到了最深层次的理解。这份宿命的联结并非巧合，而是源于你内心深处对纯粹与真实的渴望，它隐藏在那些未曾言说的习惯中，等待着被彻底唤醒...
                  </p>
                </div>
              </div>
              <div className="pt-8">
                <button
                  onClick={handleUnlockReport}
                  disabled={isProcessing}
                  className="block w-full text-center bg-primary text-on-primary py-6 rounded-full text-xl font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "正在跳转支付..." : "解锁完整报告 ¥9.9"}
                </button>
                {error && (
                  <p className="text-center mt-4 text-error text-sm">{error}</p>
                )}
                <p className="text-center mt-4 text-xs font-label text-primary/40 uppercase tracking-widest">
                  包含性格深度解析、契合度雷达图及喂养灵感
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-8 rounded-xl space-y-4">
            <span className="material-symbols-outlined text-primary">
              auto_stories
            </span>
            <h5 className="font-headline text-xl italic text-primary">
              性格底色
            </h5>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              你的性格中融合了水一般的柔和与火一般的决绝。这种矛盾的平衡使你能够洞察他人忽略的细微情感。
            </p>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl space-y-4">
            <span className="material-symbols-outlined text-primary">
              history_edu
            </span>
            <h5 className="font-headline text-xl italic text-primary">
              契合预言
            </h5>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              在未来的日子里，一个拥有翡翠般双眸的伙伴将闯入你的生活，它将教你如何重新定义陪伴的含义。
            </p>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
