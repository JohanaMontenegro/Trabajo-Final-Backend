import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { MedioPago } from './entities/medios-pago.entity';
import { MedioPagoDTO } from './dto/medio-pagoDTO';


@Injectable()
export class MedioPagoService {
  private medios: MedioPago[] = [];

  constructor(@InjectRepository(MedioPago)
  private readonly mediosRepository: Repository<MedioPago>) { }


  public async mostrarMedios(): Promise<MedioPago[]> {
    try {

      this.medios = await this.mediosRepository.find();
      if (this.medios)
        return this.medios;
      else
        throw new Error('No se encuentra el medio de pago.')
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async mostrarUnMedio(id: number): Promise<MedioPago[]> {
    try {
      const criterio: FindOneOptions = { where: { idPago: id } }
      let medio: MedioPago = await this.mediosRepository.findOne(criterio);
      this.medios = [];
      if (medio)
        this.medios.push(medio)
      throw new Error('El medio no se encuentra.')      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de ciudad ' + id + ' : ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async crearMedio(datos: MedioPagoDTO): Promise<MedioPago> {
    try {
      if (datos.idPago && datos.tipoPago)
        if (await this.medioExistente(datos.idPago)) {
          throw new Error('El medio de pago ya se encuentra.')
        } else {
          let medio: MedioPago = await this.mediosRepository.save(
            new MedioPago(datos.tipoPago))
          return medio;
        }

    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }
  public async borrarMedio(id: number): Promise<string> {
    try {
      if (id)
        if (await this.medioExistente(id)) {
          await this.mediosRepository.delete(id);
        } else
          throw new Error('El medio de pago no se encuentra.')
      else
        throw new Error('No hay datos para eliminar el medio de pago');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  public async actualizarMedio(id: number, datos: MedioPagoDTO): Promise<string> {
    try {
      if (datos)
        if (datos.tipoPago)
          if (await this.medioExistente(id)) {
            let criterio: FindOneOptions = { where: { idPago: id } }
            let medio: MedioPago = await this.mediosRepository.findOne(criterio);
            medio.setPago(datos.tipoPago);
            await this.mediosRepository.save(medio);
          } else
            throw new Error('El medio de pago no se encuentra.')
        else
          throw new Error('Los datos para modificar el medio de pago no son validos');
      else
        throw new Error('No hay datos para modificar el medio de pago');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  private async medioExistente(id: number): Promise<boolean> {
    let criterio: FindOneOptions = { where: { idPago: id } };
    let medio: MedioPago = await this.mediosRepository.findOne(criterio);
    return (medio != null);
  }
}