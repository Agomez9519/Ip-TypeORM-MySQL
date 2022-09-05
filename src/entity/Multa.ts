import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";

@Entity()
@Unique(['id_multa'])
export class Multa{

    @PrimaryGeneratedColumn()
    id_multa: number;

    @Column()
    @IsNotEmpty()
    juzgado:string;
    
    @Column()
    @IsNotEmpty()
    descripcion:string;

    @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.multas)
    @JoinColumn({name:"patente_fk"})
    vehiculo: Vehiculo;
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   

}