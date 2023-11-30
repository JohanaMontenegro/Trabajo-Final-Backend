import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDTO } from './dto/clienteDTO';
import { Cliente } from './entities/cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  verClientes() {
    return this.clienteService.verClientes();
  }

  @Get(':id')
  verUno(@Param('id') id:number) {
    return this.clienteService.verUno(+id);
  }

  
  @Post()
  generarCliente(@Body() cliente: ClienteDTO): Cliente | any {
    return this.clienteService.generarCliente(cliente);
  }


  @Put(':id')
  actualizarCliente(@Param('id') id:number, @Body() clienteDto:ClienteDTO) {
    return this.clienteService.actualizarCliente(+id, clienteDto);
  }

  @Delete(':id')
  borrarUNo(@Param('id') id:number) {
    return this.clienteService.borrarUno(+id);
  }
}
