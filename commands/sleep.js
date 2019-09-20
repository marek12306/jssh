module.exports.execute = (cwd, args) => {
    return new Promise((reso,rej) => {
        if(!args[0]||isNaN(args[0])) return rej("Sleep time is not defined.");
        setTimeout(reso, args[0]);
    })
}

module.exports.description = 
`Waits x ms.
sleep <ms>`;