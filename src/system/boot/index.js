import dotenv from "dotenv";
import('./defineGlobalObject.js')
import {startWebServer} from '#root/src/system/infrastructure/express-web-framework/index.js'
dotenv.config();

startWebServer(process.env.EXPRESS_PORT)