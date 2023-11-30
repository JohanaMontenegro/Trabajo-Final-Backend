import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Venta } from 'src/ventas/entities/venta.entity';

@Entity('medios-pago')
export class MedioPago {

    @PrimaryGeneratedColumn()
    idPago: number;

    @Column()
    tipoPago: string;

    @OneToMany(()=> Venta,venta =>venta.medio)
    ventas:Venta[];

    constructor(tipoPago: string) {
        this.tipoPago = tipoPago;
    }
    public getIdPago(): number { return this.idPago; }
    public getPago(): string { return this.tipoPago; }
    public setPago(tipoPago: string): void { this.tipoPago = tipoPago; }
}

