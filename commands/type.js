const {promisify} = require("util");
const readfile = promisify(require("fs").readFile);

module.exports.execute = (cwd, args) => {
    return new Promise(async (reso,rej) => {
        if(require("fs").existsSync(cwd+`/${args.join(" ")}`)) {
            let file = await readfile(cwd+`/${args.join(" ")}`);
            console.log(file.toString());
            return reso();
          } else {
              return rej("This file does not exist.");
          }
    });
}

module.exports.description = 
`Sends file content to console.
type <filename>`;