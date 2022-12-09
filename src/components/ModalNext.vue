<script>
export default {
name: 'ModalNext',
methods: {
    close() {
	this.$emit('close')
    }
},
props: ['showName','isChecked']
}
</script>

<template>
<div class="modal" role="dialog">
{{ showName }}<br>
<input type="checkbox" checked="isChecked" name="box"><label for="box">gesehen</label><br>
<button type="button" class="btn-green" @click="close">Beenden</button>
</div>
</template>
