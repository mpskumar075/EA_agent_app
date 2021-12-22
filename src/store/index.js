import Vue from 'vue'
import Vuex from 'vuex'
import { pageComponents } from "./page_components.js"
import { auth } from "./auth.js"
import { users } from "./users.js"
import { patient } from "./patient.js"
import { categories } from "./categories.js"
import { roles } from "./roles.js"
import { permissions } from "./permissions.js"
Vue.use(Vuex)
export default function (/* { ssrContext } */) {
	const Store = new Vuex.Store({
		modules: {
			pageComponents,
			auth,
		users,
		patient,
		categories,
		roles,
		permissions
		},
		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	})
	return Store
}