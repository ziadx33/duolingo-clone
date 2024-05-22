import { IoMdClose } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function LeaveButton() {
  const router = useRouter();
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
            src="https://d35aaqx5ub95lt.cloudfront.net/images/ed9f592a37a6ce248be0beec9c13a0e1.svg"
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
            <Button
              type="submit"
              onClick={() => router.push("/learn")}
              className="w-full"
              variant="destructive"
            >
              end session
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
