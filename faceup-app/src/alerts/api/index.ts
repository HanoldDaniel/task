import { axiosInstance } from "../../core/api/axiosInstance";
import { type Alert, type CreateAlertDto, type UpdateAlertDto } from "./types";

export const fetchAlerts = async (): Promise<Alert[]> => {
  const { data } = await axiosInstance.get<Alert[]>("/alerts");
  return data;
};

export const fetchAlertById = async (id: number): Promise<Alert> => {
  const { data } = await axiosInstance.get<Alert>(`/alerts/${id}`);
  return data;
};

export const createAlert = async (alert: CreateAlertDto): Promise<Alert> => {
  const formData = new FormData();

  formData.append("senderName", alert.senderName);
  formData.append("senderAge", alert.senderAge);

  if (alert.files) {
    Array.from(alert.files).forEach((file) => {
      formData.append("files", file);
    });
  }

  formData.forEach((value, key) => console.log(key, value));

  const { data } = await axiosInstance.post<Alert>("/alerts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateAlert = async (
  id: number,
  alert: UpdateAlertDto,
): Promise<Alert> => {
  const formData = new FormData();

  formData.append("senderName", alert.senderName);
  formData.append("senderAge", alert.senderAge);

  if (alert.fileIdsToDelete?.[0]) {
    formData.append("fileIdsToDelete", alert.fileIdsToDelete.toString());
  }

  if (alert.files) {
    Array.from(alert.files).forEach((file) => {
      formData.append("files", file);
    });
  }

  formData.forEach((value, key) => console.log(key, value));

  const { data } = await axiosInstance.put<Alert>(`/alerts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteAlert = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/alerts/${id}`);
};
