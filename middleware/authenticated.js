export default function ({ app, store, redirect }) {
	if (!store.getters.getUserValid) {
		if (app.$auth.$storage.getLocalStorage('token')) {
			const loginTime = app.$moment(app.$auth.$storage.getLocalStorage('loginTime'))
			const now = app.$moment()
			if (now.diff(loginTime, 'days') >= 1) {
				return redirect('/login')
			} else {
				store.dispatch('reloadUser', { token: app.$auth.$storage.getLocalStorage('token'), router: app.$router })
			}
		} else {
			return redirect('/login')
		}
	}
}
