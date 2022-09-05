import "reflect-metadata"
import { DataSource } from "typeorm"
import { Multa } from "./entity/Multa"
import { Propietario } from "./entity/Propietario"
import { TipoPropietario } from "./entity/TipoPropietario"
import { TipoVehiculo } from "./entity/TipoVehiculo"
import { User } from "./entity/User"
import { Vehiculo } from "./entity/Vehiculo"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "api",
    synchronize: true,
    logging: false,
    entities: [User, Propietario, Vehiculo,TipoPropietario,TipoVehiculo,Multa],
    migrations: [],
    subscribers: [],
})
