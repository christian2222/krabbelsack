<script>
export default {
name: 'ModalNext',
props: ['player'],

methods: {
 close() {
  this.$emit('close')
 }
}
}
</script>

<template>
<div class="modal">
{{ player.name }}<br>
<input type="checkbox" v-model="player.shown" name="box"><label for="box">gesehen</label><br>
<!-- <button type="button" class="btn-green" @click="this.$emit(showName, isChecked)">Beenden</button> -->
<button type="button" class="btn-green" @click="close">Beenden</button>
</div>
</template>
