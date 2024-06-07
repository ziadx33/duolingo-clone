import {
  type ChangeEventHandler,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "../ui/button";
import { FaPen } from "react-icons/fa";
import { toast } from "sonner";

type EditProfileType = {
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
};

export function EditProfile({ setSelectedImage }: EditProfileType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const changeProfileHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return toast.error("please upload an image");
    setSelectedImage(file);
  };
  return (
    <>
      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute right-0 top-0 rounded-full"
        variant="outline"
        size="icon"
      >
        <FaPen />
      </Button>
      <input
        ref={inputRef}
        maxLength={1}
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
        onChange={changeProfileHandler}
      />
    </>
  );
}
