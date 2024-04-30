"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleOAuth } from "@/components/(auth)/google-oauth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { login } from "@/utils/(auth)/login";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const fn = async () => {
            await login(values, true);
            await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });
          };
          toast.promise(fn(), {
            loading: "Logging in...",
            success: () => {
              router.push("/learn");
              return "Logged in successfully!";
            },
            error: (error: Error) => error.message,
          });
        })}
        className="mx-auto flex h-screen w-96 flex-col items-center gap-4 py-32"
      >
        <h1 className="mb-10 text-2xl">Login to your account</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="w-full"
                  placeholder="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="w-full"
                  placeholder="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isLoading}
          type="submit"
          className="w-full"
        >
          submit
        </Button>
        <div className="relative my-2 h-[0.050rem] w-full bg-secondary before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-background before:px-2 before:text-secondary-foreground before:content-['or']" />
        <GoogleOAuth />
      </form>
    </Form>
  );
}
