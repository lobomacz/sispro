<template>
	<div class="d-flex flex-row-reverse mb-4">
		<div class="col-1">
			<b-button @click="buscar">
				<b-icon icon="search" />
			</b-button>
		</div>
		<div class="col-5">
			<b-input-group>
				<b-input v-model.trim="termino" :placeholder="placeholder" autocomplete="off" @keyup.enter="buscar" />
				<b-input-group-append>
					<b-button v-if="termino.length > 0" variant="outline-secondary" @click="resetear">
						<b-icon icon="x-lg" />
					</b-button>
				</b-input-group-append>
			</b-input-group>
			<div v-if="buscarPor !== null" class="fs-6 font-italic">
				Buscar por: <span class="font-weight-bold">{{ buscarPor }}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: { placeholder: { type: String, default: null }, buscarPor: { type: String, default: null } },
	emits: ['search', 'resetSearch'],
	data () {
		return {
			termino: ''
		}
	},
	methods: {
		buscar () {
			if (this.termino !== '') {
				this.$emit('search', this.termino.trim())
			}
		},
		resetear () {
			this.termino = ''
			this.$emit('resetSearch')
		}
	}
}
</script>
<style scoped>
.fs-6 {
  font-size: 0.8rem;
}
</style>
