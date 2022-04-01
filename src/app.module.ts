import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorsModule } from './doctors/doctors.module';
import { SpecialtiesModule } from './specialties/specialties.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      autoLoadModels: true,
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'BOY9954',
      database: 'medical_management',
      models: [],
    }),
    DoctorsModule,
    SpecialtiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
