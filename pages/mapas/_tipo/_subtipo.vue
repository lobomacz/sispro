<template>
	<b-container fluid>
		<b-row class="mb-4">
			<h3 class="text-uppercase my-3">
				&#x2637; Mapas para Planes de Inversión
			</h3>
		</b-row>
		<b-row class="mt-4">
			<b-col class="mx-auto text-center" cols="4">
				<b-button size="lg" variant="primary">
					Mapa General
				</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>
export default {
	name: 'MapasPlanes',
	data () {
		return {
			tipo: null,
			subTipo: null,
			baseRouteName: 'mapas-tipo-subtipo',
			opcionesMapas: {
				planes: [
					{ nombre: 'Planes de Inversión', subTipos: {} }
				]
			}
		}
	},
	created () {
		this.tipo = this.$route.params?.tipo ?? null
		this.subTipo = this.$route.params?.subtipo ?? null
	},
	computed: {
		pageTitle () {
			if (this.tipo !== null) {
				if (this.subtipo !== null) {
					return `Mapa de ${this.opcionesMapas[this.tipo].subTipos[this.subTipo].nombre}`
				} else {
					return `Menú de Mapas de ${this.opcionesMapas[this.tipo].nombre}`
				}
			}
		}
	}
	methods: {
		openMapPage (subtipo) {
			const routeConf = { name: this.baseRouteName, params: { tipo: this.menuType } }
			if (subtipo !== null) {
				routeConf.params.subtipo = subtipo
			}
			this.$route.push(routeConf)
		}
	}
}
</script>
