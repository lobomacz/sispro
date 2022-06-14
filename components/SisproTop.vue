<template>
	<b-navbar type="dark" variant="info text-uppercase">
		<div class="container-fluid">
			<div class="d-flex flex-row">
				<b-button v-if="isAuthenticated === true && showAccess === true" v-b-toggle.sidebar variant="info" class="border-0 mr-3">
					<b-icon icon="menu-button-wide" />
				</b-button>
				<b-navbar-brand :to="isAuthenticated ? '/bonos':'/'">
					{{ appName }}
				</b-navbar-brand>
			</div>
			<NuxtLink
			v-if="!isAuthenticated && showLogin === true"
			v-b-tooltip.hover
			class="btn btn-outline-light p-2"
			d-flex
			to="/login"
			title="Entrar"
			>
				<b-icon icon="door-closed" />
			</NuxtLink>
		</div>
		<b-navbar-nav v-if="isAuthenticated && showLogin === true" class="ml-auto">
			<b-nav-item-dropdown right>
				<template #button-content>
					<span class="lead">
						{{ nombreCompleto }}
					</span>
				</template>
				<b-dropdown-item @click="verPerfil">
					Perfil <b-icon icon="gear" />
				</b-dropdown-item>
				<b-dropdown-item @click="salir">
					Salir <b-icon icon="door-open" />
				</b-dropdown-item>
			</b-nav-item-dropdown>
		</b-navbar-nav>
		<b-toast
			id="notif-toast"
			v-model="toastShow"
			variant="info"
			solid="solid"
			auto-hide-delay="hideDelay"
			@hidden="toStart"
			>
			{{ mensaje }}
		</b-toast>
	</b-navbar>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
	props: {
		showAccess: Boolean,
		showLogin: Boolean
	},
	data () {
		return {
			appName: process.env.appName,
			toastShow: false,
			mensaje: '',
			hideDelay: 2500,
			solid: true
		}
	},
	computed: {
		...mapGetters([
			'getFullUserName'
		]),
		isAuthenticated () {
			return this.$store.getters.getUserValid
		},
		nombreCompleto () {
			if (this.isAuthenticated === true) {
				return this.getFullUserName
			} else {
				return ''
			}
		},
		user () {
			return this.$store.state.user
		}
	},
	methods: {
		...mapMutations([
			'clearUser'
		]),
		salir () {
			this.mensaje = '¡Adiós! ' + this.getFullUserName
			this.clearUser()
			this.$auth.$storage.removeLocalStorage('token')
			this.toastShow = true
		},
		verPerfil () {
			this.$router.push({ name: 'login-perfil' })
		},
		toStart () {
			this.$router.push('/')
		}
	}
}
</script>
