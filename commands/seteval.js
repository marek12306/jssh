module.exports.execute = (cwd, args) => {
    return new Promise((reso, rej) => {
        if(!args[1]) return rej("Invalid syntax. seteval <variable> <code>");
        try {
            let result = eval(args.slice(1).join(" "));
            let fnd = process.varz.findIndex(x=>x.name===args[0]);
            if(fnd!=-1) {
                process.varz[fnd].value = result;
            } else {
                process.varz.push({name:args[0],value:result});
            }
            return reso();
        } catch (e) {
            return rej(e);
        }
    });
}

module.exports.description =
`Evaluates JavaScript script and sets result to variable.
seteval <variable> <code>`