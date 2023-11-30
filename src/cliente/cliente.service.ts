import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteDTO } from './dto/clienteDTO';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  constructor(@InjectRepository(Cliente)
  private readonly clienteRepository: Repository<Cliente>) { }


  public async verClientes(): Promise<Cliente[]> {
    try {

      this.clientes = await this.clienteRepository.find();
      if (this.clientes)
        return this.clientes;
      else
        throw new Error('No se han encontrado clientes')
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async verUno(id: number): Promise<Cliente[]> {
    try {
      const criterio: FindOneOptions = { where: { idCliente: id } }
      let cliente: Cliente = await this.clienteRepository.findOne(criterio);
      this.clientes = [];
      if (cliente)
        this.clientes.push(cliente);
      else
        throw new Error('no se ha podido encontrar el cliente')
      return this.clientes;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND, error: 'Ha ocurrido un error en la busqueda de cliente' + id + ' : ' + error
      }, HttpStatus.NOT_FOUND);
    }
  }
  public async generarCliente(datos: ClienteDTO): Promise<Cliente> {
    try {
      if (datos.idCliente && datos.nombreApellido)
        if (await this.clienteCreado(datos.idCliente)) {
          throw new Error('El cliente ya ha sido creado.')
        } else {
          let cliente: Cliente = await this.clienteRepository.save(
            new Cliente( datos.nombreApellido, datos.direccion,datos.telefono))
          return cliente;
        }

    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }
  public async borrarUno(id: number): Promise<string> {
    try {
      if (id)
        if (await this.clienteCreado(id)) {
          await this.clienteRepository.delete(id);
        } else
          throw new Error('No se pudo encontrar el cliente.')
      else
        throw new Error('No se encontraron datos para eliminar el cliente');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  public async actualizarCliente(id: number, datos: ClienteDTO): Promise<string> {
    try {
      if (datos)
        if (datos.nombreApellido)
          if (await this.clienteCreado(id)) {
            let criterio: FindOneOptions = { where: { idCliente: id } }
            let cliente: Cliente = await this.clienteRepository.findOne(criterio);
            cliente.setNombreApellido(datos.nombreApellido);
            await this.clienteRepository.save(cliente);
          } else
            throw new Error('El cliente no se encuentra.')
        else
          throw new Error('Los datos para modificar el clienteno son validos');
      else
        throw new Error('No se han encontrado datos para modificar el cliente');
      return "ok";
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
        HttpStatus.NOT_FOUND)
    }
  }

  private async clienteCreado(id: number): Promise<boolean> {
    let criterio: FindOneOptions = { where: { idCliente: id } };
    let cliente: Cliente = await this.clienteRepository.findOne(criterio);
    return (cliente != null);
  }
}