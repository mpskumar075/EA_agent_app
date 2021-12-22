<template>
    <div class="main-page">
        <section class="page-section q-mb-md">
            <div class="">
                <div class="row q-col-gutter-x-md">
                    <div class=" col-12 comp-grid">
                        <div class="">
                            <api-data-source   api-path="components_data/patient_data_component" :first-record="true" :query-params="filters" v-slot="req">
                                <q-card class="bg-primary text-white q-pa-md">
                                    <q-card-section class="text-center">
                                        <div><q-icon name="account_box" size="50px" /></div>
                                        <div class="text-h6">{{$User.first_name}} {{$User.last_name}}</div>
                                        <div class="text-h6">Agent Code: GA00{{$User.user_id}}</div>
                                        <div class="q-mt-sm">
                                            <q-btn outline label="Share Code" icon="share" href="https://wa.me/919820272106?text=Use%20my%20agent%20code%201001%20to%20sing-up%20on%20the%20Easyaspatall%20platform.%20" />
                                            </div>
                                        </q-card-section>
                                        <template v-if="!req.loading">
                                            <q-card-section class="text-center">
                                                <div class="row">
                                                    <div class="col">{{ req.response.newcount }} New</div>
                                                    <div class="col">{{ req.response.disburssedcount }} Disburssed</div>
                                                    <div class="col">{{ req.response.inprogresscount }} In Progress</div>
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
            <template v-if="showHeader">
                <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md nice-shadow-18">
                    <div class="container-fluid">
                        <div class="row justify-between q-col-gutter-md">
                            <div class="col-md-auto col-12 ">
                                <q-input debounce="1000" outlined dense  :placeholder="$t('search')" v-model="searchText">
                                <template v-slot:append>
                                    <q-icon name="search"></q-icon>
                                </template>
                                </q-input>
                            </div>
                        </div>
                    </div>
                </q-card>
            </template>
            <section class="page-section q-mb-md">
                <div class="container-fluid">
                    <div class="row q-col-gutter-x-md">
                        <div class="col comp-grid">
                            <div>
                                <q-chip v-if="searchText" icon="search" removable @remove="searchText='';$route.query.search=''">
                                {{ $t('search') }}: <strong class="q-ml-sm"> {{ searchText }} </strong>
                                </q-chip>
                            </div>
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
                                                                        <q-chip dense color="info" v-if="props.row.status=='New'">{{ props.row.status }}</q-chip>
                                                                        <q-chip dense color="amber" v-if="props.row.status=='In Progress'">{{ props.row.status }}</q-chip>
                                                                        <q-chip dense color="positive" v-if="props.row.status=='Disburssed'">{{ props.row.status }}</q-chip>
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
	import { PageMixin } from "../../mixins/page.js";
	import { ListPageMixin } from "../../mixins/listpage.js";
	import { ListMixin } from "./listmixin.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'listPatientPage',
		components: {
        },
		mixins: [PageMixin, ListPageMixin , ListMixin],
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
				default : 'patientlist',
			},
			apiPath : {
				type : String,
				default : 'patient/index',
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
