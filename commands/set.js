module.exports.execute = (cwd, args) => {
    return new Promise((reso,rej) => {
        if(typeof(args[1])!=="string") return rej("Invalid syntax. set <var_name> <var_value>");
        let fnd = process.varz.findIndex(x=>x.name===args[0]);
        if(fnd!=-1) {
            process.varz[fnd].value = args.slice(1).join(" ");
        } else {
            process.varz.push({name:args[0],value:args.slice(1).join(" ")});
        }
        return reso();
    });
}

module.exports.description = 
`Set variable to specifed value.
set <var_name> <var_value>`;