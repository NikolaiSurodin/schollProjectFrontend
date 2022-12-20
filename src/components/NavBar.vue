<template>
    <b-nav tabs align="center">
        <b-nav-item
                class="m-3"
                :active="$route.fullPath === '/list'"
                @click="toList"
        >
            Список заявок
        </b-nav-item>
        <b-nav-item
                class="m-3"
                @click="createRequest"
                v-if="!getIsAdmin"
                :active="$route.fullPath === '/new-request'"
        >
            Создать новую заявку
        </b-nav-item>
        <AddManagerModal class="m-3" v-if="getIsAdmin" />

        <b-nav-item class="m-3" disabled>
            {{ _.get( getMe, 'responsible_full_name', 'ADMIN' ) }}.
            Комания: {{ _.get( getMe, 'company_name', 'admin' ) }}
        </b-nav-item>

        <b-nav-item
                class="m-3"
                @click="sendLogout"
                v-if="getIsLoggedIn"
                active
        >
            Выйти
        </b-nav-item>
    </b-nav>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddManagerModal from '@/components/AddManagerModal.vue'

export default {
    name: 'NavBar',
    components: {
        AddManagerModal
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters( [ 'getMe', 'getIsAdmin', 'getIsLoggedIn' ] )
    },
    methods: {
        ...mapActions( [ 'sendLogout' ] ),
        createRequest() {
            this.$emit( 'click' )
        },
        toList() {
            this.$router.push( '/list' )
        }
    }
}
</script>

<style scoped>

</style>