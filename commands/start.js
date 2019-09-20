module.exports.execute = (cwd, args, commands, cd, version, rl) => {
    return new Promise(async (reso,rej) => {
        if(require("fs").existsSync(cwd+`/${args.join(" ").endsWith(".jssh") ? args.join(" ") : args.join(" ")+".jssh"}`)) {
            let file = require("fs").readFileSync(cwd+`/${args.join(" ").endsWith(".jssh") ? args.join(" ") : args.join(" ")+".jssh"}`).toString();
            file = file.split("\n");
            await process.asyncForEach(file, async line => {
              await require("../process.js")(cwd, line, cd, rl).catch(e=>process.stderr.write(e+"\n"));
            });
            return reso();
          } else {
              return rej("This file does not exist.");
          }
    });
}

module.exports.description = 
`Starts .jssh script.
start <filename>`;