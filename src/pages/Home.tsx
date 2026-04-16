import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-32"
    >
      {/* Hero Section */}
      <section className="px-6 max-w-screen-xl mx-auto py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-primary text-xs font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">
              temp_preferences_custom
            </span>
            命中注定的相遇
          </div>
          <h1 className="text-4xl md:text-7xl leading-tight text-on-surface font-headline font-bold">
            发现你命中注定的
            <br />
            <span className="italic text-primary">毛茸伙伴</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed font-body">
            基于性格特征与情感需求，探索 18
            道灵魂考题，匹配你的专属缘分。让灵魂在呼吸间找到共鸣。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/question"
              className="px-10 py-5 bg-primary text-on-primary rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10 text-center"
            >
              开始缘分测试
            </Link>
            <button className="px-10 py-5 bg-transparent border border-outline-variant text-primary rounded-full font-bold text-lg hover:bg-surface-container-low transition-colors">
              探索图鉴
            </button>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 bg-primary-fixed opacity-20 rounded-xl rotate-3"></div>
            <div className="absolute inset-4 overflow-hidden rounded-xl bg-surface-container-high shadow-2xl">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChH1kdm1boP_G6ddzgE4xz0zACsAzydMChOvsqeLSVl119G6-gsvmJsgmIZVzaCCEaiBheeGv0EPNkwCab7tIUGNwPx21oCeHiucC07t5OXNpk-Fw19sIAiyFjJSE7vJ0WID0Pry4Uhc8n2CmtnA3WI1gfpPtQUV_czOecgM604XsKzR3rF2nu1nnfgEUuHcE9QDg75oSXsTfi3Yx4Mt0CUd9oDFGw26hbZv7NDeS5h3L_Nvi66J6S4IlFygrIOiJWreIsnzuc9x8"
                alt="Cat"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border-[12px] border-surface shadow-2xl z-10 rotate-[-6deg]">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvqNN4lqWK948kzKtW5YdDFCb6a4mGOr-b1ZPAHDTdALvLvZsqc9RbZ8w8hjxqDeLoOwehRxq-qQsYhTnfAAr0OC5ve5Lk9y2U2kn7ZItCM6lVRQma-6Q0nRqTL5A9mSdKeMIbDHUmp1Bx4_gxGj4GmIfPWAtNwXsbr7hhEO8iPtqJ2_xNCLFBmkqxhs1uXdt3Y9HhFVBRzR_-LcTjqb9eMRh8JWJJ1KJBjCZnNxnMSicK-YqmtAT7uAuamLGAECl9iTeEcRdWwrk"
                alt="Dog"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-6 max-w-screen-xl mx-auto py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-headline font-bold mb-4">
              灵魂档案室
            </h2>
            <p className="text-on-surface-variant">
              每一个生命都有其独特的灵魂频率。通过我们的档案，预见你未来的伴侣。
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-[#E8C9A0] p-8 min-h-[400px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-9xl">pets</span>
            </div>
            <div className="relative z-10">
              <span className="bg-white/30 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-primary-fixed mb-4 inline-block">
                The Independent Soul
              </span>
              <h3 className="text-4xl font-headline font-bold text-on-primary-fixed mb-2">
                灵动猫咪
              </h3>
              <p className="text-on-primary-fixed-variant max-w-sm mb-6">
                适合寻求安静陪伴、尊重个人空间、且享受细腻情感流动的你。
              </p>
              <a
                className="inline-flex items-center gap-2 font-bold text-on-primary-fixed group-hover:gap-4 transition-all"
                href="#"
              >
                了解匹配细节{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full hidden md:block overflow-hidden rounded-l-full">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKN5_qZ2_2L4MtQWmHD64-T3XOdSr69kI_uy2Rorc0N6T7ukNFoz0GU_mAV97zaYJPn2WK5uR8SB4m0woYhalnAgVVznxuWshNscUYautTJ3IPlzdusJjhl3u8-2sVglR4cmeB4wOmXeIZUmft6RG5iP6KZxVNeTKRHRsvNQhhCodooW0ICiiEaGR2z-6buGFkzzKAQmOx7gX_5lthvIpOId341U6Z2SftbpX8RdIJsSvOrW-kqrBqe2EDKcAnRM8KlVi3R4JHZ1M"
                alt="Cat"
              />
            </div>
          </div>
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-secondary-container p-8 min-h-[400px] flex flex-col justify-between">
            <div>
              <span className="bg-white/30 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-secondary-fixed mb-4 inline-block">
                The Loyal Guardian
              </span>
              <h3 className="text-3xl font-headline font-bold text-on-secondary-fixed">
                忠诚犬类
              </h3>
            </div>
            <div>
              <p className="text-on-secondary-fixed-variant mb-6">
                活力、热情、无条件的爱。为你的一天注入无限能量。
              </p>
              <img
                className="w-full h-full object-cover rounded-lg aspect-video mb-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZrxdyaN16Udukd7lgjl7JzaJ6V8i6TZbjvuSKpSr4Z6HMAlb4mK59msLIdg2Kkl23GUmc15lTxlRYQrrZHhAg1BJ00NbiwKkAJf3FgCvT0Cm9q6ZxMdFSkJJPkYTxm253pjd82ASlbFKz-eUXBm8BnP7vLr88Zd6BnScEJ3F51-MkId3MrESvTQvCu4W-jUUw1TIN-H9qZ-EcGjDNZdatzB0ILXkyHv4h1lbtsoL2t7TzlXME3PwlKH2SYEYey7Pk-dqZXta0qSI"
                alt="Dog"
              />
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
