<template>
	<b-overlay :show="showOverlay">
		<b-container fluid>
			<b-form v-if="usuario != null" id="user-form">
				<b-container fluid>
					<h3
					class="text-uppercase my-3"
					>
					Perfil del usuario
					</h3>
					<b-row class="align-content-center">
						<b-col cols="5">
							<b-form-group
							id="email-fieldset"
							label="Email"
							label-for="email-input"
							:invalid-feedback="getMessages().email"
							:state="!$v.usuario.email.$invalid"
							>
								<b-form-input id="email-input" v-model="$v.usuario.email.$model" type="email" />
								<template v-if="$v.usuario.email.$dirty" #invalid-feedback>
									<div v-if="!$v.usuario.email.required" class="fs-6 text-danger">
										{{ getMessages().required }}
									</div>
									<div v-if="!$v.usuario.email.email" class="fs-6 text-danger">
										{{ getMessages().emailField }}
									</div>
								</template>
							</b-form-group>
						</b-col>
						<b-col cols="5">
							<b-form-group
							id="username-fieldset"
							description="El nombre de usuario debe ser su actual dirección de correo."
							label="Nombre de usuario"
							label-for="nombre-usuario-input"
							:state="!$v.usuario.username.$invalid"
							>
								<b-form-input id="nombre-usuario-input" v-model="$v.usuario.username.$model" type="email" />
								<template v-if="$v.usuario.username.$invalid" #invalid-feedback>
									<div v-if="!$v.usuario.username.required" class="fs-6 text-danger">
										{{ getMessages().required }}
									</div>
									<div v-if="!$v.usuario.username.email" class="fs-6 text-danger">
										{{ getMessages().email }}
									</div>
									<div v-if="!$v.usuario.username.sameAs" class="fs-6 text-danger">
										{{ 'El nombre de usuario debe tener el mismo valor que el email.' }}
									</div>
								</template>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row>
						<b-col cols="5">
							<b-form-group
							id="first-name-fieldset"
							label="Nombre"
							label-for="first-name-input"
							:state="!$v.usuario.first_name.$invalid"
							>
								<b-form-input id="first-name-input" v-model="$v.usuario.first_name.$model" trim />
								<template v-if="$v.usuario.first_name.$dirty" #invalid-feedback>
									<div v-if="!$v.usuario.first_name.required" class="fs-6 text-danger">
										{{ getMessages().required }}
									</div>
									<div v-if="!$v.usuario.first_name.minLength" class="fs-6 text-danger">
										{{ 'El campo debe tener al menos ' + $v.usuario.first_name.$params.minLength.min + ' caracteres.' }}
									</div>
								</template>
							</b-form-group>
						</b-col>
						<b-col cols="5">
							<b-form-group
							id="last-name-fieldset"
							label="Apellido"
							label-for="last-name-input"
							:state="!$v.usuario.last_name.$invalid"
							>
								<b-form-input id="last-name-input" v-model="$v.usuario.last_name.$model" trim />
								<template v-if="$v.usuario.last_name.$dirty" #invalid-feedback>
									<div v-if="!$v.usuario.last_name.required" class="fs-6 text-danger">
										{{ getMessages().required }}
									</div>
									<div v-if="!$v.usuario.last_name.minLength" class="fs-6 text-danger">
										{{ 'El campo debe tener al menos ' + $v.usuario.last_name.$params.minLength.min + ' caracteres.' }}
									</div>
								</template>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row class="mt-3">
						<b-col cols="3">
							<b-button variant="primary" :disabled="$v.usuario.$invalid" @click="submitUser">
								Guardar&nbsp;&nbsp;<b-icon icon="save" />
							</b-button>
						</b-col>
					</b-row>
					<b-row class="mt-3">
						<b-col cols="3">
							<b-button :variant="buttonVariant" @click="changePassword = !changePassword">
								Cambiar Contraseña&nbsp;&nbsp;<b-icon icon="key" />
							</b-button>
						</b-col>
					</b-row>
					<b-row v-if="changePassword" class="mt-3">
						<b-col cols="5">
							<b-form-group
							id="password-fieldset"
							description="Ingrese la contraseña actual."
							label="Contraseña Actual"
							label-for="password-input"
							:invalid-feedback="getMessages().required"
							:state="!$v.password.$invalid"
							>
								<b-input-group>
									<b-form-input id="password-input" v-model="$v.password.$model" :type="typePass" />
									<b-input-group-append>
										<b-button variant="info" @click="seePass">
											<b-icon :icon="iconPass" />
										</b-button>
									</b-input-group-append>
								</b-input-group>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row v-if="changePassword" class="mt-3">
						<b-col cols="5">
							<b-form-group
							id="new-password-fieldset"
							description="Ingrese la nueva contraseña."
							label="Nueva Contraseña"
							label-for="new-password-input"
							:state="!$v.newPassword.$dirty"
							>
								<b-input-group>
									<b-form-input id="new-password-input" v-model="$v.newPassword.$model" :type="typePass2" />
									<b-input-group-append>
										<b-button variant="info" @click="seePass(2)">
											<b-icon :icon="iconPass2" />
										</b-button>
									</b-input-group-append>
								</b-input-group>
								<template v-if="$v.newPassword.$dirty" #invalid-feedback>
									<div v-if="!$v.newPassword.required" class="fs-6 text-danger">
										{{ getMessages().required }}
									</div>
									<div v-if="!$v.newPassword.minLength" class="fs-6 text-danger">
										{{ 'El campo debe tener al menos ' + $v.newPassword.$params.minLength.min + ' caracteres.' }}
									</div>
								</template>
							</b-form-group>
						</b-col>
						<b-col cols="5">
							<b-form-group
							id="repeat-password-fieldset"
							description="Confirme la nueva contraseña."
							label="Confirmar Contraseña"
							label-for="repeat-password-input"
							:state="!$v.repeatPassword.$dirty"
							>
								<b-input-group>
									<b-form-input id="repeat-password-input" v-model="$v.repeatPassword.$model" :type="typePass3" />
									<b-input-group-append>
										<b-button variant="info" @click="seePass(3)">
											<b-icon :icon="iconPass3" />
										</b-button>
									</b-input-group-append>
								</b-input-group>
								<template v-if="$v.repeatPassword.$dirty" #invalid-feedback>
									<div v-if="!$v.repeatPassword.required" class="fs-6 text-danger">
										{{ getMessages().required }}
									</div>
									<div v-if="!$v.repeatPassword.sameAs" class="fs-6 text-danger">
										{{ 'Las contraseñas no coinciden.' }}
									</div>
								</template>
							</b-form-group>
						</b-col>
					</b-row>
					<b-row v-if="changePassword" class="mt-3">
						<b-col cols="3">
							<b-button variant="primary" :disabled="$v.validationGroup.$invalid" @click="submitPassword">
								Guardar&nbsp;&nbsp;<b-icon icon="save" />
							</b-button>
						</b-col>
					</b-row>
				</b-container>
			</b-form>
		</b-container>
	</b-overlay>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { required, requiredIf, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
	data () {
		return {
			usuario: null,
			password: null,
			newPassword: null,
			repeatPassword: null,
			typePass: 'password',
			typePass2: 'password',
			typePass3: 'password',
			changePassword: false,
			toastTitle: '',
			toastMessage: '',
			toastVariant: 'info',
			showOverlay: true
		}
	},
	validations: {
		usuario: {
			email: { required, email },
			username: { required, email, sameAs: sameAs('email') },
			first_name: {
				required,
				minLength: minLength(3)
			},
			last_name: {
				required,
				minLength: minLength(3)
			}
		},
		password: { required },
		newPassword: { required, minLength: minLength(8) },
		repeatPassword: { required: requiredIf('passwordEntered'), sameAs: sameAs('newPassword') },
		validationGroup: ['password', 'newPassword', 'repeatPassword']
	},
	async fetch () {
		const user = await this.$axios.$get('me/refresh')
		this.usuario = user
		this.showOverlay = false
	},
	fetchOnServer: false,
	computed: {
		passwordEntered () {
			return this.$v.newPassword.$dirty && this.$v.newPassword.minLength
		},
		buttonVariant () {
			return this.changePassword ? '' : 'primary'
		},
		iconPass () {
			return this.typePass === 'password' ? 'eye' : 'eye-slash'
		},
		iconPass2 () {
			return this.typePass2 === 'password' ? 'eye' : 'eye-slash'
		},
		iconPass3 () {
			return this.typePass3 === 'password' ? 'eye' : 'eye-slash'
		}
	},
	methods: {
		...mapGetters(['getUser', 'getToken', 'getMessages']),
		...mapMutations(['setUser']),
		async submitUser () {
			this.$nuxt.$loading.start()
			this.$bvToast.toast('Actualizando datos...', {
				autoHideDelay: 1000,
				variant: 'info'
			})
			const id = this.getUser().id
			try {
				const res = await this.$axios.patch(`me/${id}/`, this.usuario)
				if (res.status === 202) {
					this.$nuxt.$loading.finish()
					this.$bvToast.toast('¡Datos actualizados!', {
						autoHideDelay: 2000,
						appendToast: true,
						variant: 'success'
					})
					const user = res.data
					const token = this.getToken()
					user.token = token
					this.setUser({ user })
				} else {
					this.$nuxt.$loading.finish()
					this.$bvToast.toast(res.data.message, {
						title: '¡Error!',
						autoHideDelay: 2000,
						appendToast: true,
						variant: 'danger'
					})
				}
			} catch (err) {
				this.$nuxt.$loading.finish()
				this.$bvToast.toast(err, {
					title: '¡Error!',
					autoHideDelay: 2000,
					appendToast: true,
					variant: 'danger'
				})
			}
		},
		async submitPassword () {
			this.$nuxt.$loading.start()
			this.$bvToast.toast('Verificanto contraseña anterior...', {
				autoHideDelay: 2000,
				variant: 'info'
			})
			try {
				let res = await this.$axios.post('me/check_password/', { password: this.password })
				if (res.status === 200) {
					this.$bvToast.toast(res.data.message, {
						autoHideDelay: 2000,
						variant: 'success',
						appendToast: true
					})
					this.$root.$bvToast.toast('Actualizando contraseña...', {
						autoHideDelay: 2000,
						variant: 'info',
						appendToast: true
					})
					try {
						res = await this.$axios.post('me/change_password/', {
							password: this.password,
							newPassword: this.newPassword
						})
						if (res.status === 202) {
							this.$nuxt.$loading.finish()
							this.$root.$bvToast.toast(res.data.message, {
								autoHideDelay: 2000,
								variant: 'success',
								appendToast: true
							})
							this.$router.push({ name: 'login' })
						} else {
							this.$nuxt.$loading.finish()
							this.$bvToast.toast(res.data.message, {
								title: '¡Error!',
								autoHideDelay: 2000,
								appendToast: true,
								variant: 'danger'
							})
						}
					} catch (err) {
						this.$nuxt.$loading.finish()
						this.$bvToast.toast(err, {
							title: '¡Error!',
							autoHideDelay: 2000,
							appendToast: true,
							variant: 'danger'
						})
					}
				} else {
					this.$nuxt.$loading.finish()
					this.$bvToast.toast(res.data.message, {
						title: '¡Error!',
						autoHideDelay: 2000,
						appendToast: true,
						variant: 'danger'
					})
				}
			} catch (err) {
				this.$nuxt.$loading.finish()
				this.$bvToast.toast(err, {
					title: '¡Error!',
					autoHideDelay: 2000,
					appendToast: true,
					variant: 'danger'
				})
			}
		},
		seePass (num = null) {
			switch (num) {
			case 2:
				this.typePass2 = this.typePass2 === 'password' ? 'text' : 'password'
				break
			case 3:
				this.typePass3 = this.typePass3 === 'password' ? 'text' : 'password'
				break
			default:
				this.typePass = this.typePass === 'password' ? 'text' : 'password'
			}
		}
	}
}
</script>
