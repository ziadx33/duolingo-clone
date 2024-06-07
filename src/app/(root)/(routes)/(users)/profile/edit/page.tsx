"use client";

import { EditProfile } from "@/components/edit/edit-profile";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/use-session";
import { useUpdateUser } from "@/hooks/use-update-user";
import { uploadProfilePic } from "@/server/actions/upload";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { data: userData } = useSession();
  const user = userData?.user;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(false);
  const { update: updateUser } = useUpdateUser();
  if (!user) return <Loading />;
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const nameValue = nameInputRef.current?.value;
    if (nameValue === "") return toast.error("please fill out the name input.");
    const reqs = async () => {
      let imageURL = user.image;
      if (selectedImage instanceof File) {
        const image = await uploadProfilePic({
          image: selectedImage,
          userId: user.id ?? "",
          currentImage: user.image ?? "",
        });
        imageURL = image;
      }
      await updateUser({
        data: {
          name: nameValue,
          image: `${imageURL}?${performance.now()}`,
        },
      });
    };
    setDisabled(true);
    toast.promise(reqs, {
      success: () => {
        setDisabled(false);
        location.pathname = "/learn";
        return "saved successfully!";
      },
      loading: "saving...",
    });
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex h-full flex-col items-center pt-24"
    >
      <div className="relative mb-12 h-36 w-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : user?.image ?? ""
          }
          alt="profile pic"
          className="h-full w-full rounded-full object-cover"
          draggable="false"
        />
        <EditProfile setSelectedImage={setSelectedImage} />
      </div>
      <Input
        ref={nameInputRef}
        placeholder="name"
        className="mb-2"
        defaultValue={user.name ?? ""}
      />
      <Button disabled={disabled} type="submit" className="w-full">
        {disabled ? "saving..." : "save"}
      </Button>
    </form>
  );
}
