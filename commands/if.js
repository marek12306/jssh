module.exports.execute = (cwd, args, commands, cd, version, rl) => {
    return new Promise(async (reso,rej) => {
        if(args[0].includes("===")) {
            if(args[0].split("===")[0]===args[0].split("===")[1]) {
                await require("../process.js")(cwd, args.slice(1).join(" "), cd, rl)
                      .catch(e=>process.stderr.write(e+"\n"));
                return reso();
            } else {
                return reso();
            }
        } else if(args[0].includes("!==")) {
            if(args[0].split("!==")[0]!==args[0].split("!==")[1]) {
                await require("../process.js")(cwd, args.slice(1).join(" "), cd, rl)
                      .catch(e=>process.stderr.write(e+"\n"));
                return reso();
            } else {
                return reso();
            }
        } else return rej("Invalid syntax. if <text><===/!==><result> <command>")
    });
}

module.exports.description = 
`Simple 'if' command.
if x===x echo Yes
if x!==y echo Yes
if x===y echo No`;