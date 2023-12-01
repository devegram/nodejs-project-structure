import repo from './repository.js'
export default class extends _sys.class.moduleApi.controller {
    privateAccess = true;
    signature = '/';

	constructor (request, response, method, routeParams, webUser) { super()
        this.taskToApply = method;
        this.request = request;
        this.response = response;
        this.routeParams = routeParams;
        this.webUser = webUser;

        //this.permissionManager = new PermissionManager();
        //this._validateUserPermissions();
        this.repository = new repo(this);
    }

}
