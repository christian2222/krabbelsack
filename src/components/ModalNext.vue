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
<span>
{{ player.name }} beschenkt <strong>{{ player.next.name }}</strong>
<button @click="changeTo(player)" class="mx-2"><IconCheck class="w-4 h-4"/></button>
</span>
</template>
