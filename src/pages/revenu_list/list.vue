<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md nice-shadow-18">
                <div class="container-fluid">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="">
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col">
                                        <div class="text-h6 text-primary">{{ $t('revenu_list') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <q-breadcrumbs-el icon="arrow_back" class="text-capitalize" :label="$route.query.tag" to="/revenu_list"></q-breadcrumbs-el>
                                        <q-breadcrumbs-el :label="$route.query.label"></q-breadcrumbs-el>
                                    </q-breadcrumbs>
                                </template>
                                <div class="relative-position">
                                    <div class="row q-col-gutter-md">
                                        <!-- Master Page Start -->
                                        <div class="col">
                                            <template >
                                                <q-table :loading="loading" hide-bottom  grid card-container-class="" 
                                                :columns="$menus.PatientTableHeaderItems" 
                                                :data="records" 
                                                row-key="revenue_id" 
                                                :pagination.sync="pagination"
                                                @request="setPagination" 
                                                :no-data-label="$t('no_record_found')">
                                                <template v-slot:item="props">
                                                    <div class="col-12">
                                                        <q-card :bordered="false" class="nice-shadow-18 nice-shadow-18">
                                                            <q-item clickable :active="isCurrentRecord(props.row)" active-class="bg-blue-1">
                                                                <q-item-section  avatar>
                                                                    <q-avatar v-ripple @click="navigateTo(`/revenu_list/view/${props.row.revenue_id}`)" class="cursor-pointer"  size="50px">
                                                                        <q-img :ratio="1/1" :src="$utils.setImgUrl(props.row.photo, 'medium')">
                                                                        <template v-slot:error>
                                                                            <div class="absolute-full text-bold flex flex-center bg-grey-3 text-grey-8">!</div>
                                                                        </template>
                                                                        </q-img>
                                                                    </q-avatar>
                                                                </q-item-section>
                                                                <q-item-section v-ripple @click="navigateTo(`/revenu_list/view/${props.row.revenue_id}`)">
                                                                    <q-item-label class="text-primary text-bold cursor-pointer" lines="2">{{ props.row.patient_names }}</q-item-label>
                                                                    <q-item-label class="text-caption" lines="2">{{ props.row.category }}</q-item-label>
                                                                    <q-item-label caption>{{ props.row.amount }} </q-item-label>
                                                                </q-item-section>
                                                                <q-item-section side top class="text-right">
                                                                    <q-card-actions class="row q-col-gutter-xs justify-end">
                                                                        <q-btn icon="menu" padding="xs" round flat color="grey">
                                                                            <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                                                <q-list dense rounded nav>
                                                                                    <q-item link clickable v-ripple :to="`/revenu_list/view/${props.row.revenue_id}`">
                                                                                        <q-item-section>
                                                                                            <q-icon color="primary"  size="sm" name="visibility"></q-icon>
                                                                                        </q-item-section>
                                                                                        <q-item-section>{{ $t('view') }}</q-item-section>
                                                                                    </q-item>
                                                                                </q-list>
                                                                            </q-menu>
                                                                        </q-btn>
                                                                    </q-card-actions>
                                                                </q-item-section>
                                                            </q-item>
                                                        </q-card>
                                                    </div>
                                                </template>
                                                </q-table>
                                            </template>
                                            <template v-if="loading">
                                                <q-inner-loading :showing="loading">
                                                    <q-spinner color="primary" size="30px"> 
                                                    </q-spinner>
                                                </q-inner-loading>
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
                                                <div class="q-pa-sm" v-show="!loading">
                                                    <div class="row justify-between">
                                                        <div class="row q-col-gutter-md">
                                                        </div>
                                                        <div v-if="paginate && totalRecords > 0" class="row q-col-gutter-md justify-center">
                                                            <div class="col-auto">
                                                                <q-chip>{{ $t('records') }} {{recordsPosition}} {{ $t('of') }} {{totalRecords}}</q-chip>
                                                            </div>
                                                            <div v-if="totalPages > 1">
                                                                <q-pagination  color="primary" flat glossy  input v-model="pagination.page" :direction-links="true" :boundary-links="true" :max-pages="5" :boundary-numbers="true" :max="totalPages"></q-pagination>
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
            </div>
        </section>
    </div>
</template>
<script>
	import { PageMixin } from "../../mixins/page.js";
	import { ListPageMixin } from "../../mixins/listpage.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'listRevenulistPage',
		components: {
        },
		mixins: [PageMixin, ListPageMixin ],
		props: {
			primaryKey : {
				type : String,
				default : '',
			},
			pageName : {
				type : String,
				default : 'revenu_list',
			},
			routeName : {
				type : String,
				default : 'revenu_listlist',
			},
			apiPath : {
				type : String,
				default : 'revenu_list/index',
			},
			multiCheckbox: {
				type: Boolean,
				default: false,
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
					return this.$t('revenu_list')
				}
			},
			records: {
				get: function () {
					return this.$store.getters["revenu_list/records"];
				},
				set: function (value) {
					this.$store.commit("revenu_list/setRecords", value);
				},
			},
			currentRecord: {
				get: function () {
					return this.$store.getters["revenu_list/currentRecord"];
				},
				set: function (value) {
					this.$store.commit("revenu_list/setCurrentRecord", value);
				},
			},
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		watch: {
			apiUrl: function () {
				this.load();
			},
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
		methods: {
			...mapActions("revenu_list", ["fetchRecords", "deleteRecord"]),
			load: function() {
				if (!this.loading) {
					this.loading = true;
					this.currentRecord = null;
					let url = this.apiUrl;
					let payload = {
						url,
						merge: false
					}
					this.fetchRecords(payload).then(
						(response) => {
							this.loading = false;
							this.ready = true;
							this.totalRecords = response.total_records;
							this.recordCount = response.record_count;
							this.pagination.rowsNumber = this.totalRecords;
							window.scrollTo(0, 0);
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
