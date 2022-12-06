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
props: ['msg'],
methods: {
 addInput() {
  this.names.push("")
 },
 deleteName(num) {
  this.names.splice(num,1)
 },
 krabbeln() {
  if(this.names.length > 0) {
  let myArray = this.names.slice()
  let newArray = []
  //console.log(myArray)
  //console.log(myArray.length)
  while(myArray.length > 0) {
   let idx = Math.floor(Math.random()*myArray.length)
   newArray.push(myArray[idx])
   myArray.splice(idx,1)
  }
  //console.log(newArray)
  let strReturn = ""
  for(let i = 0; i < newArray.length; i++) {
   strReturn += newArray[i]+"->"
   //console.log(strReturn)
  }
  strReturn += newArray[0]
  this.result = strReturn
  this.krabbelNames = newArray.slice()
  this.showNextOne = true
  } else {
  this.result = "Keine Namen eingegeben!"
  this.showNextOne = true
  }

},
 getNext(name) {
  let j = 0;
  let newOne = "<Nobody>"
  for(let i = 0; i < this.krabbelNames.length; i++) {
   if(this.krabbelNames[i] === name) {
    j = (i+1) % this.krabbelNames.length
    newOne = this.krabbelNames[j]
   }
  }
  // this.nextOne = newOne
  alert(newOne)
 },
 remove(i) {
  this.names.splice(i,1)
 },
 addName(name) {
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
<li v-for="(item,i) in names" :key="i">{{ item }}<button @click="remove(i)">l&ouml;schen</button></li>
</ul>
<!-- <div v-for="(item,i) in names" :key="i">
 <input type="text" placeholder="neuer Name" v-model="names[i]">
 <button @click="deleteName(i)">Name l&ouml;schen</button><br>
</div>
-->
<input type="text" placeholder="neuer Name" v-model="newName">&nbsp;&nbsp;
<button @click="addName(newName)">Hinzuf&uuml;gen</button>
<hr>
<div>
<button @click="krabbeln">Krabbelsack</button><br>
</div>
</div>
<div v-if="showNextOne">
<!-- {{ result }} --><br>
Naechter Eintrag: <input type="text" v-model="nextOne"><button @click="getNext(nextOne)">Nachfolger</button><br>
<hr>
<button @click="showNextOne = false">Zur&uuml;ck</button>
</div>
</template>

<style scoped>
</style>
