<template>
	<b-container fluid>
		<h1 class="text-uppercase my-3">
			&#x2632; Protagonistas
		</h1>
		<Searchbar placeholder="Buscar" buscar-por="cédula, nombres o apellidos" @search="buscaDatos" @resetSearch="buscaDatos" />
		<b-table
		striped
		hover
		selectable
		:items="lista"
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
			fields: [{ key: 'cedula', sortable: true }, { key: 'nombres', sortable: true }, { key: 'apellidos', sortable: true }],
			lista: [],
			selectMode: 'single'
		}
	},
	async fetch () {
		const lista = await this.$axios.$get('protagonistas/')
		this.lista = lista.results
	},
	fetchOnServer: false,
	methods: {
		verDetalle (row) {
			const rowId = row[0].cedula
			this.$router.push({ name: 'protagonistas-ced', params: { ced: rowId } })
		},
		async buscaDatos (termino = null) {
			let url = ''
			if (termino === null) {
				url = 'protagonistas/'
			} else {
				url = `protagonistas/?search=${termino.trim()}`
			}
			const lista = await this.$axios.$get(url)
			this.lista = lista.results
		}
	}
}
</script>
