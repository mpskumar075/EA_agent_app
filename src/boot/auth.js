
import { utils } from '../utils';
const publicPages = ['/', '/index', '/error']; //public which do not need authentation
const excludedRoutes = []; //all pages which do not need authentation
const roleAbilities = {
  "administrator": [],
  "user": []
};
export default async({ Vue, store, router }) => {
	let user = store.state.auth.user;
	let userRoleNames = store.state.auth.userRoles;
	let userPages = store.state.auth.userPages;

	if(user){
		Vue.prototype.$isLoggedIn = true;
		Vue.prototype.$User = user;
		Vue.prototype.$UserPages = userPages;
		Vue.prototype.$UserRoleNames = userRoleNames;
		Vue.prototype.$UserName = user.first_name;
		Vue.prototype.$UserID = user.user_id;
		Vue.prototype.$UserEmail = user.email;
		Vue.prototype.$UserPhoto = null;;
	}
	else{
		Vue.prototype.$isLoggedIn = false;
	}

	const canView = function(path){
		let routePath = utils.getRoutePath(path);
		return userPages.includes(routePath);
	}

	const canManage = function(page, userRecId){
		let userRole = userRoleNames[0];
		let userRoleAbilities = roleAbilities[userRole] || [];
		if (userRoleAbilities.includes(page)){
			return true;
		}
		return userRecId == user.user_id;
	}

	const isOwner = function(userRecId){
		return userRecId == user.user_id;
	}

	Vue.prototype.$can = {view: canView, manage: canManage, isOwner: isOwner};

	
	router.beforeEach((to, from, next) => {
		let path = to.path;
		
		let pagePath = utils.getPagePath(path);
		let routePath = utils.getRoutePath(path);

		let authRequired = true;
		if(publicPages.includes(pagePath) || excludedRoutes.includes(routePath)){
			authRequired = false;
		}

		//authenticate user
		if (authRequired && !user) {
			return next({ path: '/',  query: { nexturl: to.fullPath } });
		}

		//navigate to redirect url if available
		if(to.name == "home" && to.query.nexturl){
			return next({ path: to.query.nexturl});
		}

		next();
	});

}
