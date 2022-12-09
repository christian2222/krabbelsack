<script>
export default {
name: 'ModalNext',
data() {
return {
 theCheckboxValue: this.playerShown
}
},
props: ['playerName','playerShown','nextPlayerName'],

methods: {
 changeTo() {
  this.$emit('changeTo', this.playerName, this.theCheckboxValue)
 }
}
}
</script>

<template>
<div class="modal">
{{ playerName }} beschenkt {{ nextPlayerName }}<br>
<input type="checkbox" v-model="theCheckboxValue" checked="playerShown" name="box"><label for="box">gesehen</label><br>
<button type="button" class="btn-green" @click="changeTo(playeName, theCheckboxValue)">Beenden</button>
</div>
</template>
