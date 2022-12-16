<script>
export default {
name: 'ModalNext',
data() {
return {}
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
<span>
{{ player.name }} beschenkt {{ player.next.name }}
<button @click="changeTo(player)">gesehen!</button>
</span>
</template>
