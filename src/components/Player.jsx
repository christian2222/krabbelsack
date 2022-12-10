export default class Player {

	name
	shown
	seen
	next

	constructor(name) {
		this.name = name
		this.next = null
		this.shown = false
		this.seen = false
	}

	get name() {
		return this.name
	}

	set name(newName) {
		this.name = newName
	}

	
	get next() {
		return this.next
	}

	set next(nextOne) {
		this.next = nextOne
	}
	
	get shown() {
		return this.shown
	}

	set shown(showMe) {
		this.shown = showMe
	}

	get seen() {
		return this.seen
	}

	set seen(reallySeen) {
		this.seen = reallySeen
	}
}
