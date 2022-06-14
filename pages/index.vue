<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<b-jumbotron class="my-4">
					<template #header>{{ siteName }}</template>
					<template #lead>{{ siteFullName }}</template>
					<hr class="my-4">
					<p>
						Para acceder, debe ingresar sus credenciales de usuario {{ siteName }} o solicitarlas a la secretaría de producción del GRACCS en caso que no las tenga.
					</p>
					<NuxtLink to="/login" class="btn btn-primary p-2">
						Entrar <b-icon icon="door-closed"></b-icon>
					</NuxtLink>
				</b-jumbotron>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	layout: 'minima',
	computed: {
		siteName () {
			return process.env.appName.toUpperCase()
		},
		siteFullName () {
			return process.env.appFullName
		}
	}
}
</script>
