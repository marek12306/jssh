module.exports.execute = (cwd, args) => {
    return new Promise((reso, rej) => {
        try {
            let result = eval(args.join(" "));
            console.log(result);
            return reso();
        } catch (e) {
            return rej(e);
        }
    });
}

module.exports.description =
`Evaluates JavaScript script.
eval <code>`