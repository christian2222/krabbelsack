<script>
import Player from './Player.jsx'
import PlayerList from './PlayerList.jsx'
import ModalNext from './ModalNext.vue'
import IconTrash from './icons/IconTrash.vue'
import IconEye from './icons/IconEye.vue'

export default {
	data() {
		return {
names: [],
       newName: "",
       result: "INIT",
       nextOne: "<Nobody>",
       mode: "INIT",
       showNextOne: false,
       playerList: new PlayerList(),
       showDebug: false,
       inputError: "",
       currentHash: window.location.hash
		}
	},
components: {
  ModalNext,
  IconTrash,
  IconEye
},

computed: {
		  hasNames() {
			  return this.playerList.hasElements()
		  },
          anyPlayerIsShown() {
              return this.playerList.list.find(el => el.shown === true) !== undefined
          },
	  lessOrEqualTwo() {
		return this.playerList.list.length <= 2
	  },
      isDebugMode() {
        return this.currentHash === "#debug"
      }
	  },

mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentHash = window.location.hash
		})
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
		       this.mode = "RUN"
	       },

	       getNextName(name) {
		       let j = 0
		       let newOne = "<Nobody>"
		       let player = this.playerList.getPlayerByName(name)
		       if( (player != null) && (player.next != null) ) newOne = player.next.name
		       //alert(newOne)
		       player.shown = true
	       },

           clearError() {
            this.inputError = ""
            this.$refs.inputName.focus()
           },
	       checkForNameError(addName) {
			if(this.playerList.containsName(addName)) {
				this.inputError = "Name bereits vorhanden"
				return true
			}

			this.inputError = ""
			return false

	       },

	       addNameToList(addName) {
		       if(addName && !this.checkForNameError(addName)) {
			       this.playerList.addName(addName)
				       this.newName = ""
		       } 

		       this.$refs.inputName.focus()
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

		askForConfirm() {
			this.mode = "CONFIRM"
		},

		backToStart() {
			//this.playerList.list.forEach(this.resetPlayer)
			this.mode = "INIT"
			this.playerList = new PlayerList()
            this.newName = ""
            this.$nextTick(() => { this.clearError() })
		}

       }
}
</script>

<template>
<div v-if="mode === 'INIT'">
	<div class="my-2 flex flex-wrap max-w-full">
	<input type="text" placeholder="neuer Name" v-model="newName" class="border rounded p-1 my-1 max-w-full" @keyup.enter.exact="addNameToList(newName)" ref="inputName" autofocus="true">
	<button @click="addNameToList(newName)" class="my-1 mx-2" :disabled="!newName">Hinzuf&uuml;gen</button>
	</div>
	<div class="rounded border-2 border-red-600 bg-red-300 p-4 w-fit" v-if="inputError">
	Fehler: {{ inputError }} <IconTrash @click="clearError()" class="w-4 h-4 inline"/>
	</div>
	<TransitionGroup name="list" tag="ul" class="list-disc ml-4">
	<li v-for="(player, i) in this.playerList.list" :key="player.name" class="my-2">{{ player.name }}<button @click="this.playerList.removeIthElement(i)" class="mx-2"><IconTrash class="w-4 h-4"/></button></li>
	</TransitionGroup>
	<div class="mt-10">
	<button @click="krabbeln" :disabled="lessOrEqualTwo">Krabbelsack</button>
	</div>
	<button v-if="isDebugMode" @click="addDummies()" class="mt-4">Debug: Dummies</button>
</div>
<div v-if="mode === 'RUN'">
	<div class="my-2">
	<h2 class="text-2xl">Ergebnis:</h2>
	</div>
	<ul class="list-disc ml-4">
	<li v-for="(player,i) in this.playerList.list" :key="i" class="my-2">
	<div class="flex flex-row flex-wrap">
	<div><span :class="[{'line-through': player.seen}, {'text-gray-400': player.seen}]">{{ player.name }}</span><button class="mx-2" @click="player.shown=true" :disabled="player.seen === true || anyPlayerIsShown"><IconEye class="w-4 h-4"/></button></div>
	<Transition>
	<ModalNext v-show="player.shown" @changeTo="modalCallback" :player="player" />
	</Transition>
	</div>
	</li>
	</ul>
	<div class="mt-10">
	<button @click="askForConfirm()">Zur&uuml;ck</button>
	<div class="mt-4" v-if="isDebugMode">
	<button @click="showDebug=!showDebug">Debug: Result</button>
	<Transition>
	<div v-if="showDebug">{{result}}</div>
	</Transition>
	</div>
	</div>
</div>
<div v-if="mode === 'CONFIRM'" class="text-center">
	<h2 class="text-2xl">Wirklich zur&uuml;ck?</h2>
	Hierdurch wird die gesamte Liste gel&ouml;scht!<br>
	<div class="mt-4 flex justify-center gap-3">
	<button @click="backToStart()" >Ja</button>
	<button @click="mode = 'RUN'">Nein</button>
	</div>
</div>
</template>
<style>
.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition-all duration-500;
}

.list-enter-from,
.list-leave-to {
  @apply opacity-0 translate-x-12;
}
.list-leave-active {
  @apply absolute;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
