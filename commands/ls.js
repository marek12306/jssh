const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);

module.exports.execute = (cwd, args) => {
    return new Promise(async (reso,rej) => {
        let dir = args[0]||cwd;
        let ls = await readdir(dir);
        console.log(ls.join("\n"));
        return reso();
    })
};

module.exports.description = 
`List of files/directories.
ls
ls [directory]`;