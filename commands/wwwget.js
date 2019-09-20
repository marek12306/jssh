const request = require('request');

module.exports.execute = (cwd, args) => {
    return new Promise((reso,rej) => {
        switch(args[0]) {
            case "print":
                request(args.slice(1).join(" "), (err, res, body) => {
                    if (err) { return rej(err); }
                    process.stdout.write(body+"\n");
                    return reso();
                });
                break;
            case "set":
                request(args.slice(2).join(" "), (err, res, body) => {
                    if (err) { return rej(err); }
                    let fnd = process.varz.findIndex(x=>x.name===args[1]);
                    if(fnd!=-1) {
                        process.varz[fnd].value = body;
                    } else {
                        process.varz.push({name:args[1],value:body});
                    }
                    return reso();
                });
                break;
            default: 
                return rej("You need to select mode (print/set)");
        }
    });
};

module.exports.description =
`Downloads content from internet.
Console: wwwget print <url>
Variable: wwwget set <zmienna> <url>`;