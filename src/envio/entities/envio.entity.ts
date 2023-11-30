import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';

@Entity('envio')
export class Envio {

    @PrimaryGeneratedColumn()
    idEnvio: number;

    @Column()
    tipoEnvio: string;

    @Column()
    precio: number;

    @Column()
    estado: string;

    @OneToMany(() => Venta, venta => venta.envio)
    ventas: Venta[];
    
    constructor(tipoEnvio: string, estado: string, precio: number) {
        this.tipoEnvio = tipoEnvio;
        this.estado = estado;
        this.precio = precio;
    }

    public getTipoEnvio(): string { return this.tipoEnvio; }
    public setTipoEnvio(nombre: string): void { this.tipoEnvio = this.tipoEnvio; }

    public getEstado(): string { return this.estado; }
    public setEstado(estado: string): void { this.estado = estado; }

    public getPrecio(): number { return this.precio; }
    public setPrecio(precio: number): void { this.precio = precio; }
}





