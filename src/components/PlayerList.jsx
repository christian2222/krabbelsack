import Player from './Player.jsx'

export default class PlayerList {
	list=[]
	beschenkt=false
	
	construct() {
		this.list = []
		this.beschenkt = false
	}

	addName(playerName) {
		if(!this.containsName(playerName)) {
			this.list.push(new Player(playerName))
			return true
		} else return false
	}

	getPlayerByName(name) {
		let player = null
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i].name == name) return this.list[i]
		}
		return player
	}

	removeName(playerName) {
		let removeIdx = null
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i].name == playerName) {
				removeIdx = i	
			}
		}

		if(removeIdx != null) {
			this.list.splice(removeIdx,1)
			return true
		} else return false
	}

	removeIthElement(i) {
		this.list.splice(i,1)
	}

	containsName(playerName) {
		let contained = false
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i].name == playerName) contained = true
		}

		return contained
	}

	hasBeenReadByName(playerName) {
		//if(!this.containsName(playerName)) return false
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i].name == playerName) return list[i].shown
		}
		return false
	}

	setReadByName(playerName, readBoolean) {
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i].name == playerName) this.list[i].shown = readBoolean
		}

	}

	createRandomPlayerList() {
		if(this.hasElements()) {
			// how to clone an object with methods
			// I don't need an proxy object here
			// but an object with same properties and methods
			let copy = this.cloneNextFree()
			let newList = new PlayerList()
			while(copy.hasElements()) {
				let randomIdx = Math.floor(Math.random()*copy.list.length)
				//console.log(copyList.list)
				//console.log(copyList.list[0].name)
				//console.log(randomIdx)
				//console.log(copyList[randomIdx])
				let randomPlayerName = copy.list[randomIdx].name
				newList.addName(randomPlayerName)
				copy.removeName(randomPlayerName)
			}
			return newList

		} else return new PlayerList()
	}

	cloneNextFree() {
		let clonedList = new PlayerList()
		clonedList.beschenkt = this.beschenkt
		for(let i = 0; i < this.list.length; i++) {
			let player = new Player()
			player.name = this.list[i].name
			player.shown = this.list[i].shown
			player.next = null
			clonedList.list.push(player)
		}

		return clonedList
	}

	hasElements() {
		return this.list.length > 0
	}

	testSelbstbeschenkung(otherList) {
		if(this.list.length !== otherList.list.length) return true
		for(let i = 0; i < this.list.length; i++){
			if(this.list[i].name === otherList.list[i].name) return true
		}
		return false
	}

	hasMoreThanOneElement() {
		return this.list.length > 1
	}

	createPermutedList() { //before: zyklenSchenken
		let permutedList = new PlayerList()
		if(this.hasMoreThanOneElement()) {
			do {
				permutedList = this.createRandomPlayerList()
			} while(this.testSelbstbeschenkung(permutedList))
				return permutedList
		} else return new PlayerList()
	}

	createSchenkung(permutedList) { //before listSchenkung
		if(this.list.length !== permutedList.list.length) {
			alert("Keine Schenkung möglich!")
			return
		}
		if(!this.hasElements()) {
			alert("Keine Personen vorhanden!")
			return
		}

		let output = ""
		for(let i = 0; i < this.list.length; i++) {
			this.list[i].next = permutedList.list[i]
			output += this.list[i].name + " beschenkt " + permutedList.list[i].name + " | "
		}
		this.beschenkt = true
		return output
	}


}
