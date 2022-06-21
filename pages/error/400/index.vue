<template>
	<b-container fluid class="vh-100">
		<b-row class="h-100 align-items-center">
			<b-col cols="8" class="mx-auto">
				<b-card
				id="error-card"
				header="Error"
				subtitle="Error Desconocido"
				class="text-center"
				bg-variant="light"
				border-variant="secondary"
				>
					<p class="display-3">
						¡Error 400!
					</p>
					<p>Ocurrió un error al procesar su solicitud.</p>
					<p>Verifique los datos y vuelva a intentarlo.</p>
					<p>Si el problema persiste, póngase en contacto con el admin del sistema.</p>
					<b-link to="/inicio">
						Regresar
					</b-link>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>
export default {
	layout: 'light'
}
</script>
