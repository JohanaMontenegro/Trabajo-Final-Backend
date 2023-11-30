import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ProductosDTO } from './dto/productoDTO'
import { Producto } from './entities/producto.entity';


@Injectable()
export class ProductosService {
    private productos: Producto[] = [];

    constructor(@InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>) { }


    public async mostrarProductos(): Promise<Producto[]> {
        try {

            this.productos = await this.productoRepository.find();
            if (this.productos)
                return this.productos;
            else
                throw new Error('No se encuentran productos.')
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda: ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async mostrarUno(id: number): Promise<Producto[]> {
        try {
            const criterio: FindOneOptions = { where: { idProducto: id } }
            let producto: Producto = await this.productoRepository.findOne(criterio);
            this.productos = [];
            if (producto)
                this.productos.push(producto);
            else
                throw new Error('el producto no se encuentra.')
            return this.productos;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Se ha producido un error en la búsqueda del producto ' + id + ' : ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
    public async crearProducto(datos: ProductosDTO): Promise<Producto> {
        try {
            if (datos.idProducto && datos.nombre)
                if (await this.cargarProducto(datos.idProducto)) {
                    throw new Error('El producto ya se encuentra.')
                } else {
                    let producto: Producto = await this.productoRepository.save(
                        new Producto(datos.descripcion, datos.nombre, datos.precio, datos.stock))
                    return producto;
                }

        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }

    public async actualizar(id: number, datos: ProductosDTO): Promise<string> {
        try {
            if (datos)
                if (datos.nombre)
                    if (await this.cargarProducto(id)) {
                        let criterio: FindOneOptions = { where: { idCiudad: id } }
                        let producto: Producto = await this.productoRepository.findOne(criterio);
                        producto.setNombre(datos.nombre);
                        await this.productoRepository.save(producto);
                    } else
                        throw new Error('El producto no se ha encontrado.')
                else
                    throw new Error('Los datos para modificar el producto no son validos');
            else
                throw new Error('No se han encontrado datos para modificar el producto');
            return "ok";
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }

    public async borrarUno(id: number): Promise<string> {
        try {
            if (id)
                if (await this.cargarProducto(id)) {
                    await this.productoRepository.delete(id);
                } else
                    throw new Error('No se encuentra el producto.')
            else
                throw new Error('No hay datos correspondientes para eliminar el producto');
            return "ok";
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `500 - ERROR:` + error },
                HttpStatus.NOT_FOUND)
        }
    }

    private async cargarProducto(id: number): Promise<boolean> {
        let criterio: FindOneOptions = { where: { idProducto: id } };
        let producto: Producto = await this.productoRepository.findOne(criterio);
        return (producto != null);
    }

    public async filtrarTipo(tipo: string): Promise<Producto[]> {
        try {
            this.productos = await this.productoRepository.find({
                where: { tipo },
            });  return this.productos
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND, error: 'Se ha producido un error en la búsqueda del producto ' + tipo + ' : ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

}

