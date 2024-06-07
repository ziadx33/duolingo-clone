import { RotatingLines } from "react-loader-spinner";

export function Loading() {
  return (
    <div className="grid h-full w-full place-items-center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="70"
        visible={true}
      />
    </div>
  );
}
