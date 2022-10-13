class IndexController{
    async getIndex(req, res){
        res.writeHead(200, {'Content-Type': 'application/json'} )
        res.end(JSON.stringify({msg: 'Bienvenidos al index GET'}))
    }
}

const indexController = new IndexController()
module.exports = {indexController}