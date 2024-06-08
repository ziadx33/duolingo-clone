/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { type HearingQuestion as HearingQuestionType } from "@prisma/client";
import { type getInfoFnType } from "../question-section";
import { Button } from "@/components/ui/button";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useEffect, useState } from "react";

type HearQuestionProps = {
  getInfo: getInfoFnType;
} & HearingQuestionType;

export function HearQuestion({
  getInfo,
  sentenceSrc,
  suggestedSentences,
  correctSentence,
}: HearQuestionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const hearVoice = new Audio(sentenceSrc);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const reset = () => {
    setSelectedWords([]);
    getInfo(false, false, null, null);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-full w-full flex-col gap-6 pt-24 xl:w-[35rem]">
      <h1 className="text-3xl font-bold">Tap what you hear</h1>
      <div className="flex items-end justify-center gap-4 py-2">
        <Button
          onClick={() => hearVoice.play()}
          size="icon"
          className="h-24 w-24"
        >
          <HiMiniSpeakerWave size={60} />
        </Button>
      </div>
      <div className="mb-12 flex h-16 w-full flex-wrap items-center justify-center gap-2 border-y-2">
        {selectedWords.map((word) => (
          <span
            onClick={() => {
              const isCorrect = selectedWords.join(" ") === correctSentence;
              const deletedSentenceSelectedWords = selectedWords.filter(
                (w) => w !== word,
              );
              setSelectedWords(deletedSentenceSelectedWords);
              getInfo(
                isCorrect,
                deletedSentenceSelectedWords.length > 0,
                !isCorrect ? correctSentence ?? null : null,
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
      <div className="flex h-fit w-full flex-wrap justify-center gap-1">
        {suggestedSentences
          .filter(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            (suggestedSentence) => !selectedWords.includes(suggestedSentence),
          )
          .map((sentence) => (
            <span
              onClick={() => {
                const isCorrect =
                  [...selectedWords, sentence].join(" ") === correctSentence;
                setSelectedWords([...selectedWords, sentence]);
                getInfo(
                  isCorrect,
                  selectedWords.length >= 0,
                  !isCorrect ? correctSentence ?? null : null,
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
