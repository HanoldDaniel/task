"use client";
import React from "react";
import { useForm } from "react-hook-form";

import { useUploadFile } from "../hooks/useFiles";

type UploadFormInputs = {
  file: FileList;
  alertId: number;
};

const FileUploadForm = () => {
  const { register, handleSubmit, reset } = useForm<UploadFormInputs>();

  const uploadFileMutation = useUploadFile(1);

  const onSubmit = (data: UploadFormInputs) => {
    const file = data.file[0];

    if (file) {
      // Pass the correct structure expected by the mutate function
      uploadFileMutation.mutate(file);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("file", { required: true })}
        type="file"
        accept="*/*"
      />
      <input
        {...register("alertId", { required: true, valueAsNumber: true })}
        type="number"
        placeholder="Alert ID"
      />
      <button type="submit">Upload File</button>
    </form>
  );
};

export default FileUploadForm;
