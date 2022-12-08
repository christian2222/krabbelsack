import Player from './Player.js'

export default class PlayerList {
	list : [],
	beschenkt: false

	addName(playerName) {
		if(!this.containsName(playerName)) {
			list.push(new Player(playerName))
			return true
		} else return false
	}

	getPlayerByName(name) {
		Player player = null
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i].name == name) return this.list[i]
		}
		return player
	}

	removeName(playerName) {
		let removeIdx = null
		for(let i = 0; i < list.length; i++) {
			if(list[i].name == playerName) {
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
			if(list[i].name == playerName) contained = true
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
			if(this.list[i].name == playerName) list[i].shown = readBoolean
		}

	}

	createRandomPlayerList() {
		if(this.hasElements()) {
			
			let copyList = this.slice()
			let newList = new PlayerList()
			while(copyList.hasElements()) {
				let randomIdx = Math.floor(Math.random()*copyList.length)
				let randomPlayerName = copiedList.list[randomIdx].name
				newList.addName(randomPlayerName)
				copiedList.removeName(randomPlayerName)
			}
			return newList

		} else return new PlayerList()
	}

	hasElements() {
		return this.list.length > 0
	}

	testSelbstbeschenkung(PlayerList otherList) {
		if(this.list.length !== otherList.list.length) return true
		for(let i = 0; i < this.list.length; i++){
			if(this.list[i].name === otherList[i].name) return true
		}
		return false
	}

	createPermutedList() { //before: zyklenSchenken
		let permutedList = new PlayerList()
		if(this.hasElements()) {
			do {
				permutedList = this.createRandomPlayerList()
			} while(this.testSelbstbeschenkung(permutedList)
				return permutedList
		} else return new PlaerList()
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
		for(let i = 0; i < this.list.length) {
			this.list[i].next = permutedList.list[i]
			output += this.list[i] + " beschenkt " + permutedList.list[i] + " | "
		}
		this.beschenkt = true
		return output
	}


}
