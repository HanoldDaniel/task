import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { AlertsService } from '../services/alerts.service';
import { CreateAlertDto } from '../dtos/create-alert.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateAlertDto } from '../dtos/update-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createAlertDto: CreateAlertDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    createAlertDto.senderAge = Number(createAlertDto.senderAge);

    const result = await this.alertsService.createAlertWithFiles(
      createAlertDto,
      files,
    );

    return result;
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Body() updateAlertDto: UpdateAlertDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    updateAlertDto.senderAge = Number(updateAlertDto.senderAge);

    const result = await this.alertsService.updateAlertWithFiles(
      Number(id),
      updateAlertDto,
      files,
    );

    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
}
