import { IsString, IsInt, IsArray } from 'class-validator';

export class UpdateAlertDto {
  @IsString()
  senderName: string;

  @IsInt()
  senderAge: number;

  Files: FileList;

  @IsInt()
  fileIdsToDelete: string;
}
