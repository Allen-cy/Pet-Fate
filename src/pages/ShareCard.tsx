import { motion } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReport } from "../lib/api";
import { PetType } from "../types";
import { PET_EMOJIS } from "../data/questions";

const PET_CARD_STYLES: Record<string, { gradient: string; accent: string }> = {
  cat: { gradient: 'radial-gradient(circle at 50% 30%, #6b4e37 0%, #2c2420 100%)', accent: '#E8C9A0' },
  dog: { gradient: 'radial-gradient(circle at 50% 30%, #4A7040 0%, #1A2E1A 100%)', accent: '#A8D88A' },
  rabbit: { gradient: 'radial-gradient(circle at 50% 30%, #5E4480 0%, #2A1F2E 100%)', accent: '#C9B4E8' },
  small: { gradient: 'radial-gradient(circle at 50% 30%, #7A5830 0%, #2E2010 100%)', accent: '#F0C878' },
  fish: { gradient: 'radial-gradient(circle at 50% 30%, #1A4A6A 0%, #0D1E2E 100%)', accent: '#78C8F0' },
  bird: { gradient: 'radial-gradient(circle at 50% 30%, #4A7020 0%, #1A2A10 100%)', accent: '#C8E878' },
};

const PET_NAMES_CN: Record<string, string> = {
  cat: '猫',
  dog: '狗',
  rabbit: '兔子',
  small: '小型啮齿',
  fish: '鱼',
  bird: '鸟'
};

export default function ShareCard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pet = (searchParams.get("pet") as PetType) || "cat";
  const typeName = decodeURIComponent(searchParams.get("typeName") || "独立灵魂的安静陪伴者");
  const sessionId = searchParams.get("sessionId");

  const [keywords, setKeywords] = useState<string[]>(["优雅神秘", "边界感", "深情内敛"]);
  const [loading, setLoading] = useState(false);

  const petEmoji = PET_EMOJIS[pet] || "🐾";
  const cardStyle = PET_CARD_STYLES[pet] || PET_CARD_STYLES.cat;

  useEffect(() => {
    if (sessionId) {
      setLoading(true);
      getReport(sessionId)
        .then((result) => {
          if (result?.keywords && result.keywords.length > 0) {
            setKeywords(result.keywords);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [sessionId]);

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 1040;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const gradient = ctx.createRadialGradient(320, 312, 0, 320, 312, 400);
      const startColor = cardStyle.gradient.includes('#6b4e37') ? '#6b4e37' :
                         cardStyle.gradient.includes('#4A7040') ? '#4A7040' :
                         cardStyle.gradient.includes('#5E4480') ? '#5E4480' :
                         cardStyle.gradient.includes('#7A5830') ? '#7A5830' :
                         cardStyle.gradient.includes('#1A4A6A') ? '#1A4A6A' : '#4A7020';
      const endColor = cardStyle.gradient.includes('#2c2420') ? '#2c2420' :
                       cardStyle.gradient.includes('#1A2E1A') ? '#1A2E1A' :
                       cardStyle.gradient.includes('#2A1F2E') ? '#2A1F2E' :
                       cardStyle.gradient.includes('#2E2010') ? '#2E2010' :
                       cardStyle.gradient.includes('#0D1E2E') ? '#0D1E2E' : '#1A2A10';
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, endColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 640, 1040);

      ctx.fillStyle = 'rgba(232, 201, 160, 0.1)';
      ctx.beginPath();
      ctx.arc(320, 312, 200, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.fillText('🐾 宠物缘分测试', 320, 100);

      ctx.fillStyle = cardStyle.accent;
      ctx.font = 'italic 36px serif';
      ctx.fillText(typeName.split('。')[0], 320, 500);

      ctx.font = '64px Arial';
      ctx.fillText(petEmoji, 320, 620);

      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(100, 900);
      ctx.lineTo(540, 900);
      ctx.stroke();

      const link = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `pet-fate-${pet}.png`;
      a.href = link;
      a.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 bg-surface"
    >
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center shadow-md"
      >
        <span className="material-symbols-outlined text-primary">close</span>
      </button>

      <main className="w-full max-w-[400px] aspect-[640/1040] relative">
        <div
          className="w-full h-full rounded-xl shadow-2xl relative overflow-hidden flex flex-col p-8 text-white border border-white/10"
          style={{ background: cardStyle.gradient }}
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[rgba(232,201,160,0.1)] blur-[100px] rounded-full"></div>

          <div className="flex flex-col items-center gap-2 mb-12">
            <span className="text-sm font-label tracking-[0.2em] opacity-60 uppercase">
              🐾 宠物缘分测试
            </span>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <span className="text-[120px] drop-shadow-2xl filter grayscale-[0.2]">
                {petEmoji}
              </span>
              <div className="absolute -top-4 -right-4">
                <span className="material-symbols-outlined text-[#E8C9A0] text-3xl opacity-50">
                  sparkles
                </span>
              </div>
            </div>
            <div className="text-center space-y-6 z-10">
              <div className="space-y-2">
                <span className="font-headline italic text-xl text-[#E8C9A0] block">
                  The Fated Match
                </span>
                <h2 className="font-headline text-4xl font-bold leading-tight tracking-tight">
                  {typeName.split('。')[0]}
                </h2>
              </div>
              <div className="inline-block px-4 py-1 border border-white/20 rounded-full">
                <span className="text-2xl font-headline tracking-[0.5em] ml-[0.5em]">
                  {PET_NAMES_CN[pet] || pet}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-12">
            <div className="flex justify-center gap-3">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium border border-white/5"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="flex items-end justify-between border-t border-white/10 pt-6">
              <div className="space-y-1">
                <p className="font-headline text-lg italic text-[#E8C9A0]">
                  Your Pet Fate
                </p>
                <p className="text-[10px] opacity-40 tracking-widest uppercase">
                  Archived Soul Connection • 2024
                </p>
              </div>
              <div className="relative group">
                <div className="w-16 h-16 bg-white p-1 rounded-lg">
                  <div className="w-full h-full bg-[#2C2420] rounded-sm flex items-center justify-center p-1">
                    <div className="grid grid-cols-4 gap-0.5 w-full h-full opacity-80">
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white"></div>
                      <div className="bg-white"></div>
                    </div>
                  </div>
                </div>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] whitespace-nowrap opacity-40 tracking-tighter">
                  SCAN TO FIND YOURS
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        </div>

        <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden md:flex">
          <button
            onClick={handleDownload}
            className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined">download</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: '宠物缘分测试',
                  text: `我的宠物缘分是${typeName}，快来测试你的！`,
                  url: window.location.href,
                });
              }
            }}
            className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-primary hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </main>
    </motion.div>
  );
}
