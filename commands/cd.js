const {resolve} = require("path");

const checkDirectory = (directory) => {  
    return new Promise((reso,rej) => {
        require("fs").stat(directory, function(err, stats) {
            if (err) {
              return rej(err);
            } else return reso();
          });
    })
}

module.exports.execute = (cwd, args, commands, cd) => {
    return new Promise((reso,rej) => {
        cwd = resolve(cwd, args.join(" "));
        checkDirectory(cwd)
            .then(() => {
                cd(cwd);
                return reso();
            })
            .catch(e=>{ 
                if(e!==null) return rej(e); 
            });
    });
}

module.exports.description = 
`Changes CWD (current working directory) to another.
cd [directory]`;