<script>
export default {
name: 'ModalNext',
data() {
},
props: ['player'],

methods: {
 changeTo() {
  this.$emit('changeTo', this.player)
 }
}
}
</script>

<template>
<div class="modal">
{{ player.name }} beschenkt {{ player.next.name }}
<button type="button" class="btn-green" @click="changeTo(player)">gesehen!</button>
</div>
</template>
