const { spawn } = require('child_process');

module.exports.execute = (cwd, args) => {
    return new Promise((reso, rej) => {
        let ping = spawn("ping", args);
        ping.stdout.on('data', d=>process.stdout.write(d.toString()));
        ping.stderr.on('data', d=>process.stderr.write(d.toString()));
        ping.on('close', reso);
    });
}

module.exports.description = 
`Send PING packets to domain/ip.`;