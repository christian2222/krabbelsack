<script>
import IconCheck from './icons/IconCheck.vue'

export default {
name: 'ModalNext',
data() {
return {}
},
components: {
  IconCheck
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
<div>
{{ player.name }} beschenkt <strong>{{ player.next }}</strong>
<button @click="changeTo(player)" class="mx-2"><IconCheck class="w-4 h-4"/></button>
</div>
</template>
