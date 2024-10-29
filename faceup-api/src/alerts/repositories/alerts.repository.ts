import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlertDto } from '../dtos/create-alert.dto';
import { UpdateAlertDto } from '../dtos/update-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAlertWithFiles(
    createAlertDto: CreateAlertDto,
    files: Express.Multer.File[],
  ) {
    return this.prisma.alert.create({
      data: {
        ...createAlertDto,
        files: {
          create: files,
        },
      },
      include: {
        files: true,
      },
    });
  }

  async updateAlertWithFiles(
    id: number,
    updateAlertDto: UpdateAlertDto,
    files: Express.Multer.File[],
  ) {
    const fileIdsToDelete = updateAlertDto.fileIdsToDelete
      ? updateAlertDto.fileIdsToDelete.split(',').map(Number)
      : [];

    delete updateAlertDto.fileIdsToDelete;

    return this.prisma.alert.update({
      where: { id },
      data: {
        ...updateAlertDto,

        files: {
          deleteMany: {
            id: { in: fileIdsToDelete },
          },

          create: files,
        },
      },
      include: {
        files: true,
      },
    });
  }

  async create(data: CreateAlertDto) {
    return this.prisma.alert.create({ data });
  }

  async findAll() {
    return this.prisma.alert.findMany({
      include: {
        files: true,
      },
    });
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.prisma.alert.findUnique({
      where: { id: Number(id) },
      include: {
        files: true,
      },
    });
  }

  async update(id: number, data: UpdateAlertDto) {
    if (!id) {
      return;
    }

    return this.prisma.alert.update({
      where: { id: Number(id) },
      data: {
        senderAge: Number(data.senderAge),
        senderName: data.senderName,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.alert.delete({ where: { id } });
  }
}
