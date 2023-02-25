<template>
	<b-container fluid>
		<h3 class="text-uppercase my-3">
			&#x2635; Bonos
		</h3>
		<Searchbar placeholder="Buscar" buscar-por="nombre del bono o nombre del protagonista" @search="buscaDatos" @resetSearch="buscaDatos" />
		<b-table
		striped
		hover
		selectable
		:items="items"
		:fields="fields"
		:select-mode="selectMode"
		@row-selected="verDetalle"
		/>
		<b-alert
		variant="warning"
		show="!items.length > 0"
		>
			Sin datos para mostrar
		</b-alert>
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
		async buscaDatos (termino = null) {
			let url = ''
			if (termino === null) {
				url = 'bonos-protagonista/lista/'
			} else {
				url = `bonos-protagonista/lista/?buscar=${termino.trim()}`
			}
			const bonos = await this.$axios.$get(url)
			this.items = bonos
		}
	}
}
</script>
