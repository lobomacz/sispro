export const state = () => ({
	user: null,
	token: '',
	activeRoute: '/',
	routeName: '',
	prevRoute: '',
	prevRouteName: '',
	placeholders: {
		cedula: '000111111222AA',
		telefono: '8888-8888'
	},
	messages: {
		required: 'Este campo es obligatorio.',
		emailField: 'El valor debe ser un email válido.',
		alphaNum: 'El campo solo admite caracteres alfanuméricos.',
		decimal: 'El valor debe ser un número con decimales.',
		integer: 'El valor debe ser un número entero.',
		noFutureDate: 'La fecha no puede ser mayor que hoy.'
	}
})

export const mutations = {
	setUser (state, payload) {
		const { token, ...rest } = payload.user
		state.user = rest
		state.token = token
		this.$axios.setToken(token, 'Token') // Agregado para mantener autenticación
	},
	setRoute (state, payload) {
		if (state.activeRoute === '/' || state.activeRoute === '/login') {
			state.activeRoute = payload.route
			state.routeName = payload.name
		} else {
			state.prevRoute = state.activeRoute
			state.prevRouteName = state.routeName
			state.activeRoute = payload.route
			state.routeName = payload.name
		}
	},
	clearUser (state) {
		state.user = null
		state.token = ''
		this.$axios.setToken(false)
	}
}

export const actions = {
	async reloadUser ({ commit }, payload) {
		this.$axios.setToken(payload.token, 'Token')
		const router = payload.router
		const user = await this.$axios.$get('me/refresh/')
		if (user === null || user === undefined) {
			router.push({ name: 'login' })
		}
		user.token = payload.token
		commit('setUser', { user })
	}
}

export const getters = {
	getToken (state) {
		return state.token
	},
	getUserValid (state) {
		return state.token !== '' && state.user != null
	},
	getFullUserName (state, getters) {
		if (getters.getUserValid) {
			return state.user.first_name + ' ' + state.user.last_name
		} else {
			return ''
		}
	},
	getUser (state) {
		return state.user
	},
	getPlaceholders (state) {
		return state.placeholders
	},
	getMessages (state) {
		return state.messages
	},
	getRouteName (state) {
		return state.routeName
	},
	getPreviousRoute (state) {
		return state.prevRoute
	}
}
