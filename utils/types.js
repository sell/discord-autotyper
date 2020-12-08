const types = (type, input) => {
    if (typeof input !== type) throw new Error(`[AUTO TYPER ERROR] ${input} must be a ${type}, you provided a ${typeof input}`);
}

module.exports = { types }
