<template>
	<div class="container">
		<div class="row">
			<div class="col-8 mx-auto">
				<h1 class="text-uppercase my-3">&#x2637; Programas</h1>
				<b-table
				striped
				hover
				:items="programas"
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
			fields: ['codigo', 'acronimo', 'nombre'],
			programas: []
		}
	},
	async fetch () {
		const programas = await this.$axios.$get('programas')
		this.programas = programas.results
	},
	fetchOnServer: false,
	methods: {
		verDetalle (row) {
			const id = row[0].id
			this.$router.push({ name: 'programas-id', params: { id } })
		}
	}
}
</script>
