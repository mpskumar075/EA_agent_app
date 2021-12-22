<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md q-mb-md nice-shadow-18">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-md-8 col-12 ">
                            <div class="">
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col">
                                        <div class="text-h6 text-primary">{{ $t('user_registration') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 comp-grid">
                            <div class="">
                                <div class=""><div class="text-center"><q-btn     :rounded="false"  no-caps  unelevated    color="primary" icon="account_box" to="/"> {{ $t('login') }}</q-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-card>
</template>
<section class="page-section q-mb-md">
    <div class="container">
        <div class="row q-col-gutter-x-md">
            <div class="col-md-9 col-12 comp-grid">
                <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-18">
                    <div>
                        <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startSaveRecord()" @reset="resetForm">
                            <div class="row q-col-gutter-x-md">
                                <div class="col-md-6 col-12">
                                    {{ $t('first_name') }} *
                                    <div id="ctrl-first_name-holder"> 
                                        <check-duplicate v-model="formData.first_name" check-path="components_data/users_first_name_exist/" v-slot="checker">
                                        <ValidationProvider :rules="{required:true}" :name="$t('first_name')" v-slot="{ errors, invalid, validated }">
                                            <q-input outlined dense  ref="ctrlfirst_name" @blur="checker.check" :loading="checker.loading" v-model="formData.first_name"  :label="$t('first_name')" type="text" :placeholder="$t('enter_first_name')"   list="first_name_list"    
                                            class="" :error="(invalid && validated) || checker.exist" :error-message="errors[0] || $t('not_available')">
                                            </q-input>
                                            <datalist id="first_name_list">
                                            <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                            </datalist>
                                        </ValidationProvider>
                                        </check-duplicate>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    {{ $t('last_name') }} 
                                    <div id="ctrl-last_name-holder"> 
                                        <ValidationProvider :rules="{}" :name="$t('last_name')" v-slot="{ errors, invalid, validated }">
                                            <q-input outlined dense  ref="ctrllast_name" v-model="formData.last_name"  :label="$t('last_name')" type="text" :placeholder="$t('enter_last_name')"   list="last_name_list"    
                                            class="" :error="invalid && validated" :error-message="errors[0]">
                                            </q-input>
                                            <datalist id="last_name_list">
                                            <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                            </datalist>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div class="col-12">
                                    {{ $t('phone_number') }} *
                                    <div id="ctrl-telephone-holder"> 
                                        <ValidationProvider :rules="{required:true}" :name="$t('phone_number')" v-slot="{ errors, invalid, validated }">
                                            <q-input outlined dense  ref="ctrltelephone" v-model="formData.telephone"  :label="$t('phone_number')" type="text" :placeholder="$t('enter_phone_number')"   list="telephone_list"    
                                            class="" :error="invalid && validated" :error-message="errors[0]">
                                            </q-input>
                                            <datalist id="telephone_list">
                                            <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                            </datalist>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div class="col-12">
                                    {{ $t('irda_agent_code') }} 
                                    <div id="ctrl-irda_code-holder"> 
                                        <ValidationProvider :rules="{}" :name="$t('irda_agent_code')" v-slot="{ errors, invalid, validated }">
                                            <q-input outlined dense  ref="ctrlirda_code" v-model="formData.irda_code"  :label="$t('irda_agent_code')" type="text" :placeholder="$t('enter_irda_agent_code')"   list="irda_code_list"    
                                            class="" :error="invalid && validated" :error-message="errors[0]">
                                            </q-input>
                                            <datalist id="irda_code_list">
                                            <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                            </datalist>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div class="col-12">
                                    {{ $t('user_role_id') }} 
                                    <div id="ctrl-user_role_id-holder"> 
                                        <api-data-source @loaded="response => mapOptionField(response, 'user_role_id')"  api-path="components_data/user_role_id_option_list"  :query-params="filters" v-slot="req">
                                            <ValidationProvider :rules="{}" :name="$t('user_role_id')" v-slot="{ errors, invalid, validated }">
                                                <q-select   :loading="req.loading"  outlined dense  ref="ctrluser_role_id" emit-value map-options  v-model="formData.user_role_id" :options="req.response" :label="$t('user_role_id')"  :error="invalid && validated" :error-message="errors[0]" >
                                                </q-select> 
                                            </ValidationProvider>
                                        </api-data-source>
                                    </div>
                                </div>
                            </div>
                            <div v-if="showSubmitButton" class="text-center q-my-md">
                                <q-btn    :rounded="false"  color="primary"  no-caps  unelevated   type="submit" :disabled="invalid" icon="send" :loading="saving">
                                    <q-spinner-oval slot="loading" /> {{ $t('submit') }}
                                </q-btn>
                            </div>
                        </ValidationObserver>
                        <slot :submit="submit" :saving="saving"></slot>
                    </div>
                </q-card>
            </div>
        </div>
    </div>
</section>
</div>
</template>
<script>
	import { PageMixin } from "../../mixins/page.js";
	import { AddPageMixin } from "../../mixins/addpage.js";
	import { UserregisterMixin } from "./userregistermixin.js";
	import { mapActions } from "vuex";
	export default {
		name: 'RegisterComponent',
		components: {
		},
		mixins: [PageMixin, AddPageMixin , UserregisterMixin],
		props:{
			pageName : {
				type : String,
				default : 'users',
			},
			routeName : {
				type : String,
				default : 'usersuserregister',
			},
			apiPath : {
				type : String,
				default : 'auth/register',
			},
		},
		data() {
            return {
				formData: {
					first_name: "", last_name: "", telephone: "", irda_code: "", user_role_id: "", 
				},
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return this.$t('add_new_users')
				}
			},
		},
		meta() {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions('users', ['saveRecord']),
			async startSaveRecord(){
				const isFormValid = await this.$refs.observer.validate();
				if(isFormValid){
					this.saving = true;
					let payload = this.normalizedFormData();
					let url = this.apiUrl;
					let data = { url, payload  }
					this.saveRecord(data).then((response) => {
						this.saving = false;
						this.resetForm();
						let registrationData = response.data;
						if (registrationData.token && registrationData.user) {
							this.$localStore.saveLoginData(registrationData, false);
							window.location = "/";
						}
						else{
							this.flashMsg(registrationData.message);
							this.navigateTo(registrationData.nextpage);
						}
					},
					 (response) => {
						this.saving = false;
						this.showPageRequestError(response);
					});
				}
			},
			resetForm (){
				this.formData = {first_name: "", last_name: "", telephone: "", irda_code: "", user_role_id: "", };
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
				this.$EventBus.$emit("resetForm");
			},
		},
		mounted() {
		},
	};
</script>
<style scoped>
</style>
