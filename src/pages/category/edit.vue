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
                                        <div class="text-h6 text-primary">{{ $t('edit_category') }}</div>
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
                                                                {{ $t('title') }} 
                                                            </div>
                                                            <div class="col-sm-9 col-12">
                                                                <ValidationProvider :rules="{}" :name="$t('title')" v-slot="{ errors, invalid, validated }">
                                                                    <q-input outlined dense  ref="ctrltitle" v-model="formData.title"  :label="$t('title')" type="text" :placeholder="$t('enter_title')"   list="title_list"    
                                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                                    </q-input>
                                                                    <datalist id="title_list">
                                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                                    </datalist>
                                                                </ValidationProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-12">
                                                                {{ $t('description') }} 
                                                            </div>
                                                            <div class="col-sm-9 col-12">
                                                                <ValidationProvider :rules="{}" :name="$t('description')" v-slot="{ errors, invalid, validated }">
                                                                    <q-input outlined dense  ref="ctrldescription" v-model="formData.description"  :label="$t('description')" type="text" :placeholder="$t('enter_description')"   list="description_list"    
                                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                                    </q-input>
                                                                    <datalist id="description_list">
                                                                    <option v-for="(menu, index) in $menus.first_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                                    </datalist>
                                                                </ValidationProvider>
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
	import { mapActions } from "vuex";
	export default {
		name: 'editCategoryPage',
		components: {
		},
		mixins: [PageMixin, EditPageMixin ],
		props: {
			pageName: {
				type: String,
				default: 'category',
			},
			idName: {
				type: String,
				default: 'category_id',
			},
			routeName: {
				type: String,
				default: 'categoryedit',
			},
			pagePath: {
				type : String,
				default : 'category/edit',
			},
			apiPath: {
				type: String,
				default: 'category/edit',
			},
		},
		data() {
            return {
				formData: {
					title: "", description: "", 
				},
        	}
		},
		computed: {
			pageTitle:{
				get: function () {
					return this.$t('edit_category')
				}
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["category/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("category/setCurrentRecord", value);
				},
			},
		},
		meta () {
			return {
				title: this.pageTitle // set browser page title
			}
		},
		methods: {
			...mapActions('category', ['updateRecord', 'fetchRecord']),
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
							if(this.redirect) this.navigateTo(`/category`);
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
				this.formData = {title: "", description: "", };
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
