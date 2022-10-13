const URL = require('url').URL

class Router{
    _routes = []
    _baseUrl = 'http://localhost:' + (process.env.PORT || 5000)

    use(url, callback){
        const _url = new URL(url, this._baseUrl).pathname
        let basePath = _url.replace(/^\/+|\/+$/g, '')
        callback.routes.forEach(route=>{
            let method = route.method
            let controller = route.controller
            let path = '/'+ basePath
            let params = []
            route.path.split('/').forEach((p, i)=>{
                if(p){
                    let key = p.split(':')[1]
                    if(key){
                        params[i+1] = key
                        path += '/([0-9a-z]+)'
                    }
                    else 
                        path += '/' + p
                }
            })

            path = new RegExp(path + '$')
            this._routes.push({path, method, controller, params})
        })
    }


    async route(req, res){
        const url = new URL(req.url, this._baseUrl)
        const method = req.method.toLowerCase()
        const route = await this._routes.find(route=>{
            const methodMatch = this._routes.method == method
            const pathMatch = url.pathname.match(this._routes.path)
            return pathMatch && methodMatch
        })
        if(route){
            req.params = this.getParams(url.pathname, route.params)
            req.query = this.getQuery(url)
            req.body = ""
            req.on('data', chunk => req.body += chunk)
            req.on('end', ()=> route.controller(req, res))
        }
        else
            this.notFound(res)
    }

    notFound(res){
        res.writeHead(404, {'Content-Type':'appliaction/json'})
        res.end(JSON.stringify({}))
    }

    getParams(pathname, params){
        let objParams = {}
        params.forEach((p, i) => {
            if(p)
                objParams[p]= pathname.split('/')[i]
        })
        console.log('Params', JSON.stringify(objParams))
        return objParams
    }

    getQuery(_url){
        let query = {}
        for (const name of _url.searchParams.keys()){
            query[name] = _url.searchParams.get(name)
        }
        console.log('Query', JSON.stringify(query))
        return query
    }
}

const router = new Router()
module.exports = {router}