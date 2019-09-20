const { spawn } = require('child_process');

module.exports.execute = (cwd, args) => {
    return new Promise((reso, rej) => {
        let ping = spawn(args[0], args.slice(1))
                   .on('error', rej);
        ping.stdout.on('data', d=>process.stdout.write(d.toString()));
        ping.stderr.on('data', d=>process.stderr.write(d.toString()));
        ping.on('close', reso);
    });
}

module.exports.description =
`Run host's commands.`;