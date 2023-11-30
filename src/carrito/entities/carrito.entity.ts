import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
@Entity('carrito')
export class Carrito {

    @PrimaryGeneratedColumn()
    idCarrito: number;

    @Column()
    precioTotal: number;

    @ManyToMany(() => Producto, producto => producto.carritos)
    productos: Producto[];

    @OneToMany(() => Venta, venta => venta.carrito)
    ventas: Venta[];
    
    constructor(precioTotal: number) {
        this.precioTotal = precioTotal;
    }
    public getPrecioTotal(): number { return this.precioTotal; }
    public setPrecioTotal(precioTotal: number): void { this.precioTotal = precioTotal; }
}


