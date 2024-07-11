import { IoMdClose } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { LoadingLink } from "../loading-link";

export function LeaveButton() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <IoMdClose size={25} />
          </button>
        </DialogTrigger>
        <DialogContent className="flex w-96 flex-col items-center">
          <Image
            src="/images/pages/[lessonId]/leave-image.svg"
            width={150}
            height={150}
            alt="dialog image"
          />
          <h1 className="text-center text-xl">
            Wait, don’t go! You’ll lose your progress if you quit now
          </h1>
          <div className="w-full">
            <DialogClose asChild>
              <Button className="mb-1.5 w-full">keep learning</Button>
            </DialogClose>
            <LoadingLink
              loadingText="leaving..."
              type="submit"
              className="w-full"
              variant="destructive"
              href="/learn"
            >
              end session
            </LoadingLink>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
