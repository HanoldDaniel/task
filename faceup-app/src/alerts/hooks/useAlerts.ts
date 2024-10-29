import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createAlert,
  deleteAlert,
  fetchAlertById,
  fetchAlerts,
  updateAlert,
} from "../api";
import { type UpdateAlertDto, type CreateAlertDto } from "../api/types";

const keys = {
  getAlert: ["alert"],
  getAlerts: ["alerts"],
  createAlert: ["createAlert"],
};

const invalidateAlertQueries = async (queryClient: QueryClient) => {
  const allKeys = Object.values(keys).flat();
  await queryClient.invalidateQueries({
    predicate: (query) => allKeys.includes(String(query.queryKey[0])),
  });
};

export const useAlert = (id: number | string) => {
  return useQuery({
    queryKey: [...keys.getAlert, id],
    queryFn: () => {
      if (id == null) {
        throw new Error("Alert ID cannot be null or undefined");
      }
      return fetchAlertById(Number(id));
    },
  });
};

export const useAlerts = () =>
  useQuery({ queryKey: keys.getAlerts, queryFn: fetchAlerts });

export const useCreateAlert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => invalidateAlertQueries(queryClient),
    mutationFn: (newAlert: CreateAlertDto) => createAlert(newAlert),
  });
};

export const useUpdateAlert = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedAlert: UpdateAlertDto) => updateAlert(id, updatedAlert),
    onSuccess: () => invalidateAlertQueries(queryClient),
  });
};

export const useDeleteAlert = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAlert(id),
    onSuccess: () => invalidateAlertQueries(queryClient),
  });
};
