var readline = require('readline');
const { version } = require("./package.json");
var cwd = process.cwd();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

process.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
process.asyncFor = async function (number, callback) {
  for (let index = 0; index < number; index++) {
    await callback(index);
  }
}
process.title = "jssh";
process.busy = false;
process.varz = [
  {
    name: "dirCursor",
    value: "{col_fg_blue}{cwd}{col_reset}> "
  },
  {
    name: "newline",
    value: "\n"
  }
];

process.varz = process.varz.concat(require("./colors.js"));

process.stdout.write(`JSSH version ${version}
node.js version: ${process.version}
`);

(async () => {
  if (require("fs").existsSync("./autostart.jssh")) {
    let file = require("fs").readFileSync("./autostart.jssh").toString();
    file = file.split("\n");
    await process.asyncForEach(file, async line => {
      if (process.busy) return;
      process.busy = true;
      await require("./process.js")(cwd, line, dir => {
        cwd = dir;
      }, rl).catch(e => process.stderr.write(e + "\n"));
      process.busy = false;
    });
  }

  let tmpCursor = process.varz.find(c => c.name === "dirCursor").value
    .replace(/{cwd}/g, cwd)
    .replace(/{random}/g, Math.random())
    .replace(/\\/g, "");
  process.varz.forEach(v => tmpCursor = tmpCursor.replace(new RegExp(`{${v.name}}`, "g"), v.value));
  process.stdout.write(tmpCursor);

  rl.on('line', async line => {
    if (process.busy) return;
    process.busy = true;
    await require("./process.js")(cwd, line, dir => {
      cwd = dir;
    }, rl).catch(e => process.stderr.write("\x1b[31m" + e + "\x1b[0m\n"));
    if (!line.toString().startsWith("last")) process.lastCmd = line;
    let tmpCursor = process.varz.find(c => c.name === "dirCursor").value
      .replace(/{cwd}/g, cwd)
      .replace(/{random}/g, Math.random())
      .replace(/\\/g, "");
    process.varz.forEach(v => tmpCursor = tmpCursor.replace(new RegExp(`{${v.name}}`, "g"), v.value));
    process.stdout.write(tmpCursor);
    process.busy = false;
  });
})();