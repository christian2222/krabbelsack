import Player from './Player.js'

export default class PlayerList {
	list : []

	addName(playerName) {
		if(!this.containsName(playerName)) {
			list.push(new Player(playerName))
			return true
		} else return false
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

	containsName(playerName) {
		let contained = false
		for(let i = 0; i < this.list.length; i++) {
			if(list[i].name == playerName) contained = true
		}

		return contained
	}

	hasBeenReadByName(playerName) {
	}

	setReadByName(playerName, readBoolean) {
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

	zyklenSchenken() {
		let permutedList = new PlayerList()
		if(this.hasElements()) {
			do {
				permutedList = this.createRandomPlayerList()
			} while(this.testSelbstbeschenkung(permutedList)
				return permutedList
		} else return new PlaerList()
	}
}
