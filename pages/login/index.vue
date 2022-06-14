<template>
	<b-overlay :show="overlay">
		<div class="container">
			<div class="row">
				<div v-if="loaded" class="col-4 mt-4 mx-auto">
					<b-alert
					:show="dismissCountDown"
					variant="danger"
					@dismiss-count-down="countDownChanged"
					>
						El nombre de usuario y/o contraseña no son correctos.
					</b-alert>
					<b-card
					img-src="GRACCS.png"
					img-alt="Logo graccs"
					img-top
					class="mb-2"
					>
						<b-card-title class="text-center">
							{{ cardTitle }}
						</b-card-title>
						<b-form-group
						id="fieldset-1"
						description="Email de usuario"
						label="Nombre de Usuario"
						label-for="nombreusuario"
						:invalid-feedback="usernameFB"
						:state="usernameState"
						>
							<b-form-input
							id="nombreusuario"
							v-model.trim="username"
							placeholder="correo@servicio.com"
							type="email"
							trim
							:state="usernameState"
							@input="setUsername"
							/>
						</b-form-group>
						<b-form-group
						id="fieldset-2"
						description="Mínimo 8 caracteres"
						label="Contraseña"
						label-for="contrasena"
						:invalid-feedback="passwordFB"
						:state="passwordState"
						>
							<b-form-input
							id="contrasena"
							v-model.trim="password"
							placeholder="Contraseña"
							type="password"
							trim
							:state="passwordState"
							@keyup="keyUpHandler"
							/>
						</b-form-group>
						<b-button variant="primary" @click="login">
							Ingresar
						</b-button>
					</b-card>
				</div>
			</div>
		</div>
	</b-overlay>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
	layout: 'minima',
	data () {
		return {
			appName: process.env.appName,
			loaded: false,
			overlay: false,
			password: '',
			username: '',
			passwordState: true,
			usernameState: true,
			dismissSecs: 5,
			dismissCountDown: 0
		}
	},
	validations: {
		username: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(8)
		}
	},
	computed: {
		cardTitle () {
			return 'Ingreso ' + this.appName.toUpperCase()
		},
		usernameFB () {
			let feedback = ''
			if (!this.$v.username.required) {
				feedback = this.getMessages().required
			} else if (!this.$v.username.email) {
				feedback = this.getMessages().emailField
			} else {
				feedback = ''
			}
			return feedback
		},
		passwordFB () {
			let feedback = ''
			if (!this.$v.password.required) {
				feedback = this.getMessages().required
			} else if (!this.$v.password.minLength) {
				feedback = `El valor debe ser de ${this.$v.password.$params.minLength.min} caracteres o más.`
			} else {
				feedback = ''
			}
			return feedback
		}
	},
	beforeMount () {
		this.$nextTick(() => this.$nuxt.$loading.start())
	},
	mounted () {
		this.$nextTick(() => {
			this.$nuxt.$loading.finish()
			this.loaded = true
		})
	},
	methods: {
		...mapMutations([
			'setUser'
		]),
		...mapGetters([
			'getMessages'
		]),
		setUsername (value) {
			this.username = value
			this.$v.username.$touch()
			if (!this.$v.username.required || !this.$v.username.email) {
				this.usernameState = false
			} else {
				this.usernameState = true
			}
		},
		setPassword (value) {
			this.password = value
			this.$v.password.$touch()
			if (!this.$v.password.minLength || !this.$v.password.required) {
				this.passwordState = false
			} else {
				this.passwordState = true
			}
		},
		countDownChanged (dismissCountDown) {
			this.dismissCountDown = dismissCountDown
		},
		keyUpHandler (e) {
			if (e.code === 'Enter') {
				this.login()
			} else {
				this.setPassword(e.target.value)
			}
		},
		async login () {
			if (this.usernameState && this.passwordState) {
				this.$nuxt.$loading.start()
				this.overlay = true
				const userObj = await this.$axios.$post('auth/', { username: this.username, password: this.password })
				if (Object.keys(userObj).includes('token')) {
					const date = this.$moment().format('YYYY-MM-DD HH:mm:ss')
					this.setUser({ user: userObj })
					this.$auth.$storage.setLocalStorage('token', userObj.token)
					this.$auth.$storage.setLocalStorage('loginTime', date)
					this.overlay = false
					this.$nuxt.$loading.finish()
					this.$router.push('/planes')
				} else {
					this.dismissCountDown = this.dismissSecs
				}
			} else {
				this.$bvToast.toast('Por favor, revise los valores que presentan error.', {
					title: 'Validación de Datos',
					autoHideDelay: 2500,
					appendToast: false,
					variant: 'danger'
				})
			}
		}
	}
}
</script>
