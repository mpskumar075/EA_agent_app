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
                                        <div class="text-h6 text-primary">{{ $t('my_account') }}</div>
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
                        <div class="">
                            <div>
                                <div class="relative-position" style="min-height:100px">
                                    <div class="row q-col-gutter-x-md">
                                        <div class="col">
                                            <template v-if="!loading && item">
                                                <div v-if="!loading">
                                                    <q-card class="q-pa-lg q-mb-md nice-shadow-18">
                                                        <div class="row q-col-gutter-lg">
                                                            <div class="col-auto">
                                                                <q-avatar class="q-mr-sm" size="50px" color="grey-3" text-color="primary" icon="account_box" />
                                                                </div>
                                                                <div class="col">
                                                                    <div class="text-h4 text-primary"> {{ $UserName }} </div>
                                                                    <div class="text-caption"> {{ $UserEmail }} </div>
                                                                </div>
                                                            </div>
                                                        </q-card>
                                                        <div class="row q-col-gutter-md">
                                                            <div class="col-md-2 col-sm-3 col-12">
                                                                <q-card   :flat="isSubPage" class="nice-shadow-18">
                                                                    <q-tabs vertical class="text-primary" dense v-model="tab" no-caps inline-label>
                                                                        <q-tab name="accountview" icon="account_box" :label="$t('account_detail')" style="justify-content:initial" />
                                                                        <q-tab name="accountedit" icon="edit" :label="$t('edit_account')" style="justify-content:initial" />
                                                                        <q-tab name="changepassword" icon="lock" :label="$t('change_password')" style="justify-content:initial" />
                                                                    </q-tabs>
                                                                </q-card>
                                                            </div>
                                                            <div class="col-md-10 col-sm-9 col-12">
                                                                <q-card   :flat="isSubPage" class="nice-shadow-18 q-pa-sm">
                                                                    <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
                                                                        <q-tab-panel name="accountview">
                                                                            <div v-if="!loading && ready">
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
                                                                                        <q-item-label caption>{{ $t('telephone') }}: </q-item-label>
                                                                                        <q-item-label class="text-bold">{{ item.telephone }}</q-item-label>
                                                                                    </q-item-section>
                                                                                </q-item>
                                                                                <q-separator></q-separator>
                                                                                <q-item>
                                                                                    <q-item-section>
                                                                                        <q-item-label caption>{{ $t('email') }}: </q-item-label>
                                                                                        <q-item-label class="text-bold">{{ item.email }}</q-item-label>
                                                                                    </q-item-section>
                                                                                </q-item>
                                                                                <q-separator></q-separator>
                                                                                <q-item>
                                                                                    <q-item-section>
                                                                                        <q-item-label caption>{{ $t('irda_code') }}: </q-item-label>
                                                                                        <q-item-label class="text-bold">{{ item.irda_code }}</q-item-label>
                                                                                    </q-item-section>
                                                                                </q-item>
                                                                                <q-separator></q-separator>
                                                                                <q-item>
                                                                                    <q-item-section>
                                                                                        <q-item-label caption>{{ $t('user_role_id') }}: </q-item-label>
                                                                                        <q-item-label class="text-bold">
                                                                                            <q-btn v-if="item.user_role_id" @click="openPageDialog({ page: 'roles/view', url: `/roles/view/${item.user_role_id}` }, { closeBtn: true })" padding="xs" color="blue-1" unelevated text-color="blue" no-caps >
                                                                                                <q-icon name="visibility" size="xs"  class="q-mr-xs"></q-icon>  {{ $t('roles_detail') }}
                                                                                            </q-btn>
                                                                                        </q-item-label>
                                                                                    </q-item-section>
                                                                                </q-item>
                                                                                <q-separator></q-separator>
                                                                            </div>
                                                                            <div v-if="loading" class="q-pa-sm text-center">
                                                                                <q-spinner :size="40" color="accent" indeterminate></q-spinner>
                                                                                {{ $t('loading') }}
                                                                            </div>
                                                                        </q-tab-panel>
                                                                        <q-tab-panel name="accountedit">
                                                                            <div class="reset-grid">
                                                                                <account-edit-page></account-edit-page>
                                                                                </div>
                                                                            </q-tab-panel>
                                                                            <q-tab-panel name="changepassword">
                                                                                <change-password-page></change-password-page>
                                                                            </q-tab-panel>
                                                                        </q-tab-panels>
                                                                    </q-card>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <div  class="q-pa-lg text-center">
                                                            <q-spinner :size="50" color="accent" indeterminate></q-spinner>
                                                            {{ $t('loading') }}
                                                        </div>
                                                    </template>
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
	import { ViewPageMixin } from "../../mixins/viewpage.js";
	import { AccountviewMixin } from "./accountviewmixin.js";
	import  AccountEditPage  from "./accountedit.vue";
	import  ChangePasswordPage  from "./changepassword.vue";
	export default {
		name: 'accountviewUsersPage',
		components: {
			AccountEditPage,
			ChangePasswordPage,
		},
		mixins: [PageMixin, ViewPageMixin , AccountviewMixin],
		props: {
			pageName: {
				type : String,
				default : 'users',
			},
			routeName : {
				type : String,
				default : 'usersaccountview',
			},
			pagePath: {
				type : String,
				default : 'account',
			},
			apiPath: {
				type : String,
				default : 'account',
			},
		},
		data() {
            return {
				item: {
					default :{
					},
				},
				tab: 'accountview',
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return this.$t('my_account')
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
				title: this.pageTitle
			}
		},
		methods: {
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
