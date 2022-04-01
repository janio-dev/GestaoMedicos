import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectModel(Specialty)
    private specialtyModel: typeof Specialty,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    const obj = createSpecialtyDto;
    const Specialty = await this.specialtyModel.create({ title: obj.title });
    if (!Specialty) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('Specialty created successfully', HttpStatus.OK);
  }

  async findAll() {
    const Specialty = await this.specialtyModel.findAll();
    if (Specialty.length < 1) {
      throw new HttpException('Specialties not found', HttpStatus.NOT_FOUND);
    }
    return Specialty;
  }

  async findOne(id: number) {
    const Specialty = await this.specialtyModel.findOne({ where: { id: id } });
    if (!Specialty) {
      throw new HttpException('Specialty not found', HttpStatus.NOT_FOUND);
    }
    return Specialty;
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    const Specialty: any = await this.specialtyModel.update(
      updateSpecialtyDto,
      {
        where: {
          id: id,
        },
      },
    );
    if (Specialty == 0) {
      throw new HttpException('Specialty not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Specialty updated successfully', HttpStatus.OK);
  }

  async remove(id: number) {
    const Specialty = await this.specialtyModel.destroy({
      where: {
        id: id,
      },
    });
    if (Specialty == 0) {
      throw new HttpException('Specialty not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Specialty successfully deleted', HttpStatus.OK);
  }
}
