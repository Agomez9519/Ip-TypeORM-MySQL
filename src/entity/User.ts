import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToOne } from "typeorm"
import * as bcrypt from "bcryptjs"
import { Propietario} from "./Propietario"

@Entity()
@Unique(["username"])
@Unique(["id"])
export class User {
        
    @PrimaryColumn()
    username: string

    @Column()
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    role: string

    @Column()
    @IsNotEmpty()
    id: number

    @OneToOne(() => Propietario, (propietario) => propietario.username, {onDelete: 'CASCADE'})
    propietario: Propietario;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date   
    
    //Este metodo sera el encargado de encriptar la contraseña con los metodos de la clase bcrypct
    hasPassword():void{
        //el metodo SaltSync crea un Token para que encriptemos nuestra pass
        const salt=bcrypt.genSaltSync(12);
        //encriptamos el valor de password con el metodo hashSync
        this.password = bcrypt.hashSync(this.password,salt);
    }

    //Este metodo comprueba si la password que recibe con la que tiene el objeto es la misma,
    //descriptandola y comparandola
    checkPassword(password:string):boolean{
        return bcrypt.compareSync(password,this.password)
    }

}
