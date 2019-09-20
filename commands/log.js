function hook_stream(stream, callback) {
    var old_write = stream.write
  
    stream.write = (function(write) {
      return function(string, encoding, fd) {
        callback(string, encoding, fd)
      }
    })(stream.write)
  
    return function() {
      stream.write = old_write
    }
}

module.exports.execute = (cwd, args, commands, cd, version, rl) => {
    return new Promise(async (reso,rej) => {
        if(!args[1]) return rej("Invalid syntax. log <filename> <command>");
        let log_file = require('fs').createWriteStream(cwd + '/' + args[0], {flags : 'w'})
        let unhook_stdout = hook_stream(process.stdout, function(string, encoding, fd) {
            log_file.write(string, encoding)
        });
        let unhook_stderr = hook_stream(process.stderr, function(string, encoding, fd) {
            log_file.write(string, encoding)
        });
        await require("../process.js")(cwd, args.slice(1).join(" "), cd, rl)
              .catch(e=>process.stderr.write(e+"\n"));
        unhook_stdout()
        unhook_stderr()
        return reso();
    });
}

module.exports.description = 
`Redirect command output from console to file.
log <filename> <command>`;