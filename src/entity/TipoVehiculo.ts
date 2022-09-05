import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";



@Entity()
@Unique(['tipoVehiculo'])
export class TipoVehiculo{

    @PrimaryGeneratedColumn()
    tipoVehiculo:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;

    @OneToOne(() => Vehiculo, (vehiculo) => vehiculo.TipoVehiculo, {onDelete: 'CASCADE'})
    vehiculo:Vehiculo;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   
}