export default class {
    constructor() {}

    unify (res, code, status, data = null, message = null) {
        const obj = {code, status}
        if (data) obj.data = data
        if (message) obj.message = message

        res.status(code).json(obj);
    }

    created (res, data = null, message = null) {
        this.unify(res, 201, 'created', data, message)
    }

    fetched (res, data, message = null) {
        this.unify(res, 200, 'fetched', data, message)
    }

    updated (res, data, message = null) {
        this.unify(res, 200, 'updated', data, message)
    }

    deleted (res, data = null, message = null) {
        this.unify(res, 204, 'deleted', data, message)
    }

    success (res, data = null, message = null) {
        this.unify(res, 200, 'success', data, message)
    }

    forbidden (res, message = null) {
        this.unify(res, 403, 'forbidden', null, message)
    }

    unauthorized (res, message = null) {
        this.unify(res, 401, 'unauthorized', null, message)
    }

    notFound (res, message = null) {
        this.unify(res, 404, 'not found', null, message)
    }

    clientError (res, message = null) {
        this.unify(res, 400, 'client error', null, message)
    }

    serverError (res, message = null) {
        this.unify(res, 500, 'server error', null, message)
    }
}
