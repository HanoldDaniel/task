import { IsString, IsInt } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  senderName: string;

  @IsInt()
  senderAge: number;

  Files: FileList;
}
