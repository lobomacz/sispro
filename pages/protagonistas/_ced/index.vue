<template>
	<b-container fluid>
		<b-row>
			<b-col cols="8" class="mx-auto">
				<b-card
				v-if="protagonista != null"
				class="mt-3 text-uppercase"
				:title="nombre"
				:sub-title="protagonista.cedula"
				>
					<b-card-text>
						Fecha de Nacimiento: {{ fechaNac }}
					</b-card-text>
					<b-card-text>
						Comunidad: {{ protagonista.comunidad }}
					</b-card-text>
					<b-card-text>
						Etnia: {{ protagonista.etnia }}
					</b-card-text>
					<b-card-text>
						Sexo: {{ sexo }}
					</b-card-text>
					<b-alert show="bonos.length > 0">
						Bonos Recibidos
					</b-alert>
					<b-table
					v-if="bonos.length > 0"
					striped
					hover
					selectable
					:items="bonos"
					:fields="fields"
					@row-selected="getBono"
					/>
					<b-list-group
					v-if="bonos.length > 0"
					>
						<b-list-group-item
						v-for="bono in bonos"
						:key="bono.id"
						@click="getBono(bono.id)"
						>
							{{ bono.bono }}&mdash;{{ bono.proyecto }}
						</b-list-group-item>

					</b-list-group>
					<b-alert show="planes.length > 0">
						Planes de inversión Recibidos
					</b-alert>
					<b-table
					v-if="planes.length > 0"
					striped
					hover
					selectable
					:items="planes"
					:fields="fields2"
					@row-selected="getPlan"
					/>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>
export default {
	data () {
		return {
			ced: this.$route.params.ced,
			protagonista: null,
			bonos: [],
			planes: [],
			fields: ['bono', { key: 'fecha_recibido', label: 'Fecha de Recibido', sortable: true }],
			fields2: [{ key: 'bono', label: 'Plan de Inversión' }, { key: 'fecha_recibido', label: 'Fecha de Recibido', sortable: true }],
			selectMode: 'single'
		}
	},
	async fetch () {
		const prota = await this.$axios.$get('protagonistas/' + this.ced)
		this.protagonista = prota
		const bonos = await this.$axios.$get('bonos-protagonista/' + this.ced + '/entregados')
		this.bonos = bonos
		const planes = await this.$axios.$get('planes-protagonista/' + this.ced + '/entregados')
		this.planes = planes
	},
	fetchOnServer: false,
	computed: {
		nombre () {
			return this.protagonista.nombres + ' ' + this.protagonista.apellidos
		},
		sexo () {
			return this.protagonista.sexo === 'm' ? 'Masculino' : 'Femenino'
		},
		fechaNac () {
			const d = this.$moment(this.protagonista.fecha_nacimiento).format('DD/MM/YYYY')
			return d
		}
	},
	methods: {
		getBono (row) {
			const id = row[0].id
			this.$router.push({ name: 'bonos-id', params: { id } })
		},
		getPlan (row) {
			const id = row[0].id
			this.$router.push({ name: 'planes-id', params: { id } })
		}
	}
}
</script>
