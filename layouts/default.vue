<template>
	<div class="container-fluid">
		<SisproTop :show-access="true" :show-login="true" />
		<Sidebar />
		<Nuxt />
	</div>
</template>
<script>
export default {
	middleware: ['authenticated', 'routes']
}
</script>
