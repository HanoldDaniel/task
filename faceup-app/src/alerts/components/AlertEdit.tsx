import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useDeleteAlert, useUpdateAlert } from "../hooks/useAlerts";
import { Alert, type UpdateAlertDto } from "../api/types";
import { useForm } from "react-hook-form";
import { FileText, ExternalLink, X, ArrowLeftIcon } from "lucide-react";
import { type FileType } from "~/files/api/types";
import { toast } from "~/hooks/use-toast";
import Link from "next/link";

export const AlertEdit = ({ data }: { data: Alert }) => {
  const defaultValues = {
    senderName: data.senderName,
    senderAge: data.senderAge + "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAlertDto>({
    defaultValues,
  });

  const [fileIdsToDelete, setFileIdsToDelete] = useState<number[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const updateAlertMutation = useUpdateAlert(data.id);
  const deleteAlertMutation = useDeleteAlert(data.id);

  const router = useRouter();

  const onSubmit = async (data: UpdateAlertDto) => {
    updateAlertMutation.mutate(
      { ...data, fileIdsToDelete },
      {
        onSuccess: () => {
          setIsEdit(false);
          toast({
            description: "Alert updated successfully.",
          });
        },
        onError: () => {
          toast({
            description: "Something went wrong!",
          });
        },
      },
    );
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push("/");
    deleteAlertMutation.mutate();
  };

  const onFileOpen = (file: FileType) => {
    if (!file.buffer) {
      return;
    }

    const buffer = Buffer.from(file.buffer);

    const blob = new Blob([buffer], {
      type: file.mimetype,
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const onFileDelete = (id: number) => {
    setFileIdsToDelete((prev) => [...prev, id]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-4 flex flex-col gap-2 md:w-1/2"
    >
      <Link href="/">
        <ArrowLeftIcon />
      </Link>
      <h2 className="text-xl font-semibold">Create Alert</h2>

      <div className="flex flex-col">
        <Input
          {...register("senderName", { required: "Sender Name is required" })}
          type="text"
          placeholder="Name"
          disabled={!isEdit}
        />
        <p className="mt-1 h-5 text-sm text-red-500">
          {errors.senderName?.message ?? "\u00A0"}
        </p>
      </div>

      <div className="flex flex-col">
        <Input
          {...register("senderAge", { required: "Sender Age is required" })}
          type="number"
          placeholder="Age"
          disabled={!isEdit}
        />
        <p className="mt-1 h-3 text-sm text-red-500">
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
        disabled={!isEdit}
      />
      <p className="mt-1 h-2 text-sm text-red-500">
        {errors.files?.message ?? "\u00A0"}
      </p>

      <div className="mt-4 space-y-2">
        {data.files
          ?.filter((file) => !fileIdsToDelete.includes(file.id))
          ?.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 rounded-md border p-2 shadow-sm hover:bg-gray-50"
            >
              <FileText className="text-gray-500" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium">{file.originalname}</p>
                <p className="text-xs text-gray-400">
                  {file.size} bytes • {file.mimetype}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => onFileOpen(file)}
                className="p-1"
                type="button"
              >
                <ExternalLink className="text-blue-500" size={20} />
              </Button>
              <Button
                variant="ghost"
                onClick={() => onFileDelete(file.id)}
                className="p-1"
                type="button"
                disabled={!isEdit}
              >
                <X className="text-red-500" size={20} />
              </Button>
            </div>
          ))}
      </div>

      <div className="flex w-1/2 gap-4">
        {isEdit ? (
          <>
            <Button type="submit" disabled={updateAlertMutation.isPending}>
              Update
            </Button>
            <Button type="button" variant="outline" onClick={onDelete}>
              Delete
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true);
            }}
          >
            Edit
          </Button>
        )}
      </div>
    </form>
  );
};
