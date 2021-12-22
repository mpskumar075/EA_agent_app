<template>
    <div class="main-page">
        <section class="page-section ">
            <div class="">
                <div class="row ">
                    <div class="col comp-grid">
                        <div class="">
                            <api-data-source   api-path="components_data/patient_data_component_2" :first-record="true" :query-params="filters" v-slot="req">
                                <q-card class="nice-shadow-6">
                                    <template v-if="!req.loading">
                                        <q-card-section class="text-center">
                                            <div class="row">
                                                <div class="col">
                                                    <q-btn no-caps unelevated color="white" text-color="primary" class="full-width nice-shadow-6" stacked>Current Month 
                                                        <br />
                                                        <span class="text-grey">{{ req.response.current_month }}</span>
                                                    </q-btn>
                                                </div>
                                                <div class="col">
                                                    <q-btn no-caps unelevated color="white" text-color="primary" class="full-width nice-shadow-6" stacked>Current Year <br />
                                                        <span class="text-grey">{{ req.response.current_year }}</span>
                                                    </q-btn>
                                                </div>
                                                <div class="col">
                                                    <q-btn no-caps unelevated color="white" text-color="primary" class="full-width nice-shadow-6" stacked>Total Revenue
                                                        <br />
                                                        <div class="text-grey">{{ req.response.total }}</div>
                                                    </q-btn>
                                                </div>
                                            </div>
                                        </q-card-section>
                                    </template>
                                    <template v-else>
                                        <q-card-section class="text-center"> <q-spinner size="30px" /></q-card-section>
                                    </template>
                                </q-card>
                            </api-data-source>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section q-mb-md">
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div class="col comp-grid">
                        <q-card  :flat="isSubPage" class=" nice-shadow-18">
                            <div class="q-pa-md">
                                <div class="text-weight-bold text-h5">Revenue Overview</div>
                                <div class="text-caption">Total revenue by month</div>
                                <q-separator class="q-my-md"></q-separator>
                                <div class="row q-col-gutter-sm">
                                    <div class="col">
                                        <api-data-source   api-path="components_data/barchart_revenueoverview"  :query-params="filters" v-slot="req">
                                            <div style="position:relative;text-align:center">
                                                <q-inner-loading :showing="req.loading">
                                                    <q-spinner-pie color="accent" size="5em" />
                                                </q-inner-loading>
                                                <vue-chart :chart-design="[{backgroundColor: 'rgba(0 , 128 , 192, 0.5)', borderColor: '--RandomColor--', borderWidth: '0'}
                                                ]" :chart-data="req.response" chart-type="bar" ></vue-chart>
                                            </div>
                                        </api-data-source>
                                    </div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section q-mb-md">
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div class="col-12 comp-grid">
                        <div class="">
                            <div>
                                <template v-if="showBreadcrumbs && $route.query.tag">
                                    <q-breadcrumbs class="q-pa-md">
                                        <q-breadcrumbs-el icon="arrow_back" class="text-capitalize" :label="$route.query.tag" to="/patient"></q-breadcrumbs-el>
                                        <q-breadcrumbs-el :label="$route.query.label"></q-breadcrumbs-el>
                                    </q-breadcrumbs>
                                </template>
                                <div class="relative-position">
                                    <div class="row q-col-gutter-md">
                                        <!-- Master Page Start -->
                                        <div class="col">
                                            <template >
                                                <q-table :loading="loading" hide-bottom  grid card-container-class="q-col-gutter-md justify-start" 
                                                :columns="$menus.PatientTableHeaderItems" 
                                                :data="records" 
                                                row-key="patient_id" 
                                                :pagination.sync="pagination"
                                                @request="setPagination" 
                                                :no-data-label="$t('no_record_found')">
                                                <template v-slot:item="props">
                                                    <div class="col-12">
                                                        <q-card :bordered="false" class="nice-shadow-6">
                                                            <q-item clickable :active="isCurrentRecord(props.row)" active-class="bg-blue-1">
                                                                <q-item-section  avatar>
                                                                    <q-avatar text-color="primary" v-ripple @click="navigateTo(`/patient/view/${props.row.patient_id}`)" class="cursor-pointer"  size="50px">
                                                                        <q-img v-if="props.row.photo" :ratio="1/1" :src="$utils.setImgUrl(props.row.photo, 'medium')">
                                                                        <template v-slot:error>
                                                                            <div class="absolute-full text-bold flex flex-center bg-grey-3 text-grey-8">!</div>
                                                                        </template>
                                                                        </q-img>
                                                                        <q-icon v-else name="account_circle" size="50px" />
                                                                    </q-avatar>
                                                                </q-item-section>
                                                                <q-item-section v-ripple @click="navigateTo(`/patient/view/${props.row.patient_id}`)">
                                                                    <q-item-label class="text-primary text-bold cursor-pointer" lines="2">
                                                                        {{ props.row.first_name }}
                                                                        {{ props.row.last_name }}
                                                                    </q-item-label>
                                                                    <q-item-label class="text-caption" lines="2">{{ props.row.date_added|relativeDate }}</q-item-label>
                                                                </q-item-section>
                                                                <q-item-section side right>
                                                                    <q-chip dense color="negative" text-color="white">{{ props.row.category }}</q-chip>
                                                                </q-item-section>
                                                                <q-item-section side right>
                                                                    <q-chip dense> &#x20B9; {{ props.row.amount }}</q-chip>
                                                                </q-item-section>
                                                            </q-item>
                                                        </q-card>
                                                    </div>
                                                </template>
                                                </q-table>
                                            </template>
                                            <template v-if="loading">
                                                <div v-show="loading" class="load-indicator text-center text-grey q-pa-lg">
                                                    <q-spinner color="primary" size="30px"> 
                                                    </q-spinner>
                                                    {{ $t('loading') }}
                                                </div>
                                            </template>
                                            <template v-if="!loading && !records.length">
                                                <q-card :flat="$q.screen.gt.md">
                                                    <q-card-section>
                                                        <div class="text-grey text-h6 text-center">
                                                            {{ $t('no_record_found') }}
                                                        </div>
                                                    </q-card-section>
                                                </q-card>
                                            </template>
                                            <div v-if="showFooter" class="">
                                                <div class="row q-col-gutter-md justify-between">
                                                    <div class="col-md-auto">
                                                        <div class="row q-col-gutter-md">
                                                            <div>
                                                                <q-btn    :rounded="false"  no-caps  unelevated   color="negative" padding="xs" @click="deleteItem(selectedItems)" v-if="selectedItems.length" icon="delete_sweep" class="q-my-xs" :title="$t('delete_selected')"></q-btn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="q-pa-sm q-my-md text-center">
                                                            <q-btn v-if="canLoadMore && totalPages > 1" @click="load" glossy  flat :rounded="false"  size=""  color="primary" no-caps  unelevated >  {{ $t('load_more') }} 
                                                            </q-btn>
                                                            <div  class="text-caption" v-if="finishedLoading && records.length > recordCount">{{ $t('no_more_content_to_load') }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
	import VueChart from '../../components/VueCharts.vue'
	import { PageMixin } from "../../mixins/page.js";
	import { ListPageMixin } from "../../mixins/listpage.js";
	import { RevenueMixin } from "./revenuemixin.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'revenuePatientPage',
		components: {
			VueChart,
        },
		mixins: [PageMixin, ListPageMixin , RevenueMixin],
		props: {
			primaryKey : {
				type : String,
				default : 'patient_id',
			},
			pageName : {
				type : String,
				default : 'patient',
			},
			routeName : {
				type : String,
				default : 'patientrevenue',
			},
			apiPath : {
				type : String,
				default : 'patient/revenue',
			},
			multiCheckbox: {
				type: Boolean,
				default: true,
			},
			msgBeforeDelete: {
				type: String,
				default: function(){ return this.$t('are_you_sure_you_want_to_delete_this_record'); },
			},
		},
		data() {
            return {
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					//set browser page title
					return this.$t('patient')
				}
			},
			records: {
				get: function () {
					return this.$store.getters["patient/records"];
				},
				set: function (value) {
					this.$store.commit("patient/setRecords", value);
				},
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["patient/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("patient/setCurrentRecord", value);
				},
			},
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		watch: {
			filters: {
				handler: function (newValue, oldValue) {
					this.reload();
				},
				deep: true 
			},
			searchText: function(){
				this.reload();
			},
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
		methods: {
			...mapActions("patient", ["fetchRecords", "deleteRecord"]),
			load: function () {
			if (this.canLoadMore) {
				this.loading = true;
				this.currentRecord = null;
				let url = this.apiUrl;
				let payload = {
					url,
					merge: true
				}
				this.fetchRecords(payload).then(
					(response) => {
						this.loading = false;
						this.ready = true;
						this.totalRecords = response.total_records;
						this.recordCount = response.record_count;
						this.pagination.rowsNumber = this.totalRecords;
						this.pagination.page++;
					},
					(response) => {
						this.loading = false;
						this.showPageRequestError(response);
					}
				);
			}
        },
		},
	};
</script>
<style scoped>
</style>
