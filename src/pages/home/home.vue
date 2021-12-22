<template>
    <q-page  class="main-page">
        <section class="page-section q-pa-md">
            <div class="container-fluid">
                <div class="row q-col-gutter-x-md">
                    <div class="col comp-grid">
                        <div class="">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-bold">{{ $t('dashboard') }}</div>
                                </div>
                            </div>
                        </div>
                        <q-separator class="q-my-sm"></q-separator>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section q-mb-md">
            <div class="container-fluid">
                <div class="row q-col-gutter-x-sm">
                    <div class="col-md-6 col comp-grid">
                        <div class="">
                            <api-data-source   api-path="components_data/home_data_component" :first-record="true" :query-params="filters" v-slot="req">
                                <q-card class="nice-shadow-6 q-pa-sm">
                                    <template v-if="!req.loading">
                                        <div class="row q-col-gutter-x-md">
                                            <div class="col-auto">
                                                <q-avatar icon="supervisor_account" color="blue-1" text-color="primary" />
                                                </div>
                                                <div class="col">
                                                    <div class="text-bold"><span class="text-grey">{{req.response.totalpatient}}</span> Patient</div>
                                                    <div class="text-bold"><span class="text-grey">{{req.response.newpatient}}</span> New</div>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <q-card-section class="text-center"> <q-spinner size="30px" /></q-card-section>
                                        </template>
                                    </q-card>
                                </api-data-source>
                            </div>
                        </div>
                        <div class="col-md-6 col comp-grid">
                            <div class="">
                                <api-data-source   api-path="components_data/home_data_component_sum" :first-record="true" :query-params="filters" v-slot="req">
                                    <q-card class="nice-shadow-6 q-pa-sm">
                                        <template v-if="!req.loading">
                                            <div class="row q-col-gutter-x-md">
                                                <div class="col-auto">
                                                    <q-avatar icon="supervisor_account" color="blue-1" text-color="primary" />
                                                    </div>
                                                    <div class="col">
                                                        <div class="text-bold"><span class="text-grey">{{req.response.totalrevenue}}</span> Total</div>
                                                        <div class="text-bold"><span class="text-grey">{{req.response.revenue_this_month}}</span> Dec</div>
                                                    </div>
                                                </div>
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
                                        <div class="text-weight-bold text-h5">Patient Referred</div>
                                        <div class="text-caption">In the last 7 days</div>
                                        <q-separator class="q-my-md"></q-separator>
                                        <div class="row q-col-gutter-sm">
                                            <div class="col">
                                                <api-data-source   api-path="components_data/barchart_patientreferred"  :query-params="filters" v-slot="req">
                                                    <div style="position:relative;text-align:center">
                                                        <q-inner-loading :showing="req.loading">
                                                            <q-spinner-pie color="accent" size="5em" />
                                                        </q-inner-loading>
                                                        <vue-chart :chart-design="[{backgroundColor: 'rgba(0 , 128 , 192, 0.5)', borderColor: 'rgba(0 , 128 , 192, 1)', borderWidth: '3'}
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
                            <div class="col comp-grid">
                                <q-btn   padding="lg"    :rounded="false"  size="lg" color="primary" no-caps  unelevated push  :to="`/patient/add`" class="full-width">
                                    <q-icon name="local_hospital"></q-icon>                             
                                    {{ $t('add_patient') }} 
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="page-section q-mb-md">
                    <div class="container-fluid">
                        <div class="row q-col-gutter-x-md">
                            <div class="col comp-grid">
                                <q-btn   padding="lg"    :rounded="false"  size="lg" color="primary" no-caps  unelevated push  :to="`/patient/index`" class="full-width">
                                    <q-icon name="account_balance_wallet"></q-icon>                             
                                    {{ $t('revenue') }} 
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </section>
            </q-page>
</template>
<script>
	import VueChart from '../../components/VueCharts.vue'
	import { PageMixin } from "../../mixins/page.js";
	import { HomeMixin } from "./homemixin.js";
	export default {
		name: 'HomeComponent',
		components: {
			VueChart,
		},
		mixins: [PageMixin , HomeMixin],
		props: {
		},
		data: function() {
			return {
				ready: false,
			}
		},
		methods: {
		},
		mounted: function(){
			this.ready = true;
		}
	};
</script>
