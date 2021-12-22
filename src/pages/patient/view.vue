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
                                        <div class="text-h6 text-primary">{{ $t('patient_details') }}</div>
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
                    <div class="col comp-grid">
                        <q-card  :flat="isSubPage" class=" nice-shadow-18">
                            <div>
                                <div class="relative-position" style="min-height:100px">
                                    <template v-if="!loading && item">
                                        <div class="row q-col-gutter-x-md">
                                            <div class="col">
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('patient_id') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.patient_id }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('first_name') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.first_name }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('last_name') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.last_name }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('phone_number') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.phone_number }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('policy_doc') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.policy_doc }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('hospital_invoice') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.hospital_invoice }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('status') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.status }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('photo') }}: </q-item-label>
                                                        <q-item-label class="text-bold">
                                                            <image-viewer image-size="large" image-preview-size="" :src="item.photo" width="400px" height="400px" :num-display="1">
                                                            </image-viewer>
                                                        </q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('category') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.category }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('agent_id') }}: </q-item-label>
                                                        <q-item-label class="text-bold">
                                                            <q-btn v-if="item.agent_id" @click="openPageDialog({ page: 'users/view', url: `/users/view/${item.agent_id}` }, { closeBtn: true })" padding="xs" color="blue-1" unelevated text-color="blue" no-caps >
                                                                <q-icon name="visibility" size="xs"  class="q-mr-xs"></q-icon>  {{ $t('users_detail') }}
                                                            </q-btn>
                                                        </q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('amount') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.amount }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('date_added') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.date_added }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-card-actions class="row q-col-gutter-xs justify-end">
                                                    <q-btn icon="menu" padding="xs" round flat color="grey">
                                                        <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                            <q-list dense rounded nav>
                                                                <q-item link clickable v-ripple :to="`/patient/edit/${item.patient_id}`">
                                                                    <q-item-section>
                                                                        <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                    </q-item-section>
                                                                    <q-item-section>{{ $t('edit') }}</q-item-section>
                                                                </q-item>
                                                                <q-item link clickable v-ripple @click="deleteItem(item.patient_id)">
                                                                    <q-item-section>
                                                                        <q-icon color="negative"  size="sm" name="clear"></q-icon>
                                                                    </q-item-section>
                                                                    <q-item-section>{{ $t('delete') }}</q-item-section>
                                                                </q-item>
                                                            </q-list>
                                                        </q-menu>
                                                    </q-btn>
                                                </q-card-actions>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="loading">
                                        <div class="q-pa-sm text-center">
                                            <q-inner-loading :showing="loading">
                                                <q-spinner :size="40" color="primary" indeterminate></q-spinner>
                                            </q-inner-loading>
                                        </div>
                                    </template>
                                </div>
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
	import { ViewPageMixin } from "../../mixins/viewpage.js";
	import { ViewMixin } from "./viewmixin.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'viewPatientPage',
		components: {
		},
		mixins: [PageMixin, ViewPageMixin , ViewMixin],
		props: {
			pageName: {
				type : String,
				default : 'patient',
			},
			idName: {
				type: String,
				default: 'patient_id',
			},
			routeName : {
				type : String,
				default : 'patientview',
			},
			pagePath: {
				type : String,
				default : 'patient/view',
			},
			apiPath: {
				type : String,
				default : 'patient/view',
			},
		},
		data() {
            return {
				item: {
					default :{
					},
				},
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return this.$t('patient_details')
				}
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
		methods: {
			...mapActions("patient", [ "fetchRecord", "deleteRecord"]),
		},
		watch: {
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
	};
</script>
<style scoped>
</style>
