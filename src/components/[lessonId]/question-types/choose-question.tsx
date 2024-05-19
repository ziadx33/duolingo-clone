import { type ChoosingQuestion } from "@prisma/client";
import { type getInfoFnType } from "../question-section";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type ChooseQuestionProps = {
  getInfo: getInfoFnType;
} & ChoosingQuestion;

export function ChooseQuestion({
  correctSentence,
  suggestedSentences,
  suggestedSentencesImgSrcs,
  suggestedSentencesSoundSrcs,
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
              audios[sentenceIndex]!.play();
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              setSelectedWord(sentence);
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
