<template>
    <q-page class="main-page">
        <section class="page-section q-mb-md">
            <div class="container-fluid">
                <div class="row justify-center q-col-gutter-md">
                    <div class="col-12 col-sm-6 col-md-3 comp-grid">
                        <q-card  :flat="isSubPage" class="q-mt-lg nice-shadow-18">
                            <div>
                                <q-card-section>
                                    <div class="text-h5 text-bold text-primary">
                                        <q-icon name="account_circle"></q-icon> {{ $t('user_login') }}
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-px-lg">
                                    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startLogin()" @reset="resetForm">
                                        <q-input class="q-mb-md" :label="$t('email')" outlined dense :placeholder="$t('email')" v-model="user.username"  required="required" type="text" >
                                        <template v-slot:prepend>
                                            <q-icon name="account_circle"></q-icon>
                                        </template>
                                        </q-input>
                                        <q-input :label="$t('password')"  class="q-mb-md" outlined dense :placeholder="$t('password')" required="required" v-model="user.password" type="password">
                                        <template v-slot:prepend>
                                            <q-icon name="lock"></q-icon>
                                        </template>
                                        </q-input>
                                        <div class="row q-mb-md">
                                            <div class="col-6">
                                                <q-checkbox v-model="rememberUser"> {{ $t('remember_me') }}</q-checkbox>
                                            </div>
                                            <div class="col-6">
                                                <q-btn to="/index/forgotpassword" class="text-danger" flat no-caps color="negative"> {{ $t('reset_password') }}</q-btn>
                                            </div>
                                        </div>
                                        <transition appear enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
                                            <q-banner dense  inline-actions rounded  class="bg-red-2 q-my-md" v-if="errorMsg">
                                                <template v-slot:avatar>
                                                    <q-icon color="red" name="error"></q-icon>
                                                </template>
                                                {{ errorMsg.toString() }}
                                                <template v-slot:action>
                                                    <q-btn @click="errorMsg = ''" dense flat icon="close" />
                                                    </template>
                                                </q-banner>
                                                </transition>
                                                <div class="text-center">
                                                    <q-btn unelevated :loading="loading" color="primary" no-caps :disabled="invalid" icon="lock_open" class="full-width"  type="submit"> 
                                                        {{ $t('login') }} 
                                                    </q-btn>
                                                </div>
                                                <q-separator class="q-my-md"></q-separator>
                                                <div class="row q-my-sm">
                                                    <div class="col text-caption">
                                                        <div class=" text-caption q-pa-sm">{{ $t('dont_have_an_account') }}</div>
                                                    </div>
                                                    <div class="col-auto text-right">
                                                        <q-btn unelevated icon="account_box" no-caps color="positive" class="full-width" to="/index/register">{{ $t('register') }}
                                                        </q-btn>
                                                    </div>
                                                </div>
                                            </ValidationObserver>
                                        </q-card-section>
                                    </div>
                                </q-card>
                            </div>
                        </div>
                    </div>
                </section>
            </q-page>
</template>
<script>
	import { mapActions } from "vuex";
	export default {
		name: 'IndexComponent',
		components: {
		},
		data: function() {
			return {
				user: {
					username: '',
					password:'',
				},
				rememberUser: false,
				loading: false,
				ready: false,
				errorMsg : '',
			}
		},
		methods: {
			...mapActions('auth', ['login']),
			startLogin (){
				this.loading = true;
				this.errorMsg = '';
				let formData = this.user;
				let rememberUser = this.rememberUser
				let payload = {
					formData,
					rememberUser	
				};
				this.login(payload).then((response) => {
					this.loading = false;
					let loginData = response.data;
					if (loginData.token) {
						let nextUrl = this.$route.query.nexturl || '/'
						this.$router.go(nextUrl);
					}
					else{
						this.$router.push(loginData.nextpage);
					}
				},
					(request) => {
					this.loading = false;
					this.errorMsg = request.response.data || "Unable to login";
				});
			},
			resetForm (){
				this.user = {
					username: '',
					password:''
				};
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
			},
		},
		mounted:function(){
			this.ready = true;
		}
	};
</script>
<style scoped></style>
