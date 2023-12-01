import controller from './controller.js';
export default {
    installRouter (expressInstance) {
        expressInstance.all('/xapi/:namespace/:module/:method/:any*?', (req, res) => {
            let namespace = req.params.namespace
            let module = req.params.module
            let method = req.params.method
            let any = req.params.any
            let allExtra = '';
            if (any) allExtra = any
            if (req.params['0']) allExtra += req.params['0']


            let moduleName = namespace + module
            let instance = _sys.modules.instances[moduleName]

            if (!instance) {
                _sys.modules.data[moduleName] = {}
                instance = new controller(_sys.modules.data[moduleName])
                _sys.modules.instances[moduleName] = instance
            }

            instance.api(req, res, namespace, module, method, allExtra)
            //res.send("REQUEST COMPLETED")
        })
    },

    allowCrossOrigin(expressInstance, allowedDomains = "*") {
        expressInstance.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', allowedDomains);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
    }
}
