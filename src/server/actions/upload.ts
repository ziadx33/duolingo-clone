import { DEFAULT_PROFILE_PIC } from "@/constants";
import { supabase } from "../supabase";

export const uploadProfilePic = async ({
  image,
  userId,
  currentImage,
}: {
  image: File;
  userId: string;
  currentImage: string;
}) => {
  try {
    const picURL = `https://qpaaeeduxpckpcjvcygl.supabase.co/storage/v1/object/public/profiles/${userId}`;
    console.log("currneter", currentImage);
    const currentCondition =
      currentImage === DEFAULT_PROFILE_PIC ? "upload" : "update";
    console.log("conditioner", currentCondition, userId);
    const res = await supabase.storage
      .from("profiles")
      [currentCondition](userId, image);

    console.log("as res as possible", res);

    return picURL;
  } catch (err) {
    throw err;
  }
};
