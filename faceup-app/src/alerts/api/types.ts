import { type FileType } from "~/files/api/types";

export interface Alert {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  senderName: string;
  senderAge: number;
  files: FileType[];
}

export interface CreateAlertDto {
  senderName: string;
  senderAge: string;
  files?: FileList;
}

export interface UpdateAlertDto {
  senderName: string;
  senderAge: string;
  files?: FileList;
  fileIdsToDelete?: number[];
}

export interface UpdateAlertDtoForm {
  senderName: string;
  senderAge: string;
  files?: FileType[];
}
