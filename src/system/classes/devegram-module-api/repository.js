export default class {

    controller = null
    model = null

    constructor(controller) {
        this.controller = controller
        //this.mdo = controller.mdo
    }

    async _applyTask (taskToApply, request, response, routeParams)
    {
        return await this[taskToApply](request, response, ...routeParams);
    }
}
