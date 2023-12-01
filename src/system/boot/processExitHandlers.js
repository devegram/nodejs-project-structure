// only works when there is no task running
// because we have a server always listening port, this handler will NEVER execute
process.on("beforeExit", (code) => {
    console.log("Process beforeExit event with code: ", code);
});

// only works when the process normally exits
// on windows, ctrl-c will not trigger this handler (it is unnormal)
// unless you listen on 'SIGINT'
process.on("exit", async (code) => {
    _sys.i.exitLog('exit', code)
    if (code === 1) {
        for (let x in _sys.var.CURRENT_ACTIVE_DEVEMATIONS_OBJ) {
            await _sys.var.CURRENT_ACTIVE_DEVEMATIONS_OBJ[x].savePoolResults()
        }
    }
    console.log("Process exit event with code: ", code);
    /*process.exit(0);
    if (_sys.i) {
        console.log("hardStopNode")
        await _sys.i.shellExec.shell('curl localhost:8074?c=hardStopNode')
    }*/
});

// just in case some user like using "kill"
process.on("SIGTERM", (signal) => {
    console.log(`Process ${process.pid} received a SIGTERM signal`);
    console.log("signal", signal);
    process.exit(0);
});

// catch ctrl-c, so that event 'exit' always works
process.on("SIGINT", (signal) => {
    console.log(`Process ${process.pid} has been interrupted`);
    process.exit(0);
});

// what about errors
// try remove/comment this handler, 'exit' event still works
process.on("uncaughtException", (err) => {
    //_sys.i.exitLog('uncaughtException', err.message)
    console.log(`Uncaught Exception: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
});