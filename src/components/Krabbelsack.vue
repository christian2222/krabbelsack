<script>
import Player from './Player.jsx'
import PlayerList from './PlayerList.jsx'

export default {
	data() {
		return {
names: [],
       newName: "",
       result: "INIT",
       //krabbelNames: [],
       //nextOne: "<Nobody>",
       showNextOne: false,
       playerList: PlayerList
       //currentPlayer: Player
		}
	},

computed: {
		  hasNames() {
			  return this.playerList.hasElements()
		  }
	  },

props: ['msg'],

       methods: {

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
		       let player = this.playlerList.getPlayerByName(name)
		       if( (player != null) && (player.next != null) ) nowOne = player.next.name
		       alert(newOne)
	       },


	       addNameToList(addName) {
		       if(addName === "") {
			       alert("Keine leerren Namen bitte!")
				       return
		       }
		       if(!this.playerList.containsName(addName)) {
			       this.playerList.adddName(addName)
				       this.newName = ""
		       } else {
			       alert(addName+" ist bereits vorhanden!")
		       }
	       },

       }
}
</script>

<template>
<div v-if="!showNextOne">
<ul>
<li v-for="(player,i) in this.playerList" :key="i">{{ player.name }}<button @click="this.playerList.removeIthElement(i)">l&ouml;schen</button></li>
</ul>
<!-- <div v-for="(item,i) in names" :key="i">
<input type="text" placeholder="neuer Name" v-model="names[i]">
<button @click="deleteName(i)">Name l&ouml;schen</button><br>
</div>
-->
<span><input type="text" placeholder="neuer Name" v-model="newName"></span>
<span><button @click="addNameToList(newName)">Hinzuf&uuml;gen</button></span>
<hr>
<div>
<button @click="krabbeln">Krabbelsack</button><br>
</div>
</div>
<div v-if="showNextOne">
{{ result }}<br>
Naechter Eintrag: <input type="text" v-model="nextOne"><button @click="getNextName(nextOne)">Nachfolger</button><br>
<hr>
<button @click="showNextOne = false">Zur&uuml;ck</button>
</div>
</template>

<style scoped>
</style>
