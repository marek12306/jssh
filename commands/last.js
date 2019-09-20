module.exports.execute = (cwd, args, commands, cd, version, rl) => {
    return new Promise(async (reso,rej) => {
        if(!process.lastCmd) return rej("Didn't found last invoked command");
        await require("../process.js")(cwd, process.lastCmd, cd, rl)
              .catch(e=>process.stderr.write(e+"\n"));
        return reso();
    });
}

module.exports.description = 
`Runs last command.
last`;