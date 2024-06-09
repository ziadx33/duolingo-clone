import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { type WriteQuestion as WriteQuestionType } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { type getInfoFnType } from "../question-section";

type WriteQuestionProps = {
  getInfo: getInfoFnType;
} & WriteQuestionType;

export function WriteQuestion({
  writeQuestionAnswerId,
  suggestedSentences,
  getInfo,
  correctSentenceVoice,
}: WriteQuestionProps) {
  const { data: correctSentenceData } =
    api.writeQuestions.getWriteQuestionAnswer.useQuery({
      writeQuestionAnswerId: writeQuestionAnswerId,
    });
  const sound = new Audio();
  const questionImage = useMemo(
    () => `/images/questions/write-${Math.floor(Math.random() * 2) + 1}.png`,
    [],
  );
  const [selectedWords, setSelectedWords] = useState<
    WriteQuestionType["suggestedSentences"]
  >([]);

  const reset = () => {
    setSelectedWords([]);
    getInfo(false, false, null, null);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full w-full flex-col pt-24 xl:w-[35rem]">
      <h1 className="text-3xl font-bold">Write this in english</h1>
      <div className="relative flex h-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="write question" draggable="false" src={questionImage} />
        <Card className="mt-12 flex h-12 w-fit items-center gap-1 p-4 pl-3">
          <button
            onClick={() => {
              sound.src = correctSentenceVoice!;
              void sound.play();
            }}
          >
            <HiOutlineSpeakerWave size={20} />
          </button>
          <div className="flex gap-1">
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
          </div>
        </Card>
      </div>
      <div className="mb-4 flex h-16 w-full flex-wrap items-center justify-center gap-2 border-y-2">
        {selectedWords.map((word) => (
          <span
            onClick={() => {
              const isCorrect =
                selectedWords.join(" ") ===
                correctSentenceData?.helpers.join(" ");
              const deletedSentenceSelectedWords = selectedWords.filter(
                (w) => w !== word,
              );
              setSelectedWords(deletedSentenceSelectedWords);
              getInfo(
                isCorrect,
                deletedSentenceSelectedWords.length > 0,
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
      <div className="flex h-fit w-full flex-wrap justify-center gap-1">
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
                  selectedWords.length >= 0,
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
