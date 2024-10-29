"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateAlert } from "../hooks/useAlerts";
import { type CreateAlertDto } from "../api/types";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";

const AlertForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAlertDto>();
  const createAlertMutation = useCreateAlert();
  const { toast } = useToast();

  const { isPending } = createAlertMutation;

  const router = useRouter();

  const onSubmit = async (data: CreateAlertDto) => {
    createAlertMutation.mutate(data, {
      onSuccess: () => {
        toast({
          description: "Alert created successfully.",
        });
        router.push("/");
      },
      onError: () => {
        toast({
          description:
            "⚠️ Oops! Something went wrong while creating your alert. Please try again.",
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-4 flex w-1/2 flex-col gap-2"
    >
      <h2 className="mb-4 text-xl font-semibold">Create Alert</h2>

      <div className="flex flex-col">
        <Input
          {...register("senderName", { required: "Sender Name is required" })}
          type="text"
          placeholder="Sender Name"
        />
        <p className="mt-1 h-5 text-sm text-red-500">
          {errors.senderName?.message ?? "\u00A0"}
        </p>
      </div>

      <div className="flex flex-col">
        <Input
          {...register("senderAge", {
            required: "Sender Age is required",
          })}
          type="number"
          placeholder="Sender Age"
        />
        <p className="mt-1 h-5 text-sm text-red-500">
          {errors.senderAge?.message ?? "\u00A0"}
        </p>
      </div>

      <Label className="cursor-pointer" htmlFor="files">
        Files
      </Label>
      <Input
        className="cursor-pointer"
        id="files"
        {...register("files")}
        type="file"
        multiple
        accept="*/*"
      />
      <p className="mt-1 h-5 text-sm text-red-500">
        {errors.files?.message ?? "\u00A0"}
      </p>

      <Button type="submit" className="mt-4" disabled={isPending}>
        {isPending ? "Loading" : "Create Test Alert"}
      </Button>
    </form>
  );
};

export default AlertForm;
