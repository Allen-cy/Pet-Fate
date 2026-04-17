import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { questions } from "../data/questions";
import { Answer } from "../types";
import { calcResult, getDimScores } from "../lib/scoring";
import { createSession } from "../lib/api";

export default function Question() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = useCallback(async (optionIndex: number) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      optionIndex,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setIsSubmitting(true);
      try {
        const petResult = calcResult(newAnswers);
        const dimScores = getDimScores(newAnswers);

        const result = await createSession(newAnswers);
        navigate(`/report?sessionId=${result.sessionId}&pet=${petResult}&typeName=${encodeURIComponent(result.typeName || '')}`);
      } catch (error) {
        console.error('Failed to create session:', error);
        navigate(`/report?pet=${petResult}&typeName=`);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentQuestion, answers, isLastQuestion, navigate]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center bg-background text-on-background"
    >
      <header className="w-full fixed top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                auto_awesome
              </span>
              <span className="font-headline italic text-xl tracking-tight text-primary">
                Your Pet Fate
              </span>
            </div>
            <div className="font-body font-bold text-xs tracking-widest text-primary/60 uppercase">
              Question {String(currentIndex + 1).padStart(2, '0')} / {questions.length}
            </div>
          </div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-32 pb-12 flex flex-col justify-center">
        <div className="mb-12 flex justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-secondary-container/20 rounded-xl blur-3xl"></div>
            <img
              className="w-full h-full object-cover rounded-xl shadow-sm relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxn1hiCOmInWmU5SfvA28HAftnkFKfb4ncn5Kwc6FyM7IZXJ5BNjpnhR-LxGLrCPmZGjRzIGzLtcZn8X-yF0MS8UiAcMRVFdVoW4gugn1Lg9SnIB4ncooz9WPC7Dr4Lv3U9V6ff1qsUvvaSndlfzhhitftx6be_xKGnNaqBzPcvYY3DY0NZIbLgQcB309XA-LDWopiMcluAerGYxR5IJbqVafOmF-Dovay0KTWXNryVIE_y4-k1cXHy4oZ36xmKM-mB3Mc68h5670"
              alt="Study"
            />
          </div>
        </div>

        <section className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface font-normal leading-tight mb-4">
            {currentQuestion.text}
          </h1>
          <p className="text-on-surface-variant font-body text-lg">
            诚实面对内心，感受你最真实的生活律动。
          </p>
        </section>

        <div className="grid grid-cols-1 gap-4 w-full">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isSubmitting}
              className="group w-full text-left p-6 bg-surface-container-lowest hover:bg-surface-container-high rounded-lg transition-all duration-300 flex items-center justify-between border border-transparent hover:border-outline-variant/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-6">
                <span className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-body font-bold text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-xl font-body font-medium text-on-surface">
                  {option.text}
                </span>
              </div>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-primary transition-opacity">
                arrow_forward
              </span>
            </button>
          ))}
        </div>

        <footer className="mt-12 flex justify-center items-center gap-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span className="font-body text-sm font-semibold tracking-wide uppercase">
              Previous
            </span>
          </button>
          <div className="h-4 w-px bg-outline-variant/30"></div>
          <button
            onClick={handleSkip}
            disabled={isLastQuestion || isSubmitting}
            className="text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="font-body text-sm font-semibold tracking-wide uppercase">
              Skip Question
            </span>
          </button>
        </footer>

        {isSubmitting && (
          <div className="mt-8 text-center">
            <p className="text-primary font-body">正在提交答案...</p>
          </div>
        )}

        {/* 最后一题底部悬浮提交按钮 */}
        {isLastQuestion && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <button
              onClick={() => handleAnswer(answers.length > 0 ? answers[answers.length - 1].optionIndex : 0)}
              className="bg-primary text-on-primary px-12 py-5 rounded-full font-bold text-lg shadow-xl shadow-primary/20 flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">check</span>
              查看我的缘分报告
            </button>
          </motion.div>
        )}
      </main>

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-secondary-fixed-dim/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[-10%] w-[35rem] h-[35rem] bg-tertiary-fixed/10 rounded-full blur-[100px]"></div>
      </div>
    </motion.div>
  );
}
