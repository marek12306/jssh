const {resolve} = require("path");
const fs = require("fs");

module.exports.execute = (cwd, args, commands, cd) => {
    return new Promise((reso,rej) => {
        cwd = resolve(cwd, args.join(" "));

if (!fs.existsSync(cwd)){
    fs.mkdirSync(cwd);
    return reso();
} else {
    return rej("Folder " + cwd + " exists.");
}
    });
};

module.exports.description = 
`Creates folder
mkdir [folder name]`;
