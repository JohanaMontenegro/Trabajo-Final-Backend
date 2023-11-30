import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { rolDTO } from './dto/rolDTO';


@Injectable()
export class rolService {
    private roles: Rol[] = [];

    constructor(@InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>) { }


    public async mostrarRoles(): Promise<Rol[]> {
        try {

            this.roles = await this.rolRepository.find();
            if (this.roles)
                return this.roles;
            else
                throw new Error('No se encuentran roles.')
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async mostrarUnRol(id: number): Promise<Rol[]> {
        try {
            const criterio: FindOneOptions = { where: { idRol: id } }
            let rol: Rol = await this.rolRepository.findOne(criterio);
            this.roles = [];
            if (rol)
                this.roles.push(rol);
            else
                throw new Error('El rol no se encuentra.')
            return this.roles;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de ciudad ' + id + ' : ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async crearUnRol(datos: rolDTO): Promise<Rol> {
        try {
            if (datos.idRol && datos.nombre)
                if (await this.rolCreado(datos.idRol)) {
                    throw new Error('La ciudad ya se encuentra.')
                } else {
                    let rol: Rol = await this.rolRepository.save(
                        new Rol( datos.nombre,datos.descripcion))
                    return rol;
                }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }
    public async borrarRol(id: number): Promise<string> {
        try {
            if (id)
                if (await this.rolCreado(id)) {
                    await this.rolRepository.delete(id);
                } else
                    throw new Error('El rol no se encuentra.')
            else
                throw new Error('No hay datos para eliminar roles');
            return "ok";
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }

    public async actualizarRol(id: number, datos: rolDTO): Promise<string> {
        try {
            if (datos)
                if (datos.nombre)
                    if (await this.rolCreado(id)) {
                        let criterio: FindOneOptions = { where: { idRol: id } }
                        let rol: Rol = await this.rolRepository.findOne(criterio);
                        rol.setNombre(datos.nombre);
                        await this.rolRepository.save(rol);
                    } else
                        throw new Error('El rol no se encuentra.')
                else
                    throw new Error('Los datos para modificar el rol no son validos');
            else
                throw new Error('No hay datos para modificar los roles');
            return "ok";
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }

    private async rolCreado(id: number): Promise<boolean> {
        let criterio: FindOneOptions = { where: { idCiudad: id } };
        let rol:Rol = await this.rolRepository.findOne(criterio);
        return (rol!= null);
    }
}