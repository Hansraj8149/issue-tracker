"use client";

import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueFormI {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueFormI>();

  const [error, setError] = useState("");

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
            } catch (error) {
                setError("An Expected Error Occured");
            }
        })}
        >
      <TextField.Root>
        <TextField.Input placeholder="title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
            <SimpleMdeReact placeholder="description" {...field} />
            )}
            />

      <Button>Submit New Issue</Button>
    </form>
            </div>
  );
};

export default NewIssuePage;
