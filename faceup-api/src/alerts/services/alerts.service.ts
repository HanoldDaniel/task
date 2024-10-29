import { Injectable, NotFoundException } from '@nestjs/common';
import { AlertsRepository } from '../repositories/alerts.repository';
import { CreateAlertDto } from '../dtos/create-alert.dto';
import { UpdateAlertDto } from '../dtos/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(private readonly alertsRepository: AlertsRepository) {}

  async createAlertWithFiles(
    createAlertDto: CreateAlertDto,
    files: Express.Multer.File[],
  ) {
    return this.alertsRepository.createAlertWithFiles(createAlertDto, files);
  }

  async updateAlertWithFiles(
    id: number,
    updateAlertDto: UpdateAlertDto,
    files: Express.Multer.File[],
  ) {
    return this.alertsRepository.updateAlertWithFiles(
      id,
      updateAlertDto,
      files,
    );
  }

  findAll() {
    return this.alertsRepository.findAll();
  }

  async findOne(id: number) {
    const alert = await this.alertsRepository.findOne(id);

    if (!alert) {
      throw new NotFoundException();
    }

    return alert;
  }

  remove(id: number) {
    return this.alertsRepository.remove(id);
  }
}
