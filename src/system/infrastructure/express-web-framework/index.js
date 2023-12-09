import express from "express";
import EventEmitter from "events";
import bodyParser from "body-parser"
import devegramXapi from './../devegram-xapi/router.js'

export const app = express();
app.use(express.json());

app.use(bodyParser.json({limit: '2mb'})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true, limit: '2mb'}));
devegramXapi.allowCrossOrigin(app)
devegramXapi.installRouter(app)

// Catch-all route for non-existing routes
app.use((req, res) => {
    _sys.util.webResponse.forbidden(res, 'Access denied');
});

export const startWebServer = (port = 4000) => {
    EventEmitter.defaultMaxListeners = 600;
    EventEmitter.setMaxListeners(600);
    process.setMaxListeners(600)
    const appListener = app.listen(port, () => {
        console.log(`Server Running....`, " ❤️ ", "port", appListener.address().port)
    });
}

export default {
    app,
    startWebServer
}
