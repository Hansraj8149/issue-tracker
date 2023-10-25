"use client";

import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
type IssueFormI = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueFormI>({resolver:zodResolver(createIssueSchema)});

  const [error, setError] = useState("");
  const [isSubmitting ,setIsSubmitting] = useState(false);

  return (
    <div>
        {error && (
        <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>)}

    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
          try {
              await axios.post("/api/issues", data);
              router.push("/issues");
              setIsSubmitting(true);
            } catch (error) {
              setIsSubmitting(false);
                setError("An Expected Error Occured");
            }
        })}
        >
      <TextField.Root>
        <TextField.Input placeholder="title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>

      {errors.title?.message}
      </ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
            <SimpleMdeReact placeholder="description" {...field} />
            )}
            />
            <ErrorMessage>

{errors.description?.message }
            </ErrorMessage>
      <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
    </form>
            </div>
  );
};

export default NewIssuePage;
