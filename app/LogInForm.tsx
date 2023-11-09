"use client";
import {
  Button,
  Heading,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./components/ErrorMessage";

type LoginInputs = z.infer<typeof loginSchema>;

const LogInForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/login";
  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    router.push("/dogs");
  });

  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <Heading>Please Login</Heading>
        <TextFieldRoot>
          <TextFieldInput placeholder="Name" {...register("name")} />
        </TextFieldRoot>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <TextFieldRoot>
          <TextFieldInput placeholder="Email" {...register("email")} />
        </TextFieldRoot>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Button>Log In</Button>
      </form>
    </div>
  );
};

export default LogInForm;
