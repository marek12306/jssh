const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);
const readfile = promisify(require("fs").readFile);
const direxists = require("fs").existsSync;
const {version} = require("./package.json");

module.exports = (cwd, line, cd, rl) => {
    return new Promise(async (reso, rej) => {
        if(line==="") return reso();
        if(!direxists("./commands")) return rej("Error: Commands folder not found");
        let command = line.split(" ")[0];
        let args = line.split(" ").slice(1);
        process.varz.forEach(v=>args = args.join(" ").replace(new RegExp(`{${v.name}}`, "g"), v.value).split(" "));
        args = args.join(" ")
                    .replace(/{random}/g, Math.random())
                    .replace(/{cwd}/g, cwd)
                    .replace(/\\/g, "").split(" ");
        let commands = await readdir("./commands");
        if(commands.length<1) return rej("Error: No files in commands folder");
        commands = commands.filter(x=>x.split(".").slice(-1)[0]==="js")
                           .map(x=>x.replace(/\.[^/.]+$/, ""));
        if(commands.length<1) return rej("Error: No commands found in commands folder");
        if(commands.includes(command))  {
            let cmd;
            try {
                cmd = require(`./commands/${command}.js`);
            } catch (e) {
                return rej(e);
            }
            if(!cmd||!cmd.execute||typeof(cmd.execute)!=="function") return rej("Error: Command "+command+" is in invalid format or corrupted");
            try {
                await cmd.execute(cwd, args, commands, cd, version, rl);
                return reso();
            } catch (e) {
                return rej(e);
            }
        } else if(require("fs").existsSync(cwd+`/${line.endsWith(".jssh") ? line : line+".jssh"}`)) {
            let file = require("fs").readFileSync(cwd+`/${line.endsWith(".jssh") ? line : line+".jssh"}`).toString();
            file = file.split("\n");
            await process.asyncForEach(file, async line => {
              await require("./process.js")(cwd, line, cd, rl).catch(e=>process.stderr.write(e+"\n"));
            });
            return reso();
        } else if(direxists("./scripts")&&require("fs").existsSync(`./scripts/${line.endsWith(".jssh") ? line : line+".jssh"}`)) {
            let file = require("fs").readFileSync(`./scripts/${line.endsWith(".jssh") ? line : line+".jssh"}`).toString();
            file = file.split("\n");
            await process.asyncForEach(file, async line => {
              await require("./process.js")(cwd, line, cd, rl).catch(e=>process.stderr.write(e+"\n"));
            });
            return reso();
        } else {
            return rej("Error: Command "+command+" not found");
        }
    })
}