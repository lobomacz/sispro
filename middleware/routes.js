export default function ({ store, route }) {
	store.commit({
		type: 'setRoute',
		route: route.path,
		name: route.name
	})
}
