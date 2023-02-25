<template>
	<b-container fluid>
		<b-row class="mt-4">
			<h3 class="text-uppercase my-3">
				&#x2637; {{ pageTitle }}
			</h3>
		</b-row>
		<b-row v-if="tipo !== null && subtipo === null" class="mt-4">
			<b-col class="mx-auto text-center" cols="4">
				<b-link v-for="(subt, idx) of opcionesMapas[tipo].subTipos" :key="idx" :to="subt.ruta" class="btn btn-primary btn-lg text-uppercase">
					{{ subt.nombre }}
				</b-link>
			</b-col>
		</b-row>
		<b-row v-if="subtipo !== null" class="my-4">
			<b-col cols="8" class="mx-auto">
				<div v-if="listaComunidades !== null" id="map-wrapper" style="height: 40rem;">
					<client-only>
						<l-map ref="mapa" :zoom="mapZoom" :center="mapCenter" @update:bounds="loadMarkers">
							<l-tile-layer :url="mapTile" :attribution="attribution" />
							<l-marker v-for="(feature, index) of listaComunidades.features" :key="index" :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]">
								<l-popup>
									<h5 class="text-uppercase">
										{{ feature.properties.nombre }}
									</h5>
									<ul>
										<li>
											{{ feature.properties.protagonista__count }} protagonistas <b-icon icon="people-fill" />
										</li>
										<li>
											{{ feature.properties.bonos.length }} planes de inv. <b-icon icon="file-spreadsheet" />
										</li>
									</ul>
								</l-popup>
							</l-marker>
						</l-map>
					</client-only>
				</div>
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
			subtipo: null,
			baseRouteName: 'mapas-tipo-subtipo',
			mapZoom: process.env.basemapMunZoom,
			mapTile: process.env.basemapUrl,
			mapCenter: process.env.basemapMunCenter,
			attribution: process.env.basemapAttribution,
			opcionesMapas: {
				planes: {
					nombre: 'Planes de Inversión',
					subTipos: {
						planes_comunidad: { ruta: '/mapas/planes/planes_comunidad', nombre: 'Planes Por Comunidad' }
					}
				}
			},
			listaComunidades: null
		}
	},
	async fetch () {
		const markersUrl = 'mapa-comunidad/'
		const res = await this.$axios.get(markersUrl)
		this.listaComunidades = res.data
	},
	computed: {
		pageTitle () {
			if (this.tipo !== null) {
				if (this.subtipo !== null) {
					return `Mapa de ${this.opcionesMapas[this.tipo].subTipos[this.subtipo].nombre}`
				} else {
					return `Menú de Mapas de ${this.opcionesMapas[this.tipo].nombre}`
				}
			} else {
				return ''
			}
		}
	},
	created () {
		if (this.$route.params?.tipo !== undefined) {
			this.tipo = this.$route.params?.tipo
		}
		if (this.$route.params?.subtipo !== undefined) {
			this.subtipo = this.$route.params?.subtipo
		}
	},
	methods: {
		openMapPage (subtipo) {
			const routeConf = { name: this.baseRouteName, params: { tipo: this.menuType } }
			if (subtipo !== null) {
				routeConf.params.subtipo = subtipo
			}
			this.$route.push(routeConf)
		},
		async loadMarkers () {
			const bBox = this.$refs.mapa.mapObject.getBounds().toBBoxString()
			const markersUrl = `mapa-comunidad/?in_bbox=${bBox}`
			const res = await this.$axios.get(markersUrl)
			this.listaComunidades = res.data
		}
	}
}
</script>
