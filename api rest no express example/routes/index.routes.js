const {indexController} = require('../controller/index.controller')

class IndexRoutes{
    routes = [
        { 
        method: 'GET',
        path: '/foo/:id/casa',
        controller: indexController.getIndex 
        }
    ]
}

const indexRoutes = new IndexRoutes()
module.exports = {indexRoutes}