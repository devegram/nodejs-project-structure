import { fileURLToPath } from "url";
import { dirname } from "path";
import {response} from '#root/src/system/infrastructure/express-web-framework/index.js'
import webUserClass from '#root/src/system/classes/web-user/index.js'
import moduleApiControllerClass from '#root/src/system/classes/devegram-module-api/controller.js'
import moduleApiRepositoryClass from '#root/src/system/classes/devegram-module-api/repository.js'
import pg from './../infrastructure/postgres-database/index.js'
import mysql from './../infrastructure/mysql-database/index.js'
const mainDir = dirname(fileURLToPath(import.meta.url)) + "/../../../"


global._sys = {
    infra: {
        mysql,
        pg
    },
    modules: {
        instances: {},
        data: {}
    },
    path: {
        mainDir: mainDir,
    },
    class: {
        webUser: webUserClass,
        moduleApi: {
            controller: moduleApiControllerClass,
            repository: moduleApiRepositoryClass
        },
    },
    util: {
        webResponse: response
    }
};

