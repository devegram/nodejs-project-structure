export default class {

    request = null
    repository = null

    constructor() {}

    _hasMethod(context, method) {
        return typeof context[method] === 'function'
    }

    async _applyRepositoryTask (taskToApply) {
		return await this.repository._applyTask(taskToApply, this.request, this.routeParams);
	}

	async _applyOwnTask (taskToApply) {
        return await this[taskToApply](this.request, this.routeParams)
	}

    async _applyTask (taskToApply) {
        if (this._hasMethod(this, taskToApply)) return await this._applyOwnTask(taskToApply);
        if (this._hasMethod(this.repository, taskToApply)) return await this._applyRepositoryTask(taskToApply);
        throw new Error('API 404 Action ' + taskToApply);
    }
}
