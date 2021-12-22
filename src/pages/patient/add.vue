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
                                        <div class="text-h6 text-primary">{{ $t('add_new_patient') }}</div>
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
                                        <div class="col-sm-6 col-12">
                                            {{ $t('first_name') }} 
                                            <div id="ctrl-first_name-holder"> 
                                                <ValidationProvider :rules="{}" :name="$t('first_name')" v-slot="{ errors, invalid, validated }">
                                                    <q-input outlined dense  ref="ctrlfirst_name" v-model="formData.first_name"  :label="$t('first_name')" type="text" :placeholder="$t('enter_first_name')"   list="first_name_list"    
                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                    </q-input>
                                                    <datalist id="first_name_list">
                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                    </datalist>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 col-12">
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
                                            {{ $t('phone_number') }} 
                                            <div id="ctrl-phone_number-holder"> 
                                                <ValidationProvider :rules="{}" :name="$t('phone_number')" v-slot="{ errors, invalid, validated }">
                                                    <q-input outlined dense  ref="ctrlphone_number" v-model="formData.phone_number"  :label="$t('phone_number')" type="text" :placeholder="$t('enter_phone_number')"   list="phone_number_list"    
                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                    </q-input>
                                                    <datalist id="phone_number_list">
                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                    </datalist>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            {{ $t('category') }} 
                                            <div id="ctrl-category-holder"> 
                                                <api-data-source @loaded="response => mapOptionField(response, 'category')"  api-path="components_data/category_option_list"  :query-params="filters" v-slot="req">
                                                    <ValidationProvider :rules="{}" :name="$t('category')" v-slot="{ errors, invalid, validated }">
                                                        <q-select   :loading="req.loading"  outlined dense  ref="ctrlcategory" emit-value map-options  v-model="formData.category" :options="req.response" :label="$t('category')"  :error="invalid && validated" :error-message="errors[0]" >
                                                        </q-select> 
                                                    </ValidationProvider>
                                                </api-data-source>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            {{ $t('amount') }} 
                                            <div id="ctrl-amount-holder"> 
                                                <ValidationProvider :rules="{}" :name="$t('amount')" v-slot="{ errors, invalid, validated }">
                                                    <q-input outlined dense  ref="ctrlamount" v-model="formData.amount"  :label="$t('amount')" type="number" :placeholder="$t('enter_amount')"   step="any" list="amount_list"    
                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                    </q-input>
                                                    <datalist id="amount_list">
                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                    </datalist>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            {{ $t('policy_doc') }} 
                                            <div id="ctrl-policy_doc-holder"> 
                                                <ValidationProvider :rules="{}" :name="$t('policy_doc')" v-slot="{ errors, invalid, validated }">
                                                    <div class="q-mb-sm">
                                                        <q-uploader-input :max-files="3" :max-file-size="100" accept=".docx,.doc,.xls,.xlsx,.xml,.csv,.pdf,.xps" :multiple="false" square flat bordered style="width:100%" :label="$t('choose_files_or_drop_files_here')" upload-path="fileuploader/upload/policy_doc" v-model="formData.policy_doc"></q-uploader-input>
                                                        <small class="q-pa-sm text-negative" v-if="invalid && validated">{{errors[0]}}</small>
                                                    </div>
                                                    <!--policy_docDropOptions-->
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            {{ $t('hospital_invoice') }} 
                                            <div id="ctrl-hospital_invoice-holder"> 
                                                <ValidationProvider :rules="{}" :name="$t('hospital_invoice')" v-slot="{ errors, invalid, validated }">
                                                    <div class="q-mb-sm">
                                                        <q-uploader-input :max-files="1" :max-file-size="3" accept=".docx,.doc,.xls,.xlsx,.xml,.csv,.pdf,.xps" :multiple="false" square flat bordered style="width:100%" :label="$t('choose_files_or_drop_files_here')" upload-path="fileuploader/upload/hospital_invoice" v-model="formData.hospital_invoice"></q-uploader-input>
                                                        <small class="q-pa-sm text-negative" v-if="invalid && validated">{{errors[0]}}</small>
                                                    </div>
                                                    <!--hospital_invoiceDropOptions-->
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center q-my-md">
                                        <q-btn type="submit"    :rounded="false"  color="primary"  no-caps  unelevated   :disabled="invalid" icon="send" :loading="saving">
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
	import { AddMixin } from "./addmixin.js";
	import { mapActions } from "vuex";
	export default {
		name: 'addPatientPage',
		components: {
		},
		mixins: [PageMixin, AddPageMixin , AddMixin],
		props:{
			pageName : {
				type : String,
				default : 'patient',
			},
			routeName : {
				type : String,
				default : 'patientadd',
			},
			apiPath : {
				type : String,
				default : 'patient/add',
			},
		},
		data() {
            return {
				formData: {
					first_name: "", last_name: "", phone_number: "", category: "", amount: "", policy_doc: "", hospital_invoice: "", 
				},
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return this.$t('add_new_patient')
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions('patient', ['saveRecord']),
			async startSaveRecord(){
				const isFormValid = await this.$refs.observer.validate();
				if(isFormValid){
					this.saving = true;
					let payload = this.normalizedFormData();
					let url = this.apiUrl;
					let data = { url, payload  }
					this.saveRecord(data).then((response) => {
						this.record = response.data ?? {};
						this.id = this.record['patient_id'] ?? null;
						this.saving = false;
						this.resetForm();
						this.closeDialogs();// close page dialog that if opened
						this.flashMsg(this.msgAfterSave);
						this.$emit("submitted", this.record);
						if(this.redirect) this.navigateTo(`/patient`);
					},
					 (response) => {
						this.saving = false;
						this.showPageRequestError(response);
					});
				}
			},
			resetForm (){
				this.formData = {first_name: "", last_name: "", phone_number: "", category: "", amount: "", policy_doc: "", hospital_invoice: "", };
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
				this.updateFormData();
				this.$EventBus.$emit("resetForm");
			},
		},
		mounted() {
		},
	};
</script>
<style scoped>
</style>
