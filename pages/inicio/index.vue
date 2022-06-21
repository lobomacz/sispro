<template>
	<b-container fluid class="vh-100">
		<b-row class="h-100 align-items-center">
			<b-col cols="8" class="mx-auto">
				<b-card
				id="error-card"
				:header="appName"
				:title="fullName"
				:sub-title="officeName"
				class="text-center"
				bg-variant="light"
				border-variant="secondary"
				>
					<b-container>
						<b-row class="mt-4">
							<b-col cols="3" />
							<b-col cols="2">
								<b-img src="~/assets/img/GRACCS.png" />
							</b-col>
							<b-col cols="2">
								<b-img src="~/assets/img/INTA.png" />
							</b-col>
							<b-col cols="2">
								<b-img src="~/assets/img/MEFCCA.png" />
							</b-col>
							<b-col cols="3" />
						</b-row>
					</b-container>
					<template #footer>
						<p class="fw-light">
							&copy; {{ appOwner }} &mdash; {{ year }}
						</p>
					</template>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>
export default {
	data () {
		return {
			appName: process.env.appName.toUpperCase(),
			fullName: process.env.appFullName,
			officeName: process.env.officeName,
			appOwner: process.env.appOwner,
			year: this.$moment().format('YYYY')
		}
	}
}
</script>
<style scoped>
img {
  width: 10rem;
}
</style>
