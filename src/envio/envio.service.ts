import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Envio } from './entities/envio.entity';
import { EnvioDTO } from './dto/envioDTO';

@Injectable()
export class EnvioService {
    private envios: Envio[] = [];

    constructor(@InjectRepository(Envio)
    private readonly envioRepository: Repository<Envio>) { }


    public async verEnvios(): Promise<Envio[]> {
        try {

            this.envios= await this.envioRepository.find();
            if (this.envios)
                return this.envios;
            else
                throw new Error('No se encuentra el envío')
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async verUno(id: number): Promise<Envio[]> {
        try {
            const criterio: FindOneOptions = { where: { idEnvio: id } }
            let envio: Envio = await this.envioRepository.findOne(criterio);
            this.envios = [];
            if (envio)
                this.envios.push(envio);
            else
                throw new Error('El envío no se encuentra.')
            return this.envios;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda del envío' + id + ' : ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async crearEnvio(datos: EnvioDTO): Promise<Envio> {
        try {
            if (datos.idEnvio && datos.tipoEnvio)
                if (await this.envioExistente(datos.idEnvio)) {
                    throw new Error('El envío ya se encuentra.')
                } else {
                    let envio:Envio = await this.envioRepository.save(
                        new Envio(datos.tipoEnvio, datos.estado, datos.precio))
                    return envio;
                }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }
    public async borrarEnvio(id: number): Promise<string> {
        try {
            if (id)
                if (await this.envioExistente(id)) {
                    await this.envioRepository.delete(id);
                } else
                    throw new Error('El envío no se encuentra.')
            else
                throw new Error('No hay datos para eliminar el envío');
            return "ok";
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }

    public async actualizarEnvio(id: number, datos: EnvioDTO): Promise<string> {
        try {
            if (datos)
                if (datos.tipoEnvio)
                    if (await this.envioExistente(id)) {
                        let criterio: FindOneOptions = { where: { idEnvio: id } }
                        let envio: Envio = await this.envioRepository.findOne(criterio);
                        envio.setTipoEnvio(datos.tipoEnvio);
                        await this.envioRepository.save(envio);
                    } else
                        throw new Error('El envío no se encuentra.')
                else
                    throw new Error('Los datos para modificar el envío no son validos');
            else
                throw new Error('No hay datos para modificar el envío');
            return "ok";
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }

    private async envioExistente(id: number): Promise<boolean> {
        let criterio: FindOneOptions = { where: { idEnvio: id } };
        let envio: Envio = await this.envioRepository.findOne(criterio);
        return (envio != null);
    }
}