import { Module } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Envio } from './entities/envio.entity';
import { Venta } from 'src/ventas/entities/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Envio,Venta
  ])],
  controllers: [EnvioController],
  providers: [EnvioService]
})
export class EnvioModule {}
