<script>
export default {
name: 'ModalNext',
data() {
return {
 theCheckboxValue: this.player.shown
}
},
props: ['player'],

methods: {
 changeTo() {
  this.$emit('changeTo', this.player, this.theCheckboxValue)
 }
}
}
</script>

<template>
<div class="modal">
{{ player.name }} beschenkt {{ player.next.name }}<br>
<input type="checkbox" v-model="theCheckboxValue" checked="player.shown" name="box"><label for="box">gesehen</label><br>
<button type="button" class="btn-green" @click="changeTo(player, theCheckboxValue)">Beenden</button>
</div>
</template>
