<template>
	<b-overlay :show="showOverlay">
		<b-container fluid>
			<b-modal
			id="delete-modal"
			title="Eliminar Registro"
			:header-bg-variant="warningVariant"
			:header-text-variant="dangerVariant"
			@ok="deleteCapitalizacion"
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
								<b-icon icon="exclamation-triangle" variant="danger" />
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
			<b-jumbotron class="my-3">
				<b-toast
					id="toast-exito"
					variant="success"
					auto-hide-delay="2000"
					solid
					@hidden="goBack"
				>
					<div>
						<p class="h4">
							Registro Guardado <b-icon icon="hand-thumbs-up-fill" />
						</p>
					</div>
					<div>
						<p>Capitalización:</p>
						<ul>
							<li>
								{{ capInserted }} ingresados
							</li>
							<li>
								{{ capUpdated }} actualizados
							</li>
							<li>
								{{ capRejected }} rechazados
							</li>
						</ul>
					</div>
				</b-toast>
				<h1 class="text-uppercase">
					{{ titulo }} Beneficiario de Plan de Inversión
				</h1>
				<b-form
				id="form-plan"
				class="mt-4"
				>
					<b-container fluid>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="protagonista-fieldset"
								description="Seleccione ingresando el nombre del protagonista."
								label="Protagonista"
								label-for="input-protagonista"
								:invalid-feedback="getMessages().required"
								:state="!$v.plan.protagonista.$invalid"
								>
									<b-form-input
									id="input-protagonista"
									v-model="$v.plan.protagonista.$model"
									type="text"
									debounce="1000"
									list="protagonistas-list"
									placeholder="Nombre del protagonista"
									:plaintext="!isNew()"
									required
									/>
									<b-form-datalist id="protagonistas-list" :options="protagonistas" />
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
								id="bonos-fieldset"
								description="Plan de inversión que recibió"
								label="Plan de inversión"
								label-for="bono-select"
								:invalid-feedback="getMessages().required"
								:state="!$v.plan.bono.$invalid"
								>
									<b-form-select id="bono-select" v-model="$v.plan.bono.$model" :options="bonos" required />
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="proyecto-fieldset"
								description="Proyecto que entregó el plan de inversión"
								label="Proyecto"
								label-for="proyecto-select"
								:invalid-feedback="getMessages().required"
								:state="!$v.plan.proyecto.$invalid"
								>
									<b-form-select id="proyecto-select" v-model="$v.plan.proyecto.$model" :options="proyectos" required />
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
								id="tecnico-fieldset"
								description="Técnico del proyecto que entregó el bono/plan de inversión"
								label="Técnico"
								label-for="tecnico-select"
								>
									<b-form-select id="tecnico-select" v-model="plan.tecnico" :options="tecnicos" />
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="comunidad-fieldset"
								description="Comunidad donde se entregó el plan de inversión"
								label="Comunidad"
								label-for="comunidad-select"
								:invalid-feedback="getMessages().required"
								:state="!$v.plan.comunidad.$invalid"
								>
									<b-form-select id="comunidad-select" v-model="$v.plan.comunidad.$model" :options="comunidades" required />
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group
								id="fecha-entrega-fieldset"
								description="Fecha en que se entregó el bono/plan de inversión"
								label="Fecha de entrega"
								label-for="input-fecha-entrega"
								:invalid-feedback="getMessages().required"
								:state="!$v.plan.fecha_recibido.$invalid"
								>
									<b-form-datepicker id="input-fecha-entrega" v-model="$v.plan.fecha_recibido.$model" :max="maxDate" placeholder="Seleccione la Fecha" required />
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="6">
								<b-form-group
								id="observaciones-fieldset"
								label="Observaciones"
								label-for="observaciones-textarea"
								>
									<b-form-textarea id="observaciones-textarea" v-model="plan.observaciones" rows="5" max-rows="6" />
								</b-form-group>
							</b-col>
							<b-col v-if="(isNew() || plan.location === null) && addLocation" md="3">
								<b-form-group
								v-if="coordToggle"
								id="coords-geo-fieldset"
								label="Coordenadas Geográficas"
								:state="!$v.lat.$invalid && !$v.lng.$invalid"
								>
									<b-form-input
									id="geo-lat-input"
									v-model="lat"
									type="number"
									class="mt-2"
									placeholder="LATITUD"
									trim
									/>
									<b-form-input
									id="geo-lng-input"
									v-model="lng"
									type="number"
									class="mt-2"
									placeholder="LONGITUD"
									trim
									/>
								</b-form-group>
								<b-form-group
								v-if="!coordToggle"
								id="coords-fieldset"
								label="Coordenadas UTM"
								:state="!$v.coordx.$invalid && !$v.coordy.$invalid"
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
									v-model="coordx"
									type="number"
									placeholder="UTM X"
									trim
									/>
									<b-form-input
									id="coord-y-input"
									v-model="coordy"
									type="number"
									class="mt-2"
									placeholder="UTM Y"
									trim
									/>
								</b-form-group>
							</b-col>
							<b-col md="3">
								<b-button v-if="(isNew() || plan.location === null) && !addLocation" class="mb-3" size="sm" @click="addLocation=true">
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
									<b-form-checkbox id="checkbox-entregado" v-model="plan.entregado" name="chkentregado" value="entregado" unchecked-value="no-entregado" />
								</b-form-group>
								<b-form-group
								id="activo-fieldset"
								label="Activo"
								label-for="checkbox-activo"
								>
									<b-form-checkbox id="checkbox-activo" v-model="plan.activo" name="chkactivo" value="activo" unchecked-value="no-activo" />
								</b-form-group>
							</b-col>
						</b-row>
						<hr>
						<b-row class="m-2">
							<b-col class="md-10">
								<h5>
									Capitalización
									<b-button
									v-b-tooltip.hover
									title="Agregar 1 elemento a la lista"
									href="#"
									variant="primary"
									size="sm"
									class="mx-3"
									:disabled="!permissions.add_capitalizacion"
									@click.prevent="addCapitalizacion"
									>
										<b-icon icon="plus" />
									</b-button>
								</h5>
								<p class="lead">
									A continuación, detallar los bienes que componen el plan de inversión y que se le han entregado al beneficiario.
								</p>
								<b-alert :show="showCapitalizacionAlert" variant="danger">
									La lista de insumos es obligatoria y debe tener 'al menos' 1 artículo.
								</b-alert>
								<table>
									<thead>
										<tr>
											<td>
												Item
											</td>
											<td class="w-25">
												Artículo
											</td>
											<td class="w-25">
												U/M
											</td>
											<td>
												Cantidad
											</td>
											<td>
												Costo Unit. C$
											</td>
											<td />
										</tr>
										<tr v-for="(v, index) in $v.listaCapitalizacion.$each.$iter" :key="v.id">
											<td>
												{{ parseInt(index) + 1 }}
											</td>
											<td>
												<b-form-group
												:state="!$v.listaCapitalizacion.$dirty || v.articulo.required"
												:invalid-feedback="getMessages().required"
												>
													<b-form-select v-model="v.articulo.$model" :options="articulos" />
												</b-form-group>
											</td>
											<td>
												<b-form-group
												:state="!$v.listaCapitalizacion.$dirty || v.unidad.required"
												:invalid-feedback="getMessages().required"
												>
													<b-form-select v-model="v.unidad.$model" :options="unidades" />
												</b-form-group>
											</td>
											<td>
												<b-form-group
												:state="!$v.listaCapitalizacion.$dirty || !v.cantidad.$invalid"
												>
													<b-form-input v-model="v.cantidad.$model" type="number" />
													<template v-if="v.cantidad.$invalid" #invalid-feedback>
														{{ v.cantidad.required === false ? getMessages().required : v.cantidad.integer === false ? getMessages().integer : `Valor mínimo es: ${v.cantidad.$params.minValue.min}` }}
													</template>
												</b-form-group>
											</td>
											<td>
												<b-form-group
												:state="!$v.listaCapitalizacion.$dirty || !v.costo.$invalid"
												>
													<b-form-input v-model="v.costo.$model" type="number" />
													<template v-if="v.costo.$invalid" #invalid-feedback>
														{{ v.costo.required === false ? getMessages().required : v.costo.decimal === false ? getMessages().decimal : 'El costo debe ser mayor de 0' }}
													</template>
												</b-form-group>
											</td>
											<td>
												<b-button
												variant="danger"
												size="sm"
												:disabled="!permissions.delete_capitalizacion && v.id != null"
												@click="removeItem(index)"
												>
													<b-icon icon="trash" />
												</b-button>
											</td>
										</tr>
									</thead>
								</table>
							</b-col>
						</b-row>
						<b-row class="mt-4">
							<b-col md="3">
								<b-button
								class="text-uppercase"
								variant="success"
								:disabled="!permissions.add_protagonistabono && !permissions.change_protagonistabono && !permissions.change_capitalizacion"
								@click="guardar"
								>
									{{ isNew() ? 'Guardar' : 'Actualizar' }}&nbsp;&nbsp;<b-icon icon="save" />
								</b-button>
								<b-button class="text-uppercase" variant="warning" @click="goBack">
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
import { required, alphaNum, decimal, integer, minLength, minValue } from 'vuelidate/lib/validators'
export default {
	data () {
		const today = this.$moment().format('YYYY-MM-DD')
		return {
			id: null,
			plan: {
				id: null,
				protagonista: null,
				bono: null,
				proyecto: null,
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
			listaArticulos: [],
			listaUnidades: [],
			listaCapitalizacion: [
				{ id: null, p_bono: null, articulo: null, unidad: null, cantidad: 0, costo: 0.00, total: 0.00, digitador: null },
				{ id: null, p_bono: null, articulo: null, unidad: null, cantidad: 0, costo: 0.00, total: 0.00, digitador: null },
				{ id: null, p_bono: null, articulo: null, unidad: null, cantidad: 0, costo: 0.00, total: 0.00, digitador: null }
			],
			permissions: {
				add_protagonistabono: false,
				change_protagonistabono: false,
				add_capitalizacion: false,
				change_capitalizacion: false,
				delete_capitalizacion: false
			},
			maxDate: today,
			coordx: null,
			coordy: null,
			srid: 32617,
			lat: null,
			lng: null,
			coordToggle: false,
			capitalizacionId: null,
			capitalizacionIdx: null,
			warningVariant: 'warning',
			dangerVariant: 'danger',
			showOverlay: true,
			addLocation: false,
			capInserted: 0,
			capUpdated: 0,
			capRejected: 0
		}
	},
	validations: {
		plan: {
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
		listaCapitalizacion: {
			required,
			minLength: minLength(1),
			$each: {
				articulo: { required },
				unidad: { required },
				cantidad: { required, integer, minValue: minValue(1) },
				costo: { required, decimal, minValue: minValue(0.01) }
			}
		},
		validationGroup: ['plan', 'coordx', 'coordy', 'lat', 'lng']
	},
	async fetch () {
		const lProtagonistas = await this.$axios.$get('lista-protagonistas/')
		this.listaProtagonistas = lProtagonistas
		const lBonos = await this.$axios.$get('planes/')
		this.listaBonos = lBonos
		const lProyectos = await this.$axios.$get('lista-proyectos/')
		this.listaProyectos = lProyectos
		const lComunidades = await this.$axios.$get('comunidades/')
		this.listaComunidades = lComunidades
		const lTecnicos = await this.$axios.$get('tecnicos/activos/')
		this.listaTecnicos = lTecnicos
		const lArticulos = await this.$axios.$get('tablas/articulos/')
		this.listaArticulos = lArticulos
		const lUnidades = await this.$axios.$get('tablas/unidades/')
		this.listaUnidades = lUnidades
		for (const perm in this.permissions) {
			console.log(perm)
			const has_perm = await this.$axios.$get('has-perm/?perm=' + perm)
			this.permissions[perm] = has_perm[perm]
		}
		if (this.id != null || this.id !== undefined) {
			const data = await this.$axios.$get('planes-protagonista/' + this.id)
			this.plan = data.properties
			this.plan.entregado = data.properties.entregado === true ? 'entregado' : 'no-entregado'
			this.plan.activo = data.properties.activo === true ? 'activo' : 'no-activo'
			this.plan.location = data.geometry === undefined ? null : data.geometry
			const protagonista = await this.$axios.$get('protagonistas/' + data.properties.protagonista)
			this.plan.protagonista = `${protagonista.nombres.toUpperCase()} ${protagonista.apellidos.toUpperCase()} >>> ${protagonista.cedula.toUpperCase()}`
			const lCapitalizacion = await this.$axios.$get(`capitalizacion/por_plan/?plan=${this.id}&edit=1`)
			if (lCapitalizacion !== null && lCapitalizacion.length > 0) {
				this.listaCapitalizacion.unshift(...lCapitalizacion)
			}
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
		showCapitalizacionAlert () {
			return this.listaCapitalizacion.length === 0
		},
		proyecciones () {
			return [
				{ proyeccion: 'WGS84/UTM zone 17N', srid: 32617 },
				{ proyeccion: 'NAD27/UTM zone 17N', srid: 26717 }
			]
		},
		protagonistas () {
			const l = this.listaProtagonistas.length
			if (l != null && l > 0) {
				const lista = this.listaProtagonistas.map((prota) => {
					return prota.nombres.toUpperCase() + ' ' + prota.apellidos.toUpperCase() + ' >>> ' + prota.cedula.toUpperCase()
				})
				return lista
			} else {
				return []
			}
		},
		bonos () {
			const l = this.listaBonos.length
			if (l != null && l > 0) {
				const lista = this.listaBonos.map((bono) => {
					return { value: bono.id, text: bono.nombre.toUpperCase() }
				})
				lista.unshift({ value: null, text: 'Seleccione el Plan' })
				return lista
			} else {
				return []
			}
		},
		comunidades () {
			const l = this.listaComunidades.length
			if (l != null && l > 0) {
				const lista = this.listaComunidades.map((comunidad) => {
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
			const l = this.listaTecnicos.length
			if (l != null && l > 0) {
				const lista = this.listaTecnicos.map((tecnico) => {
					return { value: tecnico.cedula, text: tecnico.nombres.toUpperCase() + ' ' + tecnico.apellidos.toUpperCase() }
				})
				lista.unshift({ value: null, text: 'Seleccione el Técnico' })
				return lista
			} else {
				return []
			}
		},
		articulos () {
			const l = this.listaArticulos.length
			if (l != null && l > 0) {
				const lista = this.listaArticulos.map((articulo) => {
					return { value: articulo.id, text: articulo.elemento.toUpperCase() }
				})
				lista.unshift({ value: null, text: 'Seleccione' })
				return lista
			} else {
				return []
			}
		},
		unidades () {
			const l = this.listaUnidades.length
			if (l != null && l > 0) {
				const lista = this.listaUnidades.map((unidad) => {
					return { value: unidad.id, text: unidad.elemento.toUpperCase() }
				})
				lista.unshift({ value: null, text: 'Seleccione' })
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
			this.$router.push({ name: 'planes' })
		},
		errorToast (err) {
			this.$bvToast.toast(err, {
				title: 'Error!',
				autoHideDelay: 2000,
				appendToast: false,
				variant: 'danger'
			})
		},
		prepararCapitalizacion () {
			this.listaCapitalizacion = this.listaCapitalizacion.map((capitalizacion) => {
				if (capitalizacion.digitador === null) {
					capitalizacion.digitador = this.getUser().id
				} else {
					capitalizacion.actualizado_por = this.getUser().id
				}
				if (capitalizacion.p_bono === null) {
					capitalizacion.p_bono = this.id
				}
				return capitalizacion
			})
		},
		preparaGeometria () {
			if (this.plan.location === null && this.addLocation === true) {
				if (this.coordToggle === true) {
					this.plan.location = {
						type: 'Point',
						coordinates: [parseFloat(this.lng), parseFloat(this.lat)],
						srid: 4326
					}
				} else {
					this.plan.location = {
						type: 'Point',
						coordinates: [parseFloat(this.coordx), parseFloat(this.coordy)],
						srid: parseInt(this.srid)
					}
				}
			}
		},
		async guardaCapitalizacion () {
			for (const capitalizacion of this.listaCapitalizacion) {
				capitalizacion.total = capitalizacion.cantidad * capitalizacion.costo
				try {
					if (capitalizacion.id === null) {
						const res = await this.$axios.post('capitalizacion/', capitalizacion)
						if (res.status === 201) {
							this.capInserted++
						}
					} else {
						const res = await this.$axios.put(`capitalizacion/${capitalizacion.id}/`, capitalizacion)
						if (res.status === 200) {
							this.capUpdated++
						}
					}
				} catch (err) {
					console.log('Error al guardar capitalización!')
					this.capRejected++
				}
			}
			this.$nuxt.$loading.finish()
			this.$bvToast.show('toast-exito')
		},
		async guardar () {
			this.removeEmpty()
			this.$v.listaCapitalizacion.$touch()
			if (this.$v.validationGroup.$invalid || this.$v.listaCapitalizacion.$invalid) {
				this.$bvToast.toast('Existen campos con errores. Por favor revise y vuelva a intentarlo.', {
					title: 'Error de validación',
					variant: 'warning',
					autoHideDelay: 2500,
					appendToast: false
				})
			} else {
				if (this.plan.protagonista.includes('>>>')) {
					this.plan.protagonista = this.plan.protagonista.slice(this.plan.protagonista.indexOf('>>>') + 4)
				}
				this.plan.fecha_recibido = this.$moment(this.plan.fecha_recibido).format('YYYY-MM-DD')
				this.plan.entregado = this.plan.entregado === 'entregado'
				this.plan.activo = this.plan.activo === 'activo'
				this.$nuxt.$loading.start()
				this.$bvToast.toast('Guardando...')
				if (!this.isNew()) {
					this.plan.actualizado_por = this.getUser().id
					this.preparaGeometria()
					try {
						const res = await this.$axios.put(`planes-protagonista/${this.id}/`, this.plan)
						if (res.status === 200) {
							this.prepararCapitalizacion()
							this.guardaCapitalizacion()
						}
					} catch (err) {
						this.$nuxt.$loading.finish()
						this.errorToast(err)
					}
				} else {
					this.preparaGeometria()
					this.plan.digitador = this.getUser().id
					try {
						const res = await this.$axios.post('planes-protagonista/', this.plan)
						if (res.status === 201) {
							this.id = res.data.id
							this.prepararCapitalizacion()
							this.guardaCapitalizacion()
						}
					} catch (err) {
						this.$nuxt.$loading.finish()
						this.errorToast(err)
					}
				}
			}
		},
		cancelar () {
			this.goBack()
		},
		removeEmpty () {
			this.listaCapitalizacion = this.listaCapitalizacion.filter((capitalizacion) => {
				return capitalizacion.id != null || capitalizacion.p_bono != null ||
				(capitalizacion.articulo != null && capitalizacion.unidad != null)
			})
		},
		removeItem (idx) {
			if (this.listaCapitalizacion[idx].id === null) {
				this.listaCapitalizacion.splice(idx, 1)
			} else {
				if (this.listaCapitalizacion.length === 1) {
					this.$bvToast.toast('La lista no puede quedar vacía.', {
						title: 'Operación Rechazada',
						variant: 'warning',
						autoHideDelay: 1000,
						appendToast: true
					})
					return
				}
				this.capitalizacionId = this.listaCapitalizacion[idx].id
				this.capitalizacionIdx = idx
				this.$bvModal.show('delete-modal')
			}
		},
		addCapitalizacion () {
			this.listaCapitalizacion.push(
				{ id: null, p_bono: null, articulo: null, unidad: null, cantidad: 0, costo: 0.00, total: 0.00, digitador: null }
			)
		},
		async deleteCapitalizacion () {
			this.$nuxt.$loading.start()
			try {
				const res = await this.$axios.delete(`capitalizacion/${this.capitalizacionId}`)
				if (res.status === 204) {
					this.listaCapitalizacion.splice(this.capitalizacionIdx, 1)
					this.$bvToast.toast('Registro de capitalización eliminado.')
					this.$nuxt.$loading.finish()
				}
			} catch (err) {
				this.$nuxt.$loading.finish()
				this.errorToast(err)
			}
		}
	}
}
</script>
