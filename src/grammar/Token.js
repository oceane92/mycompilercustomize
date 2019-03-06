class Token {
	constructor(type, value = null, pos = null) {
		if (!type) throw new Error("a token requires a type")

		this.type = type
		this.value = value
		this.pos = pos
	}
}

module.exports = Token;