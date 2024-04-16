import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleOAuth } from "../../_components/google-oauth";

export function RegisterForm() {
  return (
    <form className="mx-auto flex h-screen w-96 flex-col items-center gap-4 py-32">
      <h1 className="mb-10 text-2xl">Create your profile</h1>
      <div>
        <Input placeholder="Age" className="mb-1" />
        <p className="text-sm">
          Providing your age ensures you get the right Duolingo experience. For
          more details, please visit our{" "}
          <span className="text-[#1CB0F6]">Privacy Policy</span>.
        </p>
      </div>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button className="w-full">create account</Button>
      <div className="relative my-2 h-[0.050rem] w-full bg-secondary before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-background before:px-2 before:text-secondary-foreground before:content-['or']" />
      <GoogleOAuth />
    </form>
  );
}
