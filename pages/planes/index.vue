<template>
	<b-container fluid>
		<h3 class="text-uppercase my-3">
			&#x2632; Planes de Inversión
		</h3>
		<Searchbar placeholder="Buscar" buscar-por="nombre del plan o nombre del protagonista" @search="buscaDatos" @resetSearch="buscaDatos" />
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
				{ key: 'bono', label: 'Plan' },
				{ key: 'protagonista', label: 'Protagonista', sortable: true },
				{ key: 'fecha_recibido', label: 'Fecha de Entrega' }
			],
			selectMode: 'single'
		}
	},
	async fetch () {
		const planesProtagonistas = await this.$axios.$get('planes-protagonista/lista/')
		this.items = planesProtagonistas
	},
	fetchOnServer: false,
	methods: {
		verDetalle (row) {
			const id = row[0].id
			this.$router.push({ name: 'planes-id', params: { id } })
		},
		async buscaDatos (termino = null) {
			let url = ''
			if (termino === null) {
				url = 'planes-protagonista/lista/'
			} else {
				url = `planes-protagonista/lista/?buscar=${termino.trim()}`
			}
			const planesProtagonistas = await this.$axios.$get(url)
			this.items = planesProtagonistas
		}
	}
}
</script>
