import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Propietario } from "./Propietario";



@Entity()
@Unique(['id_tipo'])
export class TipoPropietario{

    @PrimaryGeneratedColumn()
    id_tipo:number;

    @Column()
    @IsNotEmpty()
    descripcion:string;

    @OneToOne(() => Propietario , (propietario) => propietario.tipoPropietario, {onDelete: 'CASCADE'})
    propietario: Propietario;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   

}