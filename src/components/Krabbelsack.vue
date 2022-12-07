<script>
export default {
	data() {
		return {
names: [],
       newName: "",
       result: "INIT",
       krabbelNames: [],
       nextOne: "<Nobody>",
       showNextOne: false
		}
	},

computed: {
		  hasNames() {
			  return this.names.length > 0
		  }
	  },

props: ['msg'],

       methods: {

	       deleteName(num) {
		       this.names.splice(num,1)
	       },

	       permArray(passedArray) {
		       if(passedArray.length > 0) {
			       let copiedArray = passedArray.slice()
				       let newArray = []
				       while(myArray.length > 0) {
					       let idx = Math.floor(Math.random()*copiedArray.length)
						       newArray.push(copiedArray[idx])
						       copiedArray.splice(idx,1)
				       }
			       return newArray
		       } else {
			       return passedArray
		       }
	       },

	       testSelbstschenkung(arrayOne, arrayTwo) {
		       if(arrayOne.length !== arrayTwo.length) return true
			       for(let i = 0; i < arrayOne.length; i++) {
				       if(arrayOne[i] === arrayTwo[i]) return true
			       }
		       return false
	       },

	       zyklenSchenken() {
		       let permutedArray = []
			       if(this.hasNames) {
				       do {
					       permutedArray = this.permArray(this.names)
				       } while(this.testSelbstschenkung(this.names, permutedArray))

				       this.result = this.listSchenkung(this.names, permutedArray)
					       return permutedArray
			       } else return []
	       },

	       listSchenkung(arrayOne, arrayTwo) {
		       if(arrayOne.length !== arrayTwo.length) { 
			       alert("Schenkung nicht möglich")
				       return
		       }
		       let output = ""
			       for(let j = 0; j < arrayOne.length; j++) {
				       output += arrayOne[j]+" beschenkt "+arrayTwo[j]+" | "
			       }
		       return output
	       },

	       krabbeln() {
		       if(this.hasNames) {
				       this.krabbelNames = this.zyklenSchenken()
		       } else {
			       this.result = "Keine Namen eingegeben!"
		       }
		       this.showNextOne = true
	       },

	       getNextName(name) {
		       let j = 0;
		       let newOne = "<Nobody>"
			       for(let i = 0; i < this.krabbelNames.length; i++) {
				       if(this.krabbelNames[i] === name) {
					       j = (i+1) % this.krabbelNames.length
						       newOne = this.krabbelNames[j]
				       }
			       }
		       alert(newOne)
	       },

	       removeIthElement(i) {
		       this.names.splice(i,1)
	       },

	       addNameToList(name) {
		       if(name === "") {
			       alert("Keine leerren Namen bitte!")
				       return
		       }
		       if(!this.contains(name)) {
			       this.names.push(name)
				       this.newName = ""
		       } else {
			       alert(name+" ist bereits vorhanden!")
		       }
	       },

	       contains(name) {
		       let contains = false;
		       for(let i = 0; i < this.names.length; i++) {
			       if(this.names[i] == name) return true
		       }
		       return false
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
