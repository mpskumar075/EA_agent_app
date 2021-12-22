
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
let routes = [
	{
		name: 'main',
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			//Dashboard routes


//users routes
			{ 
				path: '/users/', 
				name: 'userslist', 
				component: () => import('pages/users/list.vue'), 
				props: true
			},
			{ 
				path: '/users/(list|index)/:fieldName?/:fieldValue?', 
				name: 'userslistfilter', 
				component: () => import('pages/users/list.vue'), 
				props: true
			},
	
			{ 
				path: '/users/view/:id', 
				name: 'usersview', 
				component: () => import('pages/users/view.vue'), 
				props: true
			},
	
			{ 
				path: '/index/register', 
				name: 'usersuserregister', 
				component: () => import('pages/index/userregister.vue'), 
				props: true
			},
	
			{ 
				path: '/account/edit', 
				name: 'usersaccountedit', 
				component: () => import('pages/account/accountedit.vue'), 
				props: true
			},
	
			{ 
				path: '/account', 
				name: 'usersaccountview', 
				component: () => import('pages/account/accountview.vue'), 
				props: true
			},
	
			{ 
				path: '/users/add', 
				name: 'usersadd', 
				component: () => import('pages/users/add.vue'), 
				props: true
			},
	
			{ 
				path: '/users/edit/:id', 
				name: 'usersedit', 
				component: () => import('pages/users/edit.vue'), 
				props: true
			},
		

//patient routes
			{ 
				path: '/patient/', 
				name: 'patientlist', 
				component: () => import('pages/patient/list.vue'), 
				props: true
			},
			{ 
				path: '/patient/(list|index)/:fieldName?/:fieldValue?', 
				name: 'patientlistfilter', 
				component: () => import('pages/patient/list.vue'), 
				props: true
			},
	
			{ 
				path: '/patient/view/:id', 
				name: 'patientview', 
				component: () => import('pages/patient/view.vue'), 
				props: true
			},
	
			{ 
				path: '/patient/add', 
				name: 'patientadd', 
				component: () => import('pages/patient/add.vue'), 
				props: true
			},
	
			{ 
				path: '/patient/edit/:id', 
				name: 'patientedit', 
				component: () => import('pages/patient/edit.vue'), 
				props: true
			},
		
			{ 
				path: '/patient/revenue', 
				name: 'patientrevenue', 
				component: () => import('pages/patient/revenue.vue'), 
				props: true
			},
	

//admin routes

//categories routes
			{ 
				path: '/categories/', 
				name: 'categorieslist', 
				component: () => import('pages/categories/list.vue'), 
				props: true
			},
			{ 
				path: '/categories/(list|index)/:fieldName?/:fieldValue?', 
				name: 'categorieslistfilter', 
				component: () => import('pages/categories/list.vue'), 
				props: true
			},
	
			{ 
				path: '/categories/view/:id', 
				name: 'categoriesview', 
				component: () => import('pages/categories/view.vue'), 
				props: true
			},
	
			{ 
				path: '/categories/add', 
				name: 'categoriesadd', 
				component: () => import('pages/categories/add.vue'), 
				props: true
			},
	
			{ 
				path: '/categories/edit/:id', 
				name: 'categoriesedit', 
				component: () => import('pages/categories/edit.vue'), 
				props: true
			},
		

//roles routes
			{ 
				path: '/roles/', 
				name: 'roleslist', 
				component: () => import('pages/roles/list.vue'), 
				props: true
			},
			{ 
				path: '/roles/(list|index)/:fieldName?/:fieldValue?', 
				name: 'roleslistfilter', 
				component: () => import('pages/roles/list.vue'), 
				props: true
			},
	
			{ 
				path: '/roles/view/:id', 
				name: 'rolesview', 
				component: () => import('pages/roles/view.vue'), 
				props: true
			},
	
			{ 
				path: '/roles/add', 
				name: 'rolesadd', 
				component: () => import('pages/roles/add.vue'), 
				props: true
			},
	
			{ 
				path: '/roles/edit/:id', 
				name: 'rolesedit', 
				component: () => import('pages/roles/edit.vue'), 
				props: true
			},
		

//permissions routes
			{ 
				path: '/permissions/', 
				name: 'permissionslist', 
				component: () => import('pages/permissions/list.vue'), 
				props: true
			},
			{ 
				path: '/permissions/(list|index)/:fieldName?/:fieldValue?', 
				name: 'permissionslistfilter', 
				component: () => import('pages/permissions/list.vue'), 
				props: true
			},
	
			{ 
				path: '/permissions/view/:id', 
				name: 'permissionsview', 
				component: () => import('pages/permissions/view.vue'), 
				props: true
			},
	
			{ 
				path: '/permissions/add', 
				name: 'permissionsadd', 
				component: () => import('pages/permissions/add.vue'), 
				props: true
			},
	
			{ 
				path: '/permissions/edit/:id', 
				name: 'permissionsedit', 
				component: () => import('pages/permissions/edit.vue'), 
				props: true
			},
		

			
//Password reset routes
			{ 
				path: '/index/forgotpassword', 
				name: 'forgotpassword', 
				component: () => import('pages/index/forgotpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword', 
				name: 'resetpassword', 
				component: () => import('pages/index/resetpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword_completed', 
				name: 'resetpassword_completed', 
				component: () => import('pages/index/resetpassword_completed.vue'), 
				props: true
			},
	
			
			
			{ 
				path:  '/error/forbidden', 
				name: 'forbidden', 
				component: () => import('pages/errors/forbidden.vue'),
				props: true
			},
			{ 
				path: '/error/notfound', 
				name: 'notfound',
				component: () => import('pages/errors/pagenotfound.vue'),
				props: true
			}
		]
	},
];


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default async function ({ store, ssrContext }) {
	let mainRoute = routes.find(x => x.name = "main");

	
	let loginToken = store.getters["auth/getLoginToken"];
	if(loginToken){
		try{
			await store.dispatch('auth/getUserData'); //get current user data from api on page load

			mainRoute.children.push({ 
				path: '/(home)?', 
				name: 'home', 
				component: () => import('pages/home/home.vue'),
				props: true
			});
		}
		catch(e){
			/*
			 * getting current user detail failed
			 * token must be invalid
			*/
			mainRoute.children.push({ 
				path: '/(index)?', 
				name: 'index', 
				component: () => import('pages/index/index.vue') ,
				props: true
			});
		}
	}
	else{
		/*
		 * user has not loggedIn
		 * show login page
		*/
		mainRoute.children.push({ path: '/(index|home)?', name: 'index', component: () => import('pages/index/index.vue') });
	}


	// Always leave this as last one
	if (process.env.MODE !== 'ssr') {
		mainRoute.children.push({path: '*', component: () => import('pages/errors/pagenotfound.vue')});
	}

	const Router = new VueRouter({
		scrollBehavior: () => ({ x: 0, y: 0 }),
		routes,
		// Leave these as they are and change in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE
	});
	return Router
}
