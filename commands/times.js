module.exports.execute = (cwd, args, commands, cd, version, rl) => {
    return new Promise(async (reso,rej) => {
        if(!args[1]||isNaN(args[0])) return rej("Invalid syntax. times <numer> <command>");
        await process.asyncFor(parseInt(args[0]), async () => {
            await require("../process.js")(cwd, args.slice(1).join(" "), cd, rl)
                  .catch(e=>process.stderr.write(e+"\n"));
        });
        return reso();
    });
}

module.exports.description = 
`Runs command x times.
times <number> <command>`;