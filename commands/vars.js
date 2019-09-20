module.exports.execute = async (cwd, args) => {
    console.log(process.varz);
}

module.exports.description =
`Displays list of all variables and its values.
vars`