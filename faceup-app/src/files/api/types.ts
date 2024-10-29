export interface FileType {
  id: number;
  fileName: string;
  filePath: string;
  alertId: number;
  mimetype?: string;
  createdAt: Date;
  updatedAt: Date;
  buffer?: Buffer;
  size?: number;
  encoding?: string;
  originalname?: string;
  fieldname?: string;
}
