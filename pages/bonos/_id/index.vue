<template>
	<b-overlay :show="showOverlay">
		<b-container fluid>
			<b-toast
			id="delete-success"
			variant="success"
			auto-hide-delay="2000"
			@hidden="goBack"
			>
				¡Registro eliminado!
			</b-toast>
			<b-modal
			id="delete-modal"
			:header-bg-variant="warningVariant"
			:header-text-variant="dangerVariant"
			@ok="deleteBono"
			>
				<b-container fluid>
					<b-row>
						<b-col>
							<p class="lead h6">
								Se eliminará el registro de la base de datos.
							</p>
							<p class="h5">
								¿Desea Continuar?
							</p>
						</b-col>
						<b-col cols="2">
							<p class="h1">
								<b-icon icon="exclamation-triangle-fill" variant="danger" />
							</p>
						</b-col>
					</b-row>
				</b-container>
				<template #modal-footer="{ ok, cancel }">
					<b-button variant="primary" @click="cancel()">
						Cancelar
					</b-button>
					<b-button variant="danger" @click="ok()">
						OK
					</b-button>
				</template>
			</b-modal>
			<b-alert
			variant="warning"
			show="bonoProtagonista === null"
			>
				Sin datos para mostrar
			</b-alert>
			<b-row>
				<b-col class="mx-auto" cols="8">
					<h2 class="text-uppercase mt-3">
						Detalle de Protagonista de Bono Productivo
					</h2>
					<b-card
					v-if="bonoProtagonista != null"
					class="mt-3"
					:title="nombreCompleto"
					:sub-title="bonoProtagonista.bono.nombre"
					>
						<b-card-text>
							El {{ bonoProtagonista.bono.tipo }} fue entregado el día {{ fechaEntregado }} en la comunidad de <span class="text-capitalize">{{ bonoProtagonista.comunidad.nombre }}</span>
							del municipio de <span class="text-capitalize">{{ bonoProtagonista.comunidad.municipio }}</span>.
						</b-card-text>
						<b-card-text
						v-if="bonoProtagonista.tecnico != null"
						>
							Técnico que realizó la entrega: <span class="text-capitalize">{{ tecnicoNombreCompleto }}</span>
						</b-card-text>
						<b-button
						v-b-tooltip.hover
						title="Editar"
						variant="primary"
						:disabled="!permissions.change_protagonistabono"
						@click="goEdit"
						>
							<b-icon icon="pencil" />
						</b-button>
						<b-button
						v-b-tooltip.hover
						title="Eliminar"
						variant="danger"
						:disabled="!permissions.delete_protagonistabono"
						@click="deleteModal"
						>
							<b-icon icon="trash" />
						</b-button>
						<hr v-if="marker !== null">
						<div v-if="marker !== null" id="map-wrap" style="height: 30rem;">
							<client-only>
								<l-map ref="mMapa" :zoom="mapZoom" :center="latlng">
									<l-tile-layer :url="mapTile" :attribution="attribution"></l-tile-layer>
									<l-marker :lat-lng="latlng"></l-marker>
								</l-map>
							</client-only>
						</div>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
	</b-overlay>
</template>
<script>
export default {
	data () {
		return {
			id: this.$route.params.id,
			bonoProtagonista: null,
			showOverlay: true,
			warningVariant: 'warning',
			dangerVariant: 'danger',
			mapZoom: process.env.basemapZoom,
			mapTile: process.env.basemapUrl,
			attribution: process.env.basemapAttribution,
			marker: null,
			permissions: {
				change_protagonistabono: false,
				delete_protagonistabono: false
			}
		}
	},
	async fetch () {
		const bonoProtagonista = await this.$axios.$get('bonos-protagonista/' + this.id)
		this.bonoProtagonista = bonoProtagonista.properties
		this.marker = bonoProtagonista.geometry
		const bono = await this.$axios.$get('bonos/' + this.bonoProtagonista.bono)
		this.bonoProtagonista.bono = bono
		const protagonista = await this.$axios.$get('protagonistas/' + this.bonoProtagonista.protagonista)
		this.bonoProtagonista.protagonista = protagonista
		const proyecto = await this.$axios.$get('proyectos/' + this.bonoProtagonista.proyecto)
		this.bonoProtagonista.proyecto = proyecto
		const comunidad = await this.$axios.$get('comunidades/' + this.bonoProtagonista.comunidad)
		this.bonoProtagonista.comunidad = comunidad
		if (this.bonoProtagonista.tecnico != null) {
			const tecnico = await this.$axios.$get('tecnicos/' + this.bonoProtagonista.tecnico)
			this.bonoProtagonista.tecnico = tecnico
		}
		for (const perm in this.permissions) {
			console.log(perm)
			const has_perm = await this.$axios.$get('has-perm/?perm=' + perm)
			this.permissions[perm] = has_perm[perm]
		}
		this.showOverlay = false
	},
	fetchOnServer: false,
	computed: {
		nombreCompleto () {
			return this.bonoProtagonista.protagonista.nombres + ' ' + this.bonoProtagonista.protagonista.apellidos
		},
		tecnicoNombreCompleto () {
			return this.bonoProtagonista.tecnico.nombres + ' ' + this.bonoProtagonista.tecnico.apellidos
		},
		fechaEntregado () {
			const fecha = this.$moment(this.bonoProtagonista.fecha_recibido).format('DD/MM/YYYY')
			return fecha
		},
		latlng () {
			return { lat: this.marker.coordinates[1], lng: this.marker.coordinates[0] }
		}
	},
	methods: {
		goEdit () {
			this.$router.push({ name: 'bonos-form-id', params: { id: this.id } })
		},
		goBack () {
			this.$router.push({ name: 'bonos' })
		},
		deleteModal () {
			this.$bvModal.show('delete-modal')
		},
		async deleteBono () {
			this.$bvToast.toast('Eliminando...', { autoHideDelay: 1000 })
			try {
				const res = await this.$axios.delete('bonos-protagonista/' + this.id)
				if (res.status === 204) {
					this.$bvToast.show('delete-success')
				}
			} catch (err) {
				this.$bvToast.toast('Ocurrió un error en la operación.', {
					variant: 'danger',
					autoHideDelay: 2000
				})
			}
		}
	}
}
</script>
