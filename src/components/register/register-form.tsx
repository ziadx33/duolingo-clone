"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { register } from "@/utils/(auth)/register";
import { toast } from "sonner";
import { useTransition } from "react";

type RegisterFormProps = {
  subjectId: string;
};

export function RegisterForm({ subjectId }: RegisterFormProps) {
  const [isDisabled, disabledTransition] = useTransition();
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
          disabledTransition(() => {
            toast.promise(
              register({ ...values, subjectId }, window.location.origin),
              {
                loading: "Registering...",
                success:
                  "Registered successfully, we have sent a verification link to your email.",
                error: "Failed to register",
              },
            );
          });
        })}
        className="mx-auto flex h-screen w-96 flex-col items-center gap-4 px-4 py-32"
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
          disabled={form.formState.isLoading || isDisabled}
          type="submit"
          className="w-full"
        >
          submit
        </Button>
      </form>
    </Form>
  );
}
