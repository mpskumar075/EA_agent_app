<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md nice-shadow-18">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="">
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col">
                                        <div class="text-h6 text-primary">{{ $t('edit_users') }}</div>
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
                                <template v-if="!loading">
                                    <div class="row  q-col-gutter-x-md">
                                        <div class="col">
                                            <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startRecordUpdate()">
                                                <!--[form-content-start]-->
                                                <div class="row q-col-gutter-x-md">
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('first_name') }} *
                                                            </div>
                                                            <div class="col-sm-9 col-12">
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
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('last_name') }} 
                                                            </div>
                                                            <div class="col-sm-9 col-12">
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
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('telephone') }} *
                                                            </div>
                                                            <div class="col-sm-9 col-12">
                                                                <ValidationProvider :rules="{required:true}" :name="$t('telephone')" v-slot="{ errors, invalid, validated }">
                                                                    <q-input outlined dense  ref="ctrltelephone" v-model="formData.telephone"  :label="$t('telephone')" type="text" :placeholder="$t('enter_telephone')"   list="telephone_list"    
                                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                                    </q-input>
                                                                    <datalist id="telephone_list">
                                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                                    </datalist>
                                                                </ValidationProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('irda_code') }} 
                                                            </div>
                                                            <div class="col-sm-9 col-12">
                                                                <ValidationProvider :rules="{}" :name="$t('irda_code')" v-slot="{ errors, invalid, validated }">
                                                                    <q-input outlined dense  ref="ctrlirda_code" v-model="formData.irda_code"  :label="$t('irda_code')" type="text" :placeholder="$t('enter_irda_code')"   list="irda_code_list"    
                                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                                    </q-input>
                                                                    <datalist id="irda_code_list">
                                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                                    </datalist>
                                                                </ValidationProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('photo') }} 
                                                            </div>
                                                            <div class="col-sm-9 col-12">
                                                                <ValidationProvider :rules="{}" :name="$t('photo')" v-slot="{ errors, invalid, validated }">
                                                                    <div class="q-mb-sm">
                                                                        <q-uploader-input :max-files="1" :max-file-size="3" accept=".jpg,.png,.gif,.jpeg" :multiple="false" square flat bordered style="width:100%" :label="$t('choose_files_or_drop_files_here')" upload-path="fileuploader/upload/photo" v-model="formData.photo"></q-uploader-input>
                                                                        <small class="q-pa-sm text-negative" v-if="invalid && validated">{{errors[0]}}</small>
                                                                        <div class="q-pa-xs"><file-viewer removable v-model="formData.photo"></file-viewer></div>
                                                                    </div>
                                                                </ValidationProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('otp_code') }} 
                                                            </div>
                                                            <div class="col-sm-9 col-12">
                                                                <ValidationProvider :rules="{}" :name="$t('otp_code')" v-slot="{ errors, invalid, validated }">
                                                                    <q-input outlined dense  ref="ctrlotp_code" v-model="formData.otp_code"  :label="$t('otp_code')" type="text" :placeholder="$t('enter_otp_code')"   list="otp_code_list"    
                                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                                    </q-input>
                                                                    <datalist id="otp_code_list">
                                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                                    </datalist>
                                                                </ValidationProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('user_role_id') }} 
                                                            </div>
                                                            <div class="col-sm-9 col-12">
                                                                <api-data-source @loaded="response => mapOptionField(response, 'user_role_id')"  api-path="components_data/user_role_id_option_list"  :query-params="filters" v-slot="req">
                                                                    <ValidationProvider :rules="{}" :name="$t('user_role_id')" v-slot="{ errors, invalid, validated }">
                                                                        <q-select   :loading="req.loading"  outlined dense  ref="ctrluser_role_id" emit-value map-options  v-model="formData.user_role_id" :options="req.response" :label="$t('user_role_id')"  :error="invalid && validated" :error-message="errors[0]" >
                                                                        </q-select> 
                                                                    </ValidationProvider>
                                                                </api-data-source>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--[form-content-end]-->
                                                <div v-if="showSubmitButton" class="text-center q-my-md">
                                                    <q-btn    :rounded="false"  color="primary"  no-caps  unelevated   type="submit" :disabled="invalid" icon="send" :loading="saving">
                                                        <q-spinner-oval slot="loading" /> {{ $t('update') }}
                                                    </q-btn>
                                                </div>
                                            </ValidationObserver>
                                            <slot :submit="submit" :saving="saving"></slot>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="q-pa-sm text-center">
                                        <q-spinner :size="40" color="accent" indeterminate></q-spinner>
                                    </div>
                                </template>
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
	import { EditPageMixin } from "../../mixins/editpage.js";
	import { EditMixin } from "./editmixin.js";
	import { mapActions } from "vuex";
	export default {
		name: 'editUsersPage',
		components: {
		},
		mixins: [PageMixin, EditPageMixin , EditMixin],
		props: {
			pageName: {
				type: String,
				default: 'users',
			},
			idName: {
				type: String,
				default: 'user_id',
			},
			routeName: {
				type: String,
				default: 'usersedit',
			},
			pagePath: {
				type : String,
				default : 'users/edit',
			},
			apiPath: {
				type: String,
				default: 'users/edit',
			},
		},
		data() {
            return {
				formData: {
					first_name: "", last_name: "", telephone: "", irda_code: "", photo: "", otp_code: "", user_role_id: "", 
				},
        	}
		},
		computed: {
			pageTitle:{
				get: function () {
					return this.$t('edit_users')
				}
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["users/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("users/setCurrentRecord", value);
				},
			},
		},
		meta () {
			return {
				title: this.pageTitle // set browser page title
			}
		},
		methods: {
			...mapActions('users', ['updateRecord', 'fetchRecord']),
			async startRecordUpdate(){
				const isFormValid = await this.$refs.observer.validate();
				if(isFormValid){
					this.saving = true;
					let id = this.id;
					let url = this.apiUrl;
					let payload = this.normalizedFormData();
					let data = { id, url, payload }
					this.updateRecord(data).then(
						(response) => {
							this.saving = false;
							this.flashMsg(this.msgAfterUpdate);
							this.resetForm();
							this.closeDialogs();// close page dialog that if opened
							if(this.redirect) this.navigateTo(`/users`);
						},
						(response) => {
							this.saving = false;
							this.showPageRequestError(response);
						}
					);
				}
			},
			updateFormFields: function(){
				//update form fields value after load from api
				//e.g convert fieldvalue (value,value2,value2) to array 
            },
			resetForm (){
				//reset form fields value
				this.formData = {first_name: "", last_name: "", telephone: "", irda_code: "", photo: "", otp_code: "", user_role_id: "", };
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
				//raise event to reset other custom form components
				this.$EventBus.$emit("resetForm");
			},
		},
	};
</script>
<style scoped>
</style>
