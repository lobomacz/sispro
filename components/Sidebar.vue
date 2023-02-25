<template>
	<div>
		<b-sidebar
		id="sidebar"
		title="Menú"
		shadow
		@hidden="onHidden"
		>
			<div class="accordion" role="tablist">
				<b-card no-body class="mb-1">
					<b-card-header v-b-toggle.mnu-programas header-tag="header" class="p-1 text-light bg-info" role="tab">
						<div class="text-uppercase pl-2">
							<b-icon class="mx-2" icon="briefcase" /> Programas
						</div>
					</b-card-header>
					<b-collapse id="mnu-programas" accordion="mi-menu" :visible="menuModel.programas" role="tabpanel">
						<b-card-body>
							<b-list-group>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/programas')">
									Lista
								</b-list-group-item>
							</b-list-group>
						</b-card-body>
					</b-collapse>
				</b-card>
				<b-card no-body class="mb-1">
					<b-card-header header-tag="header" class="p-1 text-light bg-info" role="tab">
						<div v-b-toggle.mnu-proyectos class="text-uppercase pl-2">
							<b-icon class="mx-2" icon="card-checklist" /> Proyectos
						</div>
					</b-card-header>
					<b-collapse id="mnu-proyectos" accordion="mi-menu" :visible="menuModel.proyectos" role="tabpanel">
						<b-card-body>
							<b-list-group>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/proyectos')">
									Lista
								</b-list-group-item>
							</b-list-group>
						</b-card-body>
					</b-collapse>
				</b-card>
				<b-card no-body class="mb-1">
					<b-card-header header-tag="header" class="p-1 text-light bg-info" role="tab">
						<div v-b-toggle.mnu-protagonistas class="text-uppercase pl-2">
							<b-icon class="mx-2" icon="people" /> Protagonistas
						</div>
					</b-card-header>
					<b-collapse id="mnu-protagonistas" accordion="mi-menu" :visible="menuModel.protagonistas" role="tabpanel">
						<b-card-body>
							<b-list-group>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/protagonistas')">
									Lista
								</b-list-group-item>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/protagonistas/form/')">
									Nuevo
								</b-list-group-item>
							</b-list-group>
						</b-card-body>
					</b-collapse>
				</b-card>
				<b-card no-body class="mb-1">
					<b-card-header header-tag="header" class="p-1 text-light bg-info" role="tab">
						<div v-b-toggle.mnu-bonos class="text-uppercase pl-2">
							<b-icon class="mx-2" icon="box-seam" /> Bonos
						</div>
					</b-card-header>
					<b-collapse id="mnu-bonos" accordion="mi-menu" :visible="menuModel.bonos" role="tabpanel">
						<b-card-body>
							<b-list-group>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/bonos')">
									Lista
								</b-list-group-item>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/bonos/form/')">
									Nuevo
								</b-list-group-item>
							</b-list-group>
						</b-card-body>
					</b-collapse>
				</b-card>
				<b-card no-body class="mb-1">
					<b-card-header header-tag="header" class="p-1 text-light bg-info" role="tab">
						<div v-b-toggle.mnu-planes class="text-uppercase pl-2">
							<b-icon class="mx-2" icon="hammer" /> Planes de Inversion
						</div>
					</b-card-header>
					<b-collapse id="mnu-planes" accordion="mi-menu" :visible="menuModel.planes" role="tabpanel">
						<b-card-body>
							<b-list-group>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/planes')">
									Lista
								</b-list-group-item>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/planes/form/')">
									Nuevo
								</b-list-group-item>
							</b-list-group>
						</b-card-body>
					</b-collapse>
				</b-card>
				<b-card no-body class="mb-1">
					<b-card-header header-tag="header" class="p-1 text-light bg-info" role="tab">
						<div v-b-toggle.mnu-mapas class="text-uppercase pl-2">
							<b-icon class="mx-2" icon="map" /> Mapas
						</div>
					</b-card-header>
					<b-collapse id="mnu-mapas" accordion="mi-menu" :visible="menuModel.mapas" role="tabpanel">
						<b-card-body>
							<b-list-group>
								<b-list-group-item class="btn btn-outline-secondary" @click="itemClick('/mapas/planes')">
									Planes de Inversión
								</b-list-group-item>
							</b-list-group>
						</b-card-body>
					</b-collapse>
				</b-card>
			</div>
		</b-sidebar>
	</div>
</template>
<script>
export default {
	data () {
		return {
			activeRoute: this.$store.getters.getRouteName,
			menuModel: {
				programas: false,
				proyectos: false,
				protagonistas: false,
				bonos: false,
				planes: false,
				mapas: false
			}
		}
	},
	computed: {
		menuItem () {
			if (this.activeRoute.includes('-')) {
				const items = this.activeRoute.split('-')
				return items[1].toLowerCase()
			} else {
				return ''
			}
		}
	},
	mounted () {
		this.setActiveMenu()
	},
	methods: {
		onHidden (event) {
			this.setActiveMenu()
		},
		setActiveMenu () {
			const activeMenu = this.activeRoute.split('-')[0].toLowerCase()
			for (const model in this.menuModel) {
				if (model === activeMenu) {
					this.menuModel[model] = true
				} else {
					this.menuModel[model] = false
				}
			}
		},
		itemClick (ruta) {
			this.$router.push(ruta)
		}
	}
}
</script>
