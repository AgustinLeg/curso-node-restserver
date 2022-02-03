const express = require("express");
const cors = require("cors");
const {dbConnection} = require('../database/config')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.contectarDB();
        
        // Middlewares
        this.middlewares();

        // Rutas de mi appliacion
        this.routes();
    }

    async contectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use(cors());

        // Lectura y Parse del body
        this.app.use( express.json() );
        this.app.use(express.urlencoded({ extended: false }));
        
        // Directorio publico
        this.app.use( express.static('public') );
        
    }

    routes(){
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        });
    }
    
}

module.exports = Server;