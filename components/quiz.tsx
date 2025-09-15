"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import Confetti from "react-confetti";

import { challengeOptions, challenges } from "@/db/schema";
import { useQuiz } from "@/store/quiz";

import { Header } from "./quiz/header";
import { QuestionBubble } from "./quiz/question-bubble";
import { Challenge } from "./quiz/challenge";
import { Footer } from "./quiz/footer";
import { ResultCard } from "./quiz/result-card";

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
};

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
}: Props) => {
  const {
    hearts,
    currentLessonChallenges,
    activeChallenge,
    activeChallengeIndex,
    sendAttempt,
    next,
  } = useQuiz((state) => ({
    hearts: state.hearts,
    currentLessonChallenges: state.currentLessonChallenges,
    activeChallenge: state.activeChallenge,
    activeChallengeIndex: state.activeChallengeIndex,
    sendAttempt: state.sendAttempt,
    next: state.next,
  }));
  
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onNext = () => {
    setSelectedOption(undefined);
    next();
  };

  const onCheck = () => {
    if (!selectedOption) return;

    const correctOption = activeChallenge?.challengeOptions.find(
      (option) => option.correct
    );

    if (correctOption && correctOption.id === selectedOption) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
  };

  const handleCorrect = () => {
    toast.success("Correct!");
    setStatus("correct");
  };

  const handleIncorrect = () => {
    toast.error("Incorrect!");
    setStatus("wrong");
  };

  if (!activeChallenge) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          {/* TODO: Add image */}
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard
              variant="points"
              value={currentLessonChallenges.length * 10}
            />
            <ResultCard
              variant="hearts"
              value={hearts}
            />
          </div>
        </div>
        <Footer
          lessonId={initialLessonId}
          status="completed"
          onCheck={() => {}}
        />
      </>
    );
  }

  const title = activeChallenge.type === "ASSIST"
    ? "Select the correct meaning"
    : activeChallenge.question;
  
  return (
    <>
      <Header
        hearts={hearts}
        percentage={0} // TODO: Calculate percentage
        hasActiveSubscription={false}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {activeChallenge.type === "ASSIST" && (
                <QuestionBubble question={activeChallenge.question} />
              )}
              <Challenge
                options={activeChallenge.challengeOptions}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false} // TODO: Add disabled logic
                type={activeChallenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={!selectedOption}
        status={status}
        onCheck={onCheck}
        onNext={onNext}
      />
    </>
  );
};