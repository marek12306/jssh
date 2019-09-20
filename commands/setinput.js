module.exports.execute = (cwd, args, dirs, cd, version, rl) => {
    return new Promise(async (reso,rej) => {
        if(!args[0]) return rej("Invalid syntax. setinput <variable>");
        let argz = args.slice(1).join(" ")
        rl.question(argz.length<1 ? "" : argz, async line => {
            let fnd = process.varz.findIndex(x=>x.name===args[0]);
            if(fnd!=-1) {
                process.varz[fnd].value = line;
            } else {
                process.varz.push({name:args[0],value:line});
            }
            return reso();
        });
    })
};

module.exports.description =
`Sets variable value to text from user input.
input <var_name> <cursor_text>`;