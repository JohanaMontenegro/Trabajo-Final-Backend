import { kMaxLength, kStringMaxLength } from "buffer";
import { Carrito } from "src/carrito/entities/carrito.entity";
import { Venta } from "src/ventas/entities/venta.entity";
import { Column, Entity,ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('producto')
export class Producto {

    @PrimaryGeneratedColumn()
    idProducto: number

    @Column()
    nombre: string

    @Column()
    descripcion: string;

    @Column()
    precio: number;

    @Column()
    stock: boolean;

    @Column()
    urlImagen:string;

    @Column()
    tipo:string;


    @ManyToMany(() =>Carrito,carrito =>carrito.productos)
    carritos:Carrito[];

    constructor(nombre: string, descripcion: string, precio: number, stock: boolean) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string) {
        return this.nombre = nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string) {
        return this.descripcion = descripcion;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number) {
        return this.precio = precio;
    }

    public getStock(): boolean {
        return this.stock;
    }

    public setStock(stock: boolean) {
        return this.stock = stock;
    }

    

}

