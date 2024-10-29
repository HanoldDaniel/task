import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteFile, fetchFiles, uploadFile } from "../api";

const keys = {
  getFiles: ["files"],
  uploadFile: ["uploadFile"],
};

const invalidateFileQueries = async (queryClient: QueryClient) => {
  const allKeys = Object.values(keys).flat();
  await queryClient.invalidateQueries({
    predicate: (query) => allKeys.includes(String(query.queryKey[0])),
  });
};

export const useFiles = (alertId: number) =>
  useQuery({ queryKey: keys.getFiles, queryFn: () => fetchFiles(alertId) });

export const useUploadFile = (alertId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadFile(file, alertId),
    onSuccess: () => invalidateFileQueries(queryClient),
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteFile(id),
    onSuccess: () => invalidateFileQueries(queryClient),
  });
};
