import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VentasDTO } from './dto/ventasDTO';
import { Venta } from './entities/venta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class VentasService {
  private ventas: Venta[] = [];

  constructor(@InjectRepository(Venta)
  private readonly ventasRepository: Repository<Venta>) { }

  public async mostrarProductos(): Promise<Venta[]> {

    try {

      this.ventas = await this.ventasRepository.find();
      if (this.ventas)
        return this.ventas;
      else
        throw new Error('No se encuentran los datos de la venta.')
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async mostrarUno(id: number): Promise<Venta[]> {
    try {
      const criterio: FindOneOptions = { where: { idProducto: id } }
      let ventas: Venta = await this.ventasRepository.findOne(criterio);
      this.ventas = [];
      if (Venta)
        this.ventas.push(ventas);
      else
        throw new Error('Los datos de la venta no se encuentran.')
      return this.ventas;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Se ha producido un error en la búsqueda de los datos de la venta ' + id + ' : ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async agregarAventa(datos: VentasDTO): Promise<Venta> {
    try {
      if (datos.idVenta && datos.estado)
        if (await this.cargarVenta(datos.idVenta)) {
          throw new Error('El registro de la venta ya existe')
        } else {
          let ventas: Venta = await this.ventasRepository.save(
            new Venta(datos.estado))
          return ventas;
        }

    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  public async actualizarDatos(id: number, datos: VentasDTO): Promise<string> {
    try {
      if (datos)
        if (datos.estado)
          if (await this.cargarVenta(id)) {
            let criterio: FindOneOptions = { where: { idCiudad: id } }
            let ventas: Venta = await this.ventasRepository.findOne(criterio);
            ventas.setEstado(datos.estado);
            await this.ventasRepository.save(ventas);
          } else
            throw new Error('El producto no se ha No se encuentran registros de la venta.')
        else
          throw new Error('Los datos para modificar el informe de venta no son validos');
      else
        throw new Error('No se han encontrado datos para modificar el informe de venta');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  public async borrarVenta(id: number): Promise<string> {
    try {
      if (id)
        if (await this.cargarVenta(id)) {
          await this.ventasRepository.delete(id);
        } else
          throw new Error('no de ha encontrado el informe de venta.')
      else
        throw new Error('No se han encontrado datos para eliminar el informe solicitado');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  private async cargarVenta(id: number): Promise<boolean> {
    let criterio: FindOneOptions = { where: { idProducto: id } };
    let ventas: Venta = await this.ventasRepository.findOne(criterio);
    return ((ventas) != null);
  }

}

