import { fileURLToPath } from "url";
import { dirname } from "path";
import responseInstance from '#class/web-response/instance.js'

import webUserClass from '#class/web-user/index.js'
import moduleApiControllerClass from '#class/devegram-module-api/controller.js'
import moduleApiRepositoryClass from '#class/devegram-module-api/repository.js'
import pg from '#infra/postgres-database/index.js'
import mysql from '#infra/mysql-database/index.js'
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
        webResponse: responseInstance
    }
};

