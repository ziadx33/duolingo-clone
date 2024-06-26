import { type ChoosingQuestion } from "@prisma/client";
import { type getInfoFnType } from "../question-section";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type ChooseQuestionProps = {
  getInfo: getInfoFnType;
} & ChoosingQuestion;

export function ChooseQuestion({
  getInfo,
  correctSentence,
  suggestedSentences,
  suggestedSentencesImgSrcs,
  suggestedSentencesSoundSrcs,
  correctChoosen,
}: ChooseQuestionProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const audios = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return suggestedSentencesSoundSrcs.map((src) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const audio = new Audio(src);
      return audio;
    });
  }, [suggestedSentencesSoundSrcs]);
  const reset = () => {
    setSelectedWord(null);
    getInfo(false, false, null, null);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-fit w-full flex-col gap-4 sm:gap-6 md:gap-12 xl:w-[40rem]">
      <h1 className="text-3xl font-bold">
        Which one of these is &quot;{correctSentence}&quot;?
      </h1>
      <div className="flex h-fit w-full flex-wrap items-start justify-center gap-2 pb-4 ">
        {suggestedSentences.map((sentence, sentenceIndex) => (
          <button
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onClick={() => {
              void audios[sentenceIndex]!.play();
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              setSelectedWord(sentence);
              getInfo(sentence === correctChoosen, true, correctChoosen, reset);
            }}
            key={JSON.stringify({ id: crypto.randomUUID() })}
            className={cn(
              "flex h-fit flex-col items-center gap-6 rounded-lg border p-4 pt-8 transition-all hover:bg-secondary",
              selectedWord === sentence ? "bg-secondary" : "",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              src={suggestedSentencesImgSrcs[sentenceIndex]!}
              draggable={false}
              alt={sentence}
              className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]"
            />
            <div>{sentence}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
