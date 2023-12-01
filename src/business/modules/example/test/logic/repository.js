import model from './model.js'
export default class extends _sys.class.moduleApi.repository {

    constructor () { super()
        this.model = new model()
    }

    //http://localhost:4000/xapi/example/test/hello
    helloGET() {
        return "Hello from Example/Test module is successful"
    }
}