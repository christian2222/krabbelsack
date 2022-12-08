<script>
import Player from './Player.js'
import PlayerList from './PlayerList.js'

export default {
	data() {
		return {
names: [],
       newName: "",
       result: "INIT",
       //krabbelNames: [],
       //nextOne: "<Nobody>",
       showNextOne: false,
       playerList: PlayerList,
       currentPlayer: Player
		}
	},

computed: {
		  hasNames() {
			  return this.playerList.hasElements()
		  }
	  },

props: ['msg'],

       methods: {

	       deleteName(num) {
		       this.playerList.removeIthElement(num)
	       },

	       krabbeln() {
		       if(this.playerList.hasElements()) {
				       this.playerList.createSchenkung(this.playerList.createPermutedList())
		       } else {
			       this.result = "Keine Namen eingegeben!"
		       }
		       this.showNextOne = true
	       },

	       getNextName(name) {
		       let j = 0;
		       let newOne = "<Nobody>"
		       Player player = this.playlerList.getPlayerByName(name)
		       if( (player != null) && (player.next != null) ) nowOne = player.next.name
		       alert(newOne)
	       },

	       removeIthElement(i) {
		       this.playerList.removeIthElement(i)
	       },

	       addNameToList(name) {
		       if(name === "") {
			       alert("Keine leerren Namen bitte!")
				       return
		       }
		       if(!this.playerList.contains(name)) {
			       this.playerList.adddName(name)
				       this.newName = ""
		       } else {
			       alert(name+" ist bereits vorhanden!")
		       }
	       },

	       contains(name) {
		       return this.playerList.containsName(name)
	       }
       }
}
</script>

<template>
<div v-if="!showNextOne">
<ul>
<li v-for="(item,i) in names" :key="i">{{ item }}<button @click="removeIthElement(i)">l&ouml;schen</button></li>
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
