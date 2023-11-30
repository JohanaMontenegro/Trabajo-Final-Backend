import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ServicioDTO } from './dto/servicioDTO';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServicioService {
  private servicios: Servicio[] = [];

  constructor(@InjectRepository(Servicio)
  private readonly servicioRepository: Repository<Servicio>) { }


  public async verServicios(): Promise<Servicio[]> {
    try {

      this.servicios = await this.servicioRepository.find();
      if (this.servicios)
        return this.servicios;
      else
        throw new Error('No se encuentra el servicio.')
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async verUno(id: number): Promise<Servicio[]> {
    try {
      const criterio: FindOneOptions = { where: { idServicio: id } }
      let servicio: Servicio = await this.servicioRepository.findOne(criterio);
      this.servicios = [];
      if (servicio)
        this.servicios.push(servicio)
      throw new Error('El servicio no se encuentra.')      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda del servicio' + id + ' : ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async crearServicio (datos: ServicioDTO): Promise<Servicio> {
    try {
      if (datos.nombreServicio && datos.descripcion)
        if (await this.servicioExistente(datos.idServicio)) {
          throw new Error('El servicio ya se encuentra.')
        } else {
          let servicio:Servicio = await this.servicioRepository.save(
            new Servicio(datos.nombreServicio, datos.descripcion, datos.telefono))
          return servicio;
        }

    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }
  public async borrarServicio(id: number): Promise<string> {
    try {
      if (id)
        if (await this.servicioExistente(id)) {
          await this.servicioRepository.delete(id);
        } else
          throw new Error('El servicio no se encuentra.')
      else
        throw new Error('No hay datos para eliminar el servicio');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  public async actualizarServicio(id: number, datos: ServicioDTO): Promise<string> {
    try {
      if (datos)
        if (datos.nombreServicio)
          if (await this.servicioExistente(id)) {
            let criterio: FindOneOptions = { where: { idServicio: id } }
            let servicio: Servicio = await this.servicioRepository.findOne(criterio);
            servicio.setNombre(datos.nombreServicio);
            await this.servicioRepository.save(servicio);
          } else
            throw new Error('El servicio no se encuentra.')
        else
          throw new Error('Los datos para modificar el servicio no son validos');
      else
        throw new Error('No hay datos para modificar el servicio');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  private async servicioExistente(id: number): Promise<boolean> {
    let criterio: FindOneOptions = { where: { idServicio: id } };
    let servicio: Servicio = await this.servicioRepository.findOne(criterio);
    return (servicio != null);
  }
}