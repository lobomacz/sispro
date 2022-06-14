<template>
	<div class="container">
		<div class="row">
			<div class="col-8 mx-auto">
				<h1 class="text-uppercase my-3">&#x2632; Proyectos</h1>
				<b-table
				striped
				hover
				:items="proyectos"
				:fields="fields"
				/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		return {
			appName: process.env.appName,
			proyectos: [],
			fields: ['codigo', 'acronimo', 'nombre', 'sector']
		}
	},
	async fetch () {
		const proyectos = await this.$axios.$get('proyectos')
		this.proyectos = proyectos.results
	},
	fetchOnServer: false,
	methods: {
		verDetalle (row) {
			const id = row[0].id
			this.$router.push({ name: 'proyectos-id', params: { id } })
		}
	}
}
</script>
