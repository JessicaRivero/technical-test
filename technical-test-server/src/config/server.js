const express = require('express')
const cors = require('cors')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.itemPath = '/api/items';

        this.middlewares();
        this.routes();
    }
   
    middlewares(){
       
       //Cors
       this.app.use(cors());

       //Parsear a formato json
       this.app.use(express.json())

       //directorio público
       this.app.use(express.static('public'));
    }

    //Define las rutas disponibles
    routes(){
        
        this.app.use(this.itemPath, require('../routes/item.route'))

        
    }

    //Define que puertos estaran escuchando
    listen(){
        this.app.listen(this.port, () =>{
            console.log("Init technical test server in port", this.port);
        }
            )
    }
   
}

module.exports = Server;