import { type ChoosingQuestion } from "@prisma/client";
import { type getInfoFnType } from "../question-section";
import Image from "next/image";
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
    <div className="flex h-full w-[40rem] flex-col gap-12 pt-24">
      <h1 className="text-3xl font-bold">
        Which one of these is &quot;{correctSentence}&quot;?
      </h1>
      <div className="flex gap-2">
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
              "flex h-64 w-[30rem] flex-col items-center gap-6 rounded-lg border p-4 pt-8 transition-all hover:bg-secondary",
              selectedWord === sentence ? "bg-secondary" : "",
            )}
          >
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              src={suggestedSentencesImgSrcs[sentenceIndex]!}
              draggable={false}
              alt={sentence}
              width={150}
              height={150}
            />
            <div>{sentence}</div>
          </button>
        ))}
      </div>
    </div>
  );
}