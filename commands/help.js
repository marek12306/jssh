const {promisify} = require("util");
const readfile = promisify(require("fs").readFile);

module.exports.execute = (cwd, args, commands) => {
    return new Promise(async (reso,rej) => {
        if(args[0]) {
            try {
                let cmd = require(`./${args[0]}.js`);
                if(cmd.execute||typeof(cmd.execute)==="function") 
                    console.log(`${cmd.description||"No description detected."}`);
            } catch (e) {
                return rej(e);
            }
        } else {
            console.log(commands.join(" ").match(/\b[\w']+(?:\s+[\w']+){0,4}/g).join("\n"));
        }
        return reso();
    });
}

module.exports.description = 
`Displays list of commands or command description.
help
help [command_name]`;