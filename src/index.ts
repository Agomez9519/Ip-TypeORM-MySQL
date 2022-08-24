import * as express from "express"
import { AppDataSource } from "./data-source"
import * as cors from "cors"
import routes from "./routes";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {

    // se instancia express 
    const app = express()
    app.use(cors());
    app.use(express.json());
    app.use('/',routes)

    app.listen(PORT, () => {console.log(`Server is running on port: ${PORT}`)});


}).catch(error => console.log(error))
