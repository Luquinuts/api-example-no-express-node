const http  = require('http')
const {router} = require('./lib/router')
const {indexRoutes} = require('./routes/index.routes')

class Server {
    PORT = process.env.PORT || 5000
    server
    regiteredRoutes = []

    constructor(){
        this.routes()
    }

    routes() {
        router.use('/api', indexRoutes)
    }

    start(){
        this.server = http.createServer((request, response) =>{
            if(request) router.route(request, response)
        })
        this.server.listen(this.PORT, ()=> console.log('El servidor esta en el puerto ' + this.PORT))

    }
}

const server = new Server()
server.start()