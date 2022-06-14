<template>
	<b-container fluid>
		<h3 class="text-uppercase my-3">
			&#x2635; Bonos
		</h3>
		<Searchbar placeholder="Nombre Bono" @search="buscar" />
		<b-table
		striped
		hover
		selectable
		:items="items"
		:fields="fields"
		:select-mode="selectMode"
		@row-selected="verDetalle"
		/>
	</b-container>
</template>
<script>
export default {
	data () {
		return {
			appName: process.env.appName,
			items: [],
			fields: [
				{ key: 'bono', label: 'Bono Productivo' },
				{ key: 'protagonista', label: 'Protagonista', sortable: true },
				{ key: 'fecha_recibido', label: 'Fecha de Entrega' }
			],
			selectMode: 'single'
		}
	},
	async fetch () {
		const bonosProtagonistas = await this.$axios.$get('bonos-protagonista/lista/')
		this.items = bonosProtagonistas
	},
	fetchOnServer: false,
	methods: {
		verDetalle (row) {
			const id = row[0].id
			this.$router.push({ name: 'bonos-id', params: { id } })
		},
		async buscar (termino) {
			const bonos = await this.$axios.$get('bonos-protagonista/?nombre=' + termino.trim())
			this.items = bonos
		}
	}
}
</script>
