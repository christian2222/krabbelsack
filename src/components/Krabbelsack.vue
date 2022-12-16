<script>
import Player from './Player.jsx'
import PlayerList from './PlayerList.jsx'
import ModalNext from './ModalNext.vue'

export default {
	data() {
		return {
names: [],
       newName: "",
       result: "INIT",
       nextOne: "<Nobody>",
       showNextOne: false,
       playerList: new PlayerList(),
       showDebug: false
		}
	},
components: {
  ModalNext
},

computed: {
		  hasNames() {
			  return this.playerList.hasElements()
		  },
          anyPlayerIsShown() {
              return this.playerList.list.find(el => el.shown === true) !== undefined
          }
	  },

props: ['msg'],

       methods: {

	       addDummies() {
                 this.playerList.addName("ich")
	//	 this.playerList.setReadByName("ich",true)
                 this.playerList.addName("du")
                 this.playerList.addName("er")
                 this.playerList.addName("sie")
	//	 this.playerList.setReadByName("sie",true)
                 this.playerList.addName("es")
	       },

	       krabbeln() {
		       if(this.playerList.hasElements()) {
				       this.result = this.playerList.createSchenkung(this.playerList.createPermutedList())
		       } else {
			       this.result = "Keine Namen eingegeben!"
		       }
		       this.showNextOne = true
	       },

	       getNextName(name) {
		       let j = 0
		       let newOne = "<Nobody>"
		       let player = this.playerList.getPlayerByName(name)
		       if( (player != null) && (player.next != null) ) newOne = player.next.name
		       alert(newOne)
		       player.shown = true
	       },


	       addNameToList(addName) {
		       if(addName === "") {
			       alert("Keine leerren Namen bitte!")
				       return
		       }
		       if(!this.playerList.containsName(addName)) {
			       this.playerList.addName(addName)
				       this.newName = ""
		       } else {
			       alert(addName+" ist bereits vorhanden!")
		       }
	       },

		modalCallback(player) {
			player.shown = false
			player.seen = true
		},

		resetPlayer(currentPlayer) {
			currentPlayer.shown = false
			currentPlayer.seen = false
			currentPlayer.next = null
		},

		backToStart() {
			this.playerList.list.forEach(this.resetPlayer)
			this.showNextOne = false
		}

       }
}
</script>

<template>
<div v-if="!showNextOne">
<ul>
<li v-for="(player,i) in this.playerList.list" :key="i" class="my-2">{{ player.name }}<button @click="this.playerList.removeIthElement(i)" class="mx-2">l&ouml;schen</button></li>
</ul>
<!-- <div v-for="(item,i) in names" :key="i">
<input type="text" placeholder="neuer Name" v-model="names[i]">
<button @click="deleteName(i)">Name l&ouml;schen</button><br>
</div>
-->
<div class="my-2">
<span><input type="text" placeholder="neuer Name" v-model="newName" class="border rounded p-1"></span>
<span><button @click="addNameToList(newName)" class="mx-2">Hinzuf&uuml;gen</button></span>
</div>
<div>
<button @click="krabbeln">Krabbelsack</button>
</div>
<button @click="addDummies()" class="mt-4">Debug: Dummies</button>
</div>
<div v-if="showNextOne">
<ul>
<li v-for="(player,i) in this.playerList.list" :key="i" class="my-2">
<span :class="{'bg-red-300': player.seen}">{{ player.name }}</span> <button @click="player.shown=true" :disabled="player.seen === true || anyPlayerIsShown">anschauen</button>
<ModalNext v-show="player.shown" @changeTo="modalCallback" :player="player" />
</li>
</ul>
<button @click="backToStart()">Zur&uuml;ck</button>
<div class="mt-4">
<button @click="showDebug=!showDebug">Debug: Result</button>
<div v-if="showDebug">{{result}}</div>
</div>
</div>
</template>
