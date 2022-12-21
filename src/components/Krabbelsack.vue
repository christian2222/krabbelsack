<script>
import ModalNext from './ModalNext.vue'
import IconTrash from './icons/IconTrash.vue'
import IconEye from './icons/IconEye.vue'

export default {
	data() {
      return {
       newName: "",
       mode: "INIT",
       playerList: [],
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
          anyPlayerIsShown() {
              return this.playerList.find(el => el.shown === true) !== undefined
          },
	  hasMinimumPlayerCount() {
		return this.playerList.length >= 3
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
                 this.playerList.push({name: "ich", shown: false, seen: false, next: ""})
                 this.playerList.push({name: "du", shown: false, seen: false, next: ""})
                 this.playerList.push({name: "er", shown: false, seen: false, next: ""})
                 this.playerList.push({name: "sie", shown: false, seen: false, next: ""})
                 this.playerList.push({name: "es", shown: false, seen: false, next: ""})
	       },

	       krabbeln() {
               if(!this.hasMinimumPlayerCount) {
                this.inputError = "Nicht genug Personen (mindestens 3)!"
                return
                }
                const playerNames = this.playerList.map(el => el.name)
                for(let i in this.playerList) {
                    let nextPlayerId = Math.floor(Math.random() * playerNames.length)
                    if(playerNames.length > 2) {
                        if(this.playerList[i].name === playerNames[nextPlayerId]) {
                            nextPlayerId += (nextPlayerId < playerNames.length-1) ? 1 : -1
                        }
                    }
                    else if(playerNames.length===2) {
                        let otherNextPlayerId = nextPlayerId === 0 ? 1 : 0
                        if(this.playerList[i].name === playerNames[nextPlayerId] || this.playerList[parseInt(i)+1].name === playerNames[otherNextPlayerId]) {
                             nextPlayerId = otherNextPlayerId
                        }
                    }
                    this.playerList[i].next = playerNames[nextPlayerId]
                    playerNames.splice(nextPlayerId,1)
                }

		       this.mode = "RUN"
	       },

           clearError() {
            this.inputError = ""
            this.$refs.inputName.focus()
           },
	       checkForNameError(name) {
			if(this.playerList.find(el => el.name === name) !== undefined)  {
				this.inputError = "Name bereits vorhanden"
				return true
			}

			this.inputError = ""
			return false

	       },

	       addNameToList(name) {
		       if(name && !this.checkForNameError(name)) {
			       this.playerList.push({name: name, shown: false, seen: false, next: ""})
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
			this.playerList = []
            this.newName = ""
            this.$nextTick(() => { this.clearError() })
		}

       }
}
</script>

<template>
<div v-if="mode === 'INIT'">
	<div class="my-2 flex flex-wrap max-w-full">
	<input type="text" placeholder="neuer Name" v-model.trim="newName" class="border rounded p-1 my-1 max-w-full" @keyup.enter.exact="addNameToList(newName)" ref="inputName" autofocus="true">
	<button @click="addNameToList(newName)" class="my-1 mx-2" :disabled="!newName">Hinzuf&uuml;gen</button>
	</div>
	<div class="rounded border-2 border-red-600 bg-red-300 p-4 w-fit" v-if="inputError">
	Fehler: {{ inputError }} <IconTrash @click="clearError()" class="w-4 h-4 inline"/>
	</div>
	<TransitionGroup name="list" tag="ul" class="list-disc ml-4">
	<li v-for="(player, i) in playerList" :key="player.name" class="my-2">{{ player.name }}<button @click="playerList.splice(i,1)" class="mx-2"><IconTrash class="w-4 h-4"/></button></li>
	</TransitionGroup>
	<div class="mt-10">
	<button @click="krabbeln" :disabled="!hasMinimumPlayerCount">Krabbelsack</button>
	</div>
	<button v-if="isDebugMode" @click="addDummies()" class="mt-4">Debug: Dummies</button>
</div>
<div v-if="mode === 'RUN'">
	<div class="my-2">
	<h2 class="text-2xl">Ergebnis:</h2>
	</div>
	<ul class="list-disc ml-4">
	<li v-for="(player,i) in playerList" :key="i" class="my-2">
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
	<div v-if="showDebug">{{playerList.map(el => el.name + ' => ' + el.next).join(", ") }}</div>
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
