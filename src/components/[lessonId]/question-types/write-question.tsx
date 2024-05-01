import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import {
  type WriteQuestion,
  type WriteQuestion as WriteQuestionType,
} from "@prisma/client";
import { useMemo, useState } from "react";

type WriteQuestionProps = {
  getInfo(
    correct: boolean,
    buttonShow: boolean,
    correctSolution: string | null,
    reset: (() => void) | null,
  ): void;
} & WriteQuestionType;

export function WriteQuestion({
  writeQuestionAnswerId,
  suggestedSentences,
  getInfo,
}: WriteQuestionProps) {
  const { data: correctSentenceData } =
    api.writeQuestions.getWriteQuestionAnswer.useQuery({
      writeQuestionAnswerId: writeQuestionAnswerId,
    });
  const questionImage = useMemo(
    () => `/images/questions/write-${Math.floor(Math.random() * 2) + 1}.png`,
    [],
  );
  const [selectedWords, setSelectedWords] = useState<
    WriteQuestionType["suggestedSentences"]
  >([]);

  const reset = () => {
    setSelectedWords([]);
    getInfo(false, true, null, null);
  };

  return (
    <div className="flex h-full w-[35rem] flex-col pt-24">
      <h1 className="text-3xl font-bold">Write this in english</h1>
      <div className="relative flex h-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="write question" draggable="false" src={questionImage} />
        <Card className="mt-12 grid h-12 w-fit place-items-center p-4 pt-3">
          {correctSentenceData?.correctSentence.map(
            (sentence, sentenceIndex) => {
              return (
                <div
                  className="group relative w-fit border-b-[1px]"
                  key={JSON.stringify({ id: crypto.randomUUID() })}
                >
                  <span>{sentence}</span>
                  <span className="absolute left-1/2 top-7 hidden h-fit w-[calc(100%+30px)] -translate-x-1/2 rounded-lg border-2 bg-card py-1 text-center group-hover:block">
                    {correctSentenceData.helpers[sentenceIndex]}
                  </span>
                </div>
              );
            },
          )}
        </Card>
      </div>
      <div className="mb-12 flex h-16 w-full items-center justify-center gap-1 border-y-2">
        {selectedWords.map((word) => (
          <span
            onClick={() => {
              const isCorrect =
                selectedWords.join(" ") ===
                correctSentenceData?.helpers.join(" ");
              setSelectedWords(selectedWords.filter((w) => w !== word));
              getInfo(
                isCorrect,
                selectedWords.length > 0,
                !isCorrect
                  ? correctSentenceData?.helpers.join(" ") ?? null
                  : null,
                reset,
              );
            }}
            className="cursor-pointer rounded-lg border-2 px-6 py-1 text-base transition hover:bg-secondary"
            key={JSON.stringify({ id: crypto.randomUUID() })}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="flex h-fit w-full justify-center gap-1">
        {suggestedSentences
          .filter(
            (suggestedSentence) => !selectedWords.includes(suggestedSentence),
          )
          .map((sentence) => (
            <span
              onClick={() => {
                const isCorrect =
                  [...selectedWords, sentence].join(" ") ===
                  correctSentenceData?.helpers.join(" ");
                setSelectedWords([...selectedWords, sentence]);
                getInfo(
                  isCorrect,
                  selectedWords.length > 0,
                  !isCorrect
                    ? correctSentenceData?.helpers.join(" ") ?? null
                    : null,
                  reset,
                );
              }}
              className="cursor-pointer rounded-lg border-2 px-6 py-1 text-base transition hover:bg-secondary"
              key={JSON.stringify({ id: crypto.randomUUID() })}
            >
              {sentence}
            </span>
          ))}
      </div>
    </div>
  );
}
