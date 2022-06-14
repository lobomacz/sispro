<template>
	<div class="d-flex flex-row-reverse">
		<div class="col-1">
			<b-button @click="buscar">
				<b-icon icon="search" />
			</b-button>
		</div>
		<div class="col-5">
			<b-input v-model.trim="termino" :placeholder="placeholder" />
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			termino: ''
		}
	},
	props: ['placeholder'],
	methods: {
		buscar () {
			if (this.termino != '') {
				this.$emit('search', this.termino)
			}
		}
	}
}
</script>