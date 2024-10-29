import { axiosInstance } from "../../core/api/axiosInstance";
import { type FileType } from "./types";

export const fetchFiles = async (alertId: number): Promise<File[]> => {
  const { data } = await axiosInstance.get<File[]>(`/files?alertId=${alertId}`);
  return data;
};

// Ensure axios is imported properly

export const uploadFile = async (
  file: File,
  alertId: number,
): Promise<FileType> => {
  const formData = new FormData();

  // Append the file object directly to FormData
  formData.append("file", file as unknown as Blob);

  const { data } = await axiosInstance.post<FileType>(
    `/files/upload?alertId=${alertId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const deleteFile = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/files/${id}`);
};
