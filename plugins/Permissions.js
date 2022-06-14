export default (context, inject) => {
	inject ('permissions', async (perm) => {
		const has_perm = await context.app.$axios.$get('has_perm/', { perm })
		return has_perm
	})
}