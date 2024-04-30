"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleOAuth } from "../../_components/google-oauth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "../../_utils/register";
import { toast } from "sonner";

type RegisterFormProps = {
  subjectId: string;
};

export function RegisterForm({ subjectId }: RegisterFormProps) {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          toast.promise(
            register({ ...values, subjectId }, window.location.origin),
            {
              loading: "Registering...",
              success:
                "Registered successfully, we have sent a verification link to your email.",
              error: "Failed to register",
            },
          );
        })}
        className="mx-auto flex h-screen w-96 flex-col items-center gap-4 py-32"
      >
        <h1 className="mb-10 text-2xl">Create your profile</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="w-full"
                  placeholder="name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
