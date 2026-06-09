"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/learn";

type QuizProps = {
  questions: QuizQuestion[];
};

/**
 * Interactive end-of-module quiz. Each question locks once answered and shows
 * whether the pick was right along with an explanation. A running tally and a
 * final summary close it out. No motion library, so it is reduced-motion safe
 * by construction; the only transitions are CSS color changes the global
 * reduced-motion rule already neutralizes.
 */
export function Quiz({ questions }: QuizProps) {
  // Maps question id to the index of the option the learner picked.
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.reduce(
    (total, question) =>
      answers[question.id] === question.answerIndex ? total + 1 : total,
    0,
  );
  const allAnswered = answeredCount === questions.length;

  function choose(questionId: string, optionIndex: number) {
    setAnswers((prev) =>
      // Once answered, the choice is locked so feedback stays stable.
      prev[questionId] !== undefined
        ? prev
        : { ...prev, [questionId]: optionIndex },
    );
  }

  function reset() {
    setAnswers({});
  }

  return (
    <section
      aria-label="Check your understanding"
      className="rounded-wei-lg border border-wei-line bg-wei-paper-dim p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-wei-display text-wei-xl font-semibold text-wei-ink">
          Check your understanding
        </h2>
        <p className="text-wei-sm text-wei-ink/60" aria-live="polite">
          {answeredCount} of {questions.length} answered
        </p>
      </div>

      <ol className="mt-6 space-y-8">
        {questions.map((question, questionIndex) => {
          const chosen = answers[question.id];
          const answered = chosen !== undefined;
          const wasCorrect = chosen === question.answerIndex;

          return (
            <li key={question.id}>
              <fieldset>
                <legend className="text-wei-base font-semibold text-wei-ink">
                  {questionIndex + 1}. {question.prompt}
                </legend>

                <div className="mt-3 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isChosen = chosen === optionIndex;
                    const isAnswer = question.answerIndex === optionIndex;

                    let stateClass =
                      "border-wei-line bg-wei-paper text-wei-ink hover:border-wei-emerald";
                    if (answered) {
                      if (isAnswer) {
                        stateClass =
                          "border-wei-emerald bg-wei-emerald/10 text-wei-ink";
                      } else if (isChosen) {
                        stateClass =
                          "border-wei-amber bg-wei-amber/10 text-wei-ink";
                      } else {
                        stateClass =
                          "border-wei-line bg-wei-paper text-wei-ink/50";
                      }
                    }

                    return (
                      <button
                        key={optionIndex}
                        type="button"
                        disabled={answered}
                        aria-pressed={isChosen}
                        onClick={() => choose(question.id, optionIndex)}
                        className={`flex w-full items-center justify-between gap-3 rounded-wei-md border px-4 py-3 text-left text-wei-sm transition-colors disabled:cursor-default ${stateClass}`}
                      >
                        <span>{option}</span>
                        {answered && isAnswer ? (
                          <span
                            aria-hidden="true"
                            className="shrink-0 font-semibold text-wei-emerald-deep"
                          >
                            &#10003;
                          </span>
                        ) : null}
                        {answered && isChosen && !isAnswer ? (
                          <span
                            aria-hidden="true"
                            className="shrink-0 font-semibold text-wei-amber"
                          >
                            &#10007;
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {answered ? (
                  <p
                    role="status"
                    className={`mt-3 text-wei-sm ${
                      wasCorrect ? "text-wei-emerald-deep" : "text-wei-ink/75"
                    }`}
                  >
                    <span className="font-semibold">
                      {wasCorrect ? "Correct. " : "Not quite. "}
                    </span>
                    {question.explanation}
                  </p>
                ) : null}
              </fieldset>
            </li>
          );
        })}
      </ol>

      {allAnswered ? (
        <div
          role="status"
          className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-wei-line pt-6"
        >
          <p className="text-wei-base font-semibold text-wei-ink">
            You got {correctCount} of {questions.length}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-wei-pill border border-wei-emerald px-4 py-2 text-wei-sm font-medium text-wei-emerald-deep transition-colors hover:bg-wei-emerald hover:text-wei-paper"
          >
            Try again
          </button>
        </div>
      ) : null}
    </section>
  );
}
