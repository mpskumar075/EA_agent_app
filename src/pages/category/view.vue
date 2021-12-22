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
                                        <div class="text-h6 text-primary">{{ $t('category_details') }}</div>
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
                                                        <q-item-label caption>{{ $t('category_id') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.category_id }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('title') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.title }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-item>
                                                    <q-item-section>
                                                        <q-item-label caption>{{ $t('description') }}: </q-item-label>
                                                        <q-item-label class="text-bold">{{ item.description }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                                <q-separator></q-separator>
                                                <q-card-actions class="row q-col-gutter-xs justify-end">
                                                    <q-btn icon="menu" padding="xs" round flat color="grey">
                                                        <q-menu auto-close transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                            <q-list dense rounded nav>
                                                                <q-item link clickable v-ripple :to="`/category/edit/${item.category_id}`">
                                                                    <q-item-section>
                                                                        <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                    </q-item-section>
                                                                    <q-item-section>{{ $t('edit') }}</q-item-section>
                                                                </q-item>
                                                                <q-item link clickable v-ripple @click="deleteItem(item.category_id)">
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
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'viewCategoryPage',
		components: {
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'category',
			},
			idName: {
				type: String,
				default: 'category_id',
			},
			routeName : {
				type : String,
				default : 'categoryview',
			},
			pagePath: {
				type : String,
				default : 'category/view',
			},
			apiPath: {
				type : String,
				default : 'category/view',
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
					return this.$t('category_details')
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
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions("category", [ "fetchRecord", "deleteRecord"]),
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
