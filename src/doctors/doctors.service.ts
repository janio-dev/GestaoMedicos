import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor)
    private doctorModel: typeof Doctor,
    private httpService: HttpService,
  ) {}

  async findAndress(cep: number) {
    const fetch = await this.httpService
      .get(`http://viacep.com.br/ws/${cep}/json/`)
      .toPromise()
      .then((res) => res.data)
      .catch(() => 'erro');
    return fetch.localidade;
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<any> {
    const obj = createDoctorDto;
    const consultacep = await this.findAndress(obj.cep);
    if (consultacep) {
      const Doctor = await this.doctorModel.create({
        name: obj.name,
        crm: obj.crm,
        telephoneFixed: obj.telephoneFixed,
        cellPhone: obj.cellPhone,
        cep: obj.cep,
        medicalSpecialty: obj.medicalSpecialty,
        address: consultacep,
      });
      if (!Doctor) {
        throw new HttpException(
          'internal error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException('Doctor created successfully', HttpStatus.OK);
    } else {
      return 'cep invalido!';
    }
  }

  async findAll() {
    const Doctor = await this.doctorModel.findAll();
    if (Doctor.length < 1) {
      throw new HttpException('Doctors not found', HttpStatus.NOT_FOUND);
    }
    return Doctor;
  }

  async findOne(id: number) {
    const Doctor = await this.doctorModel.findOne({ where: { id: id } });
    if (!Doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }
    return Doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const obj = updateDoctorDto;
    const consultacep = await this.findAndress(obj.cep);
    if (consultacep) {
      const Doctor: any = await this.doctorModel.update(
        {
          name: obj.name,
          crm: obj.crm,
          telephoneFixed: obj.telephoneFixed,
          cellPhone: obj.cellPhone,
          cep: obj.cep,
          medicalSpecialty: obj.medicalSpecialty,
          address: consultacep,
        },
        {
          where: {
            id: id,
          },
        },
      );
      if (Doctor == 0) {
        throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Doctor updated successfully', HttpStatus.OK);
      }
    } else {
      return 'cep invalido!';
    }
  }

  async remove(id: number) {
    const Doctor = await this.doctorModel.destroy({
      where: {
        id: id,
      },
    });
    if (Doctor == 0) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Doctor successfully deleted', HttpStatus.OK);
  }
}
