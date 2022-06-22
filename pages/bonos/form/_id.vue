<template>
	<b-overlay :show="showOverlay">
		<b-container fluid>
			<b-jumbotron class="my-3">
				<b-toast
					id="toast-exito"
					variant="success"
					auto-hide-delay="2000"
					solid
					@hidden="goBack"
				>
					Registro Guardado <b-icon icon="hand-thumbs-up-fill" />
				</b-toast>
				<h1 class="text-uppercase">
					{{ titulo }} Beneficiario de Bono
				</h1>
				<b-form
				id="form-bono"
				class="mt-4"
				>
					<b-container fluid>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="protagonista-fieldset"
								label="Protagonista"
								label-for="input-protagonista"
								:invalid-feedback="getMessages().required"
								:state="!$v.bono.protagonista.$invalid"
								>
									<b-form-input
									id="input-protagonista"
									v-model="$v.bono.protagonista.$model"
									type="text"
									debounce="1000"
									list="protagonistas-list"
									:plaintext="!isNew()"
									required
									/>
									<b-form-datalist id="protagonistas-list" :options="protagonistas" />
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
								id="bonos-fieldset"
								description="Bono productivo que recibió"
								label="Bono"
								label-for="bono-select"
								:invalid-feedback="getMessages().required"
								:state="!$v.bono.bono.$invalid"
								>
									<b-form-select id="bono-select" v-model="$v.bono.bono.$model" :options="bonos" required />
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="proyecto-fieldset"
								description="Proyecto que entregó el bono"
								label="Proyecto"
								label-for="proyecto-select"
								:invalid-feedback="getMessages().required"
								:state="!$v.bono.proyecto.$invalid"
								>
									<b-form-select id="proyecto-select" v-model="$v.bono.proyecto.$model" :options="proyectos" required />
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
								id="tecnico-fieldset"
								description="Técnico del proyecto que entregó el bono"
								label="Técnico"
								label-for="tecnico-select"
								>
									<b-form-select id="tecnico-select" v-model="bono.tecnico" :options="tecnicos" />
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="comunidad-fieldset"
								description="Comunidad donde se entregó el bono"
								label="Comunidad"
								label-for="comunidad-select"
								:invalid-feedback="getMessages().required"
								:state="!$v.bono.comunidad.$invalid"
								>
									<b-form-select id="comunidad-select" v-model="$v.bono.comunidad.$model" :options="comunidades" required />
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
								id="fecha-entrega-fieldset"
								description="Fecha en que se entregó el bono/plan de inversión"
								label="Fecha de entrega"
								label-for="input-fecha-entrega"
								:invalid-feedback="getMessages().required"
								:state="!$v.bono.fecha_recibido.$invalid"
								>
									<b-form-datepicker id="input-fecha-entrega" v-model="$v.bono.fecha_recibido.$model" :max="maxDate" placeholder="Seleccione la Fecha" required />
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="observaciones-fieldset"
								label="Observaciones"
								label-for="observaciones-textarea"
								:invalid-feedback="getMessages().alphaNum"
								:state="!$v.bono.observaciones.$invalid"
								>
									<b-form-textarea id="observaciones-textarea" v-model="$v.bono.observaciones.$model" rows="5" max-rows="6" />
								</b-form-group>
							</b-col>
							<b-col v-if="(isNew() || bono.location === null) && addLocation" md="3">
								<b-form-group
								v-if="coordToggle"
								id="coords-geo-fieldset"
								label="Coordenadas Geográficas"
								:invalid-feedback="getMessages().decimal"
								:state="$v.lat.decimal && $v.lng.decimal"
								>
									<b-form-input
									id="geo-lat-input"
									v-model="$v.lat.$model"
									type="number"
									class="mt-2"
									placeholder="LATITUD"
									trim
									/>
									<b-form-input
									id="geo-lng-input"
									v-model="$v.lng.$model"
									type="number"
									class="mt-2"
									placeholder="LONGITUD"
									trim
									/>
								</b-form-group>
								<b-form-group
								v-if="!coordToggle"
								id="coords-utm-fieldset"
								label="Coordenadas UTM"
								:invalid-feedback="getMessages().decimal"
								:state="$v.coordx.decimal && $v.coordy.decimal"
								>
									<b-form-radio-group
									v-model="srid"
									:options="proyecciones"
									class="mb-3"
									value-field="srid"
									text-field="proyeccion"
									/>
									<b-form-input
									id="coord-x-input"
									v-model="$v.coordx.$model"
									type="number"
									placeholder="UTM X"
									trim
									/>
									<b-form-input
									id="coord-y-input"
									v-model="$v.coordy.$model"
									type="number"
									class="mt-2"
									placeholder="UTM Y"
									trim
									/>
								</b-form-group>
							</b-col>
							<b-col md="3">
								<b-button v-if="(isNew() || bono.location === null) && !addLocation" class="mb-3" size="sm" @click="addLocation=true">
									Agregar Coordenadas <b-icon icon="geo-alt" />
								</b-button>
								<b-button v-if="addLocation === true" :pressed.sync="coordToggle" variant="primary" class="mb-3">
									{{ coordToggle ? 'UTM':'GEO' }}
								</b-button>
								<b-form-group
								id="entregado-fieldset"
								label="Entregado"
								label-for="checkbox-entregado"
								>
									<b-form-checkbox id="checkbox-entregado" v-model="bono.entregado" name="chkentregado" value="entregado" unchecked-value="no-entregado" />
								</b-form-group>
								<b-form-group
								id="activo-fieldset"
								label="Activo"
								label-for="checkbox-activo"
								>
									<b-form-checkbox id="checkbox-activo" v-model="bono.activo" name="chkactivo" value="activo" unchecked-value="no-activo" />
								</b-form-group>
							</b-col>
						</b-row>
						<b-row class="mt-4">
							<b-col md="3">
								<b-button class="text-uppercase" variant="success" @click="guardar">
									{{ isNew() ? 'Guardar' : 'Actualizar' }}&nbsp;&nbsp;<b-icon icon="save" />
								</b-button>
								<b-button class="text-uppercase" variant="warning" @click="cancelar">
									Cancelar&nbsp;&nbsp;<b-icon icon="arrow-counterclockwise" />
								</b-button>
							</b-col>
						</b-row>
					</b-container>
				</b-form>
			</b-jumbotron>
		</b-container>
	</b-overlay>
</template>
<script>
import { mapGetters } from 'vuex'
import { required, alphaNum, decimal } from 'vuelidate/lib/validators'
export default {
	data () {
		const today = this.$moment().format('YYYY-MM-DD')
		return {
			id: null,
			bono: {
				id: null,
				bono: null,
				proyecto: null,
				protagonista: null,
				fecha_recibido: null,
				tecnico: null,
				comunidad: null,
				observaciones: '',
				location: null,
				activo: '',
				entregado: '',
				digitador: null,
				actualizado_por: null
			},
			listaProtagonistas: [],
			listaBonos: [],
			listaProyectos: [],
			listaComunidades: [],
			listaTecnicos: [],
			maxDate: today,
			coordx: null,
			coordy: null,
			srid: 32617,
			lat: null,
			lng: null,
			showOverlay: true,
			coordToggle: true,
			addLocation: false
		}
	},
	validations: {
		bono: {
			bono: { required },
			proyecto: { required },
			fecha_recibido: { required },
			comunidad: { required },
			observaciones: { alphaNum },
			protagonista: { required }
		},
		coordx: { decimal },
		coordy: { decimal },
		lat: { decimal },
		lng: { decimal },
		validationGroup: ['bono', 'coordx', 'coordy', 'lat', 'lng']
	},
	async fetch () {
		const lProtagonistas = await this.$axios.$get('lista-protagonistas/')
		this.listaProtagonistas = lProtagonistas
		const lBonos = await this.$axios.$get('bonos/')
		this.listaBonos = lBonos
		const lProyectos = await this.$axios.$get('lista-proyectos/')
		this.listaProyectos = lProyectos
		const lComunidades = await this.$axios.$get('comunidades/')
		this.listaComunidades = lComunidades
		const lTecnicos = await this.$axios.$get('tecnicos/activos/')
		this.listaTecnicos = lTecnicos
		if (this.id != null || this.id !== undefined) {
			const data = await this.$axios.$get('bonos-protagonista/' + this.id)
			this.bono = data.properties
			this.bono.location = data.geometry
			this.bono.entregado = data.properties.entregado === true ? 'entregado' : 'no-entregado'
			this.bono.activo = data.properties.activo === true ? 'activo' : 'no-activo'
			const protagonista = await this.$axios.$get('protagonistas/' + this.bono.protagonista)
			this.bono.protagonista = `${protagonista.nombres.toUpperCase()} ${protagonista.apellidos.toUpperCase()} >>> ${protagonista.cedula.toUpperCase()}`
			const lTecnicos = await this.$axios.$get('tecnicos/')
			this.listaTecnicos = lTecnicos
		}
		this.showOverlay = false
	},
	fetchOnServer: false,
	computed: {
		titulo () {
			return this.isNew() ? 'Registrar' : 'Editar'
		},
		proyecciones () {
			return [
				{ proyeccion: 'WGS84/UTM zone 17N', srid: 32617 },
				{ proyeccion: 'NAD27/UTM zone 17N', srid: 26717 }
			]
		},
		protagonistas () {
			const l = this.listaProtagonistas.count
			if (l != null && l > 0) {
				const lista = this.listaProtagonistas.results.map((prota) => {
					return prota.nombres.toUpperCase() + ' ' + prota.apellidos.toUpperCase() + ' >>> ' + prota.cedula.toUpperCase()
				})
				return lista
			} else {
				return []
			}
		},
		bonos () {
			const l = this.listaBonos.count
			if (l != null && l > 0) {
				const lista = this.listaBonos.results.map((bono) => {
					return { value: bono.id, text: bono.nombre.toUpperCase() }
				})
				lista.unshift({ value: null, text: 'Seleccione el Bono' })
				return lista
			} else {
				return []
			}
		},
		comunidades () {
			const l = this.listaComunidades.count
			if (l != null && l > 0) {
				const lista = this.listaComunidades.results.map((comunidad) => {
					return { value: comunidad.id, text: comunidad.municipio.toUpperCase() + '-' + comunidad.nombre.toUpperCase() }
				})
				lista.unshift({ value: null, text: 'Seleccione la Comunidad' })
				return lista
			} else {
				return []
			}
		},
		proyectos () {
			const l = this.listaProyectos.length
			if (l != null && l > 0) {
				const lista = this.listaProyectos.map((proyecto) => {
					return { value: proyecto.id, text: proyecto.nombre }
				})
				lista.unshift({ value: null, text: 'Seleccione el Proyecto' })
				return lista
			} else {
				return []
			}
		},
		tecnicos () {
			// La API devuelve un array únicamente. El procesamiento se hace sencillo en este caso.
			const l = this.listaTecnicos.length
			if (l != null && l > 0) {
				const lista = this.listaTecnicos.map((tecnico) => {
					return { value: tecnico.cedula.toUpperCase(), text: tecnico.nombres.toUpperCase() + ' ' + tecnico.apellidos.toUpperCase() }
				})
				lista.unshift({ value: null, text: 'Seleccione el Técnico' })
				return lista
			} else {
				return []
			}
		}
	},
	created () {
		this.id = this.$route.params.id
	},
	methods: {
		...mapGetters([
			'getMessages',
			'getUser',
			'getPreviousRoute'
		]),
		isNew () {
			return this.id === null || this.id === undefined
		},
		goBack () {
			this.$router.push({ name: 'bonos' })
		},
		errorToast (err) {
			this.$bvToast.toast(err, {
				title: 'Error!',
				autoHideDelay: 2000,
				appendToast: false,
				variant: 'danger'
			})
		},
		async guardar () {
			if (this.$v.validationGroup.$invalid) {
				this.$bvToast.toast('Existen campos con errores. Por favor revise y vuelva a intentarlo.', {
					title: 'Error de validación',
					variant: 'warning',
					autoHideDelay: 2500,
					appendToast: false
				})
			} else {
				if (this.bono.protagonista.includes('>>>')) {
					this.bono.protagonista = this.bono.protagonista.slice(this.bono.protagonista.indexOf('>>>') + 4)
				}
				this.bono.fecha_recibido = this.$moment(this.bono.fecha_recibido).format('YYYY-MM-DD')
				this.bono.entregado = this.bono.entregado === 'entregado'
				this.bono.activo = this.bono.activo === 'activo'
				this.$nuxt.$loading.start()
				if (!this.isNew()) {
					this.bono.actualizado_por = this.getUser().id
					try {
						const res = await this.$axios.put('bonos-protagonista/' + this.id, this.bono)
						if (res.status === 200) {
							this.$bvToast.show('toast-exito')
						}
					} catch (err) {
						this.errorToast(err)
					}
				} else {
					if (this.bono.location === null && this.addLocation === true) {
						if (this.coordToggle === true) {
							this.bono.location = {
								type: 'Point',
								coordinates: [parseFloat(this.lng), parseFloat(this.lat)],
								srid: 4326
							}
						} else {
							this.bono.location = {
								type: 'Point',
								coordinates: [parseFloat(this.coordx), parseFloat(this.coordy)],
								srid: parseInt(this.srid)
							}
						}
					}
					this.bono.digitador = this.getUser().id
					try {
						const res = await this.$axios.post('bonos-protagonista/', this.bono)
						if (res.status === 201) {
							this.$bvToast.show('toast-exito')
						}
					} catch (err) {
						this.errorToast(err)
					}
				}
			}
		},
		cancelar () {
			this.goBack()
		}
	}
}
</script>
