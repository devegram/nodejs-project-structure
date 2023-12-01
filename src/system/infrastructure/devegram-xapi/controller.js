import fs from 'fs'
export default class {

    constructor(moduleDataObject) {
        this.mdo = moduleDataObject
    }
    async fileExists (path) {
        try {
            await fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK)
            return true
        } catch {
            return false
        }
    }
    async api (request, response, namespace, module, method, any = null) {
        if (request.method === 'OPTIONS') {
            response.setHeader('Access-Control-Allow-Origin', "*");
            response.status(200).send("OK");
            return
        }

        namespace = this.cleanApiSegments(namespace)
        module = this.cleanApiSegments(module)
        method = this.cleanApiSegments(method)
        any = decodeURIComponent(any) ?? ""

        const apiClassPath = this.buildModulePath(namespace, module)
        if (!await this.fileExists(apiClassPath)) return response.status(404).json({'errors': apiClassPath});// no controller found
        //let $requestTime = Date.now();

        const webUser = new _sys.class.webUser
        this.identifyWebUser(webUser, request.header('authorization'))

        try {
            const routeParams = any.split('/'); //if (routeParams.length) routeParams.shift();
            const apiController = (await import('#root/src/business/modules/example/test/logic/controller.js')).default
            const taskToApply = method + request.method

            let apiResponse = await (new apiController(request, response, taskToApply, routeParams, webUser, this.mdo))._applyTask(taskToApply);
            if (typeof apiResponse == 'object') return response.status(200).send(apiResponse)
            return response.status(200).send(apiResponse + "")
            //if ($this->log) ArcLogger::arcLog($request, apiResponse, $requestTime, time());
        } catch (exceptionVar) {
            console.log('xapi-console-error', exceptionVar, '\n')
            response.status(400).send("API 400")
            //if ($this->log) ArcLogger::arcLog($request, $e->getMessage(), $requestTime, time());
            //return response()->json(['errors' => [$e->getMessage()]], 400);
        }
    }
    identifyWebUser (webUser, bearerHeader) {
        if (!bearerHeader) return
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        webUser.identifyByToken(bearerToken)
    }
    cleanApiSegments (segment) {
        return segment.replace(/[^a-z0-9]/gi, '');
    }
    buildModulePath (namespace, module) {
        return _sys.path.mainDir  + "src/business/modules/" + namespace + "/" + module + "/logic/controller.js";
    }

}
