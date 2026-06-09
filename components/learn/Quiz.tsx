"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/learn";

type OptionState = "idle" | "selected" | "correct" | "incorrect" | "muted";

/**
 * Self-check quiz for a module. The reader picks an answer per question, then
 * checks all answers at once. After checking, each question shows whether it
 * was right and why. Correctness is shown with words as well as color, so it
 * does not depend on color alone, and nothing here animates, so it is fine
 * under reduced motion.
 */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(selected).length;
  const allAnswered = answeredCount === questions.length;

  const score = useMemo(
    () =>
      questions.reduce(
        (total, q) => (selected[q.id] === q.answerIndex ? total + 1 : total),
        0,
      ),
    [questions, selected],
  );

  function optionState(q: QuizQuestion, index: number): OptionState {
    const choice = selected[q.id];
    if (!submitted) return choice === index ? "selected" : "idle";
    if (index === q.answerIndex) return "correct";
    if (index === choice) return "incorrect";
    return "muted";
  }

  function reset() {
    setSelected({});
    setSubmitted(false);
  }

  return (
    <div>
      <ol className="space-y-8">
        {questions.map((q, qIndex) => {
          const choice = selected[q.id];
          const isCorrect = submitted && choice === q.answerIndex;
          return (
            <li key={q.id}>
              <fieldset disabled={submitted}>
                <legend className="font-wei-display text-wei-lg font-semibold text-wei-ink">
                  <span className="text-wei-emerald-deep">{qIndex + 1}.</span>{" "}
                  {q.prompt}
                </legend>

                <div className="mt-4 space-y-2.5">
                  {q.options.map((option, oIndex) => {
                    const state = optionState(q, oIndex);
                    const inputId = `${q.id}-${oIndex}`;
                    return (
                      <label
                        key={inputId}
                        htmlFor={inputId}
                        className={`flex cursor-pointer items-start gap-3 rounded-wei-md border p-3.5 text-wei-base transition-colors ${optionClasses(
                          state,
                        )}`}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name={q.id}
                          checked={choice === oIndex}
                          onChange={() =>
                            setSelected((prev) => ({ ...prev, [q.id]: oIndex }))
                          }
                          className="mt-1 h-4 w-4 shrink-0 accent-wei-emerald"
                        />
                        <span className="flex-1">{option}</span>
                        {submitted && state === "correct" ? (
                          <span className="shrink-0 text-wei-xs font-semibold uppercase tracking-wide text-wei-emerald-deep">
                            Correct
                          </span>
                        ) : null}
                        {submitted && state === "incorrect" ? (
                          <span className="shrink-0 text-wei-xs font-semibold uppercase tracking-wide text-wei-amber">
                            Your pick
                          </span>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {submitted ? (
                <p className="mt-3 rounded-wei-md bg-wei-paper-dim p-3.5 text-wei-sm text-wei-ink/80">
                  <span
                    className={`font-semibold ${
                      isCorrect ? "text-wei-emerald-deep" : "text-wei-ink"
                    }`}
                  >
                    {isCorrect ? "Correct. " : "Not quite. "}
                  </span>
                  {q.explanation}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="inline-flex items-center rounded-wei-pill bg-wei-emerald px-6 py-2.5 text-wei-sm font-semibold text-wei-paper transition-colors hover:bg-wei-emerald-deep disabled:cursor-not-allowed disabled:bg-wei-ink/20 disabled:text-wei-ink/50"
            >
              Check answers
            </button>
            {!allAnswered ? (
              <p className="text-wei-sm text-wei-ink/55">
                Answer all {questions.length} questions to check your work.
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p
              aria-live="polite"
              className="text-wei-lg font-semibold text-wei-ink"
            >
              You got {score} of {questions.length} right.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center rounded-wei-pill border border-wei-emerald-deep px-6 py-2.5 text-wei-sm font-semibold text-wei-emerald-deep transition-colors hover:bg-wei-emerald hover:text-wei-paper"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function optionClasses(state: OptionState): string {
  switch (state) {
    case "selected":
      return "border-wei-emerald-deep bg-wei-emerald/5 text-wei-ink";
    case "correct":
      return "border-wei-emerald-deep bg-wei-emerald/10 text-wei-ink";
    case "incorrect":
      return "border-wei-amber bg-wei-amber/10 text-wei-ink";
    case "muted":
      return "border-wei-line bg-wei-paper text-wei-ink/55";
    default:
      return "border-wei-line bg-wei-paper text-wei-ink hover:border-wei-emerald-deep";
  }
}
