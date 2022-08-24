import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm"
import * as bcrypt from "bcryptjs"

@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    @IsEmail()
    username: string

    @Column()
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    role: string

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
