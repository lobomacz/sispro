<template>
	<div class="container">
		<b-jumbotron class="my-3">
			<h1 class="text-uppercase">
				{{ titulo }} Protagonista
			</h1>
			<b-form
			id="form-protagonista"
			class="mt-4"
			@reset="onReset"
			>
				<b-container fluid>
					<b-row>
						<b-col md="4">
							<b-form-group
							id="cedula-fieldset"
							description="Cédula sin guiones"
							label="Cédula"
							label-for="input-cedula"
							>
								<b-form-input id="input-cedula" v-model="protagonista.cedula" :placeholder="placeholders.cedula" trim required />
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col md="6">
							<b-form-group
							id="nombres-fieldset"
							description="Primer y segundo nombres"
							label="Nombres"
							label-for="input-nombres"
							>
								<b-form-input id="input-nombres" v-model="protagonista.nombres" trim required />
							</b-form-group>
						</b-col>
						<b-col md="6">
							<b-form-group
							id="apellidos-fieldset"
							description="Primer y segundo apellidos"
							label="Apellidos"
							label-for="input-apellidos"
							>
								<b-form-input id="input-apellidos" v-model="protagonista.apellidos" trim required />
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col md="6">
							<b-form-group
							id="etnia-fieldset"
							label="Etnia"
							label-for="etnia-select"
							>
								<b-form-select id="etnia-select" v-model="protagonista.etnia" :options="etnias" required />
							</b-form-group>
						</b-col>
						<b-col md="6">
							<b-form-group
							id="comunidad-fieldset"
							description="Comunidad de origen"
							label="Comunidad"
							label-for="comunidad-select"
							>
								<b-form-select id="comunidad-select" v-model="protagonista.comunidad" :options="comunidades" required />
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col md="6">
							<b-form-group
							id="fecha-nacimiento-fieldset"
							label="Fecha de Nacimiento"
							label-for="input-fecha-nacimiento"
							>
								<b-form-datepicker id="input-fecha-nacimiento" v-model="protagonista.fecha_nacimiento" required />
							</b-form-group>
						</b-col>
						<b-col md="6">
							<b-form-group
							id="telefono-fieldset"
							description="Formato 8888-8888"
							label="Teléfono"
							label-for="input-telefono"
							>
								<b-form-input id="input-telefono" v-model="protagonista.telefono" :type="types.telefono" trim />
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col md="4">
							<b-form-group
							id="sexo-fieldset"
							label="Sexo"
							label-for="sexo-select"
							>
								<b-form-select id="sexo-select" v-model="protagonista.sexo" :options="sexos" required />
							</b-form-group>
						</b-col>
						<b-col md="4">
							<b-form-group
							id="promotor-fieldset"
							label="Es promotor"
							label-for="checkbox-promotor"
							>
								<b-form-checkbox id="checkbox-promotor" v-model="esPromotor" name="checkbox-1" value="promotor" unchecked-value="no-promotor" />
							</b-form-group>
						</b-col>
						<b-col md="4">
							<b-form-group
							id="jvc-fieldset"
							label="Miembro de JVC"
							label-for="checkbox-jvc"
							>
								<b-form-checkbox id="checkbox-jvc" v-model="esJvc" name="checkbox-2" value="jvc" unchecked-value="no-jvc" />
							</b-form-group>
						</b-col>
					</b-row>
					<b-row class="mt-4">
						<b-col md="3">
							<b-button class="text-uppercase" variant="success" @click="guardar">
								{{ id != null ? 'Actualizar' : 'Guardar' }}&nbsp;&nbsp;<b-icon icon="upload" />
							</b-button>
							<b-button type="reset" variant="danger">
								Reset
							</b-button>
						</b-col>
					</b-row>
				</b-container>
			</b-form>
		</b-jumbotron>
	</div>
</template>
<script>
export default {
	data () {
		return {
			id: this.$route.params.id,
			protagonista: {
				cedula: '',
				nombres: '',
				apellidos: '',
				fecha_nacimiento: null,
				sexo: null,
				etnia: null,
				comunidad: null,
				telefono: '',
				promotor: null,
				jvc: null
			},
			sexos: [
				{ value: null, text: 'Seleccione' },
				{ value: 'm', text: 'Masculino' },
				{ value: 'f', text: 'Femenino' }
			],
			listaEtnias: [],
			listaComunidades: [],
			placeholders: this.$store.getters.getPlaceholders,
			types: this.$store.getters.getTypes,
			esPromotor: '',
			esJvc: ''
		}
	},
	computed: {
		titulo () {
			if (this.id != null) {
				return 'Editar'
			} else {
				return 'Nuevo'
			}
		},
		etnias () {
			return []
		},
		comunidades () {
			return []
		}
	},
	watch: {
		esPromotor (newVal, oldVal) {
			this.protagonista.promotor = newVal === 'promotor'
		},
		esJvc (newVal, oldVal) {
			this.protagonista.jvc = newVal === 'jvc'
		}
	},
	methods: {
		guardar () {
			alert('GUARDAR')
		},
		onReset () {
			alert('RESET')
		}
	}
}
</script>
