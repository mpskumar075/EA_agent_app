<template>
    <div class="container">
        <q-card class="q-my-lg text-center nice-shadow-1">
            <q-card-section>
                <q-icon size="60px" color="warning" name="account_box"></q-icon> 
                <div class="text-h4 text-bold text-warning q-my-md">
                     {{ $t('your_account_is_waiting_for_review') }}
                </div>
                <div class="text-grey">
                    {{ $t('please_contact_the_system_administrator_for_more_information') }}
                </div>
                <q-separator class="q-my-md" />
                <q-btn to="/" no-caps unelevated icon="home" color="primary">{{ $t('continue') }}</q-btn>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
	export default {
		props: {},
		data: function () {
			return {
			};
		},
		methods: {},
	};
</script>