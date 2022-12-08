export default class Player {

	name
	shown
	next

	constructor(name) {
		this.name = name
		this.next = null
		this.shown = false
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
}	
