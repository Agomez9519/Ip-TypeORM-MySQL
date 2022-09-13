import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Juzgado } from "./Juzgado";
import { Vehiculo } from "./Vehiculo";

@Entity()
@Unique(['id_multa'])
export class Multa{

    @PrimaryGeneratedColumn()
    id_multa: number;

    @ManyToOne(() => Juzgado, (juzgado) => juzgado.multas,{cascade: true})
    @JoinColumn({name: "juzgado_fk"})
    juzgado:Juzgado;
    
    @Column()
    @IsNotEmpty()
    descripcion:string;

    @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.multas,{cascade: true})
    @JoinColumn({name:"patente_fk"})
    vehiculo: Vehiculo;
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   

}