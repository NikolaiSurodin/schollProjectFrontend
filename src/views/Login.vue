<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <form>
                <b-row class="justify-content-center">
                    <b-col md="6">
                        <b-card-group>
                            <b-card no-body class="p-4">
                                <b-card-body>
                                    <b-form>
                                        <h1>Войти</h1>
                                        <b-input-group class="mb-3">

                                            <b-form-input
                                                    type="email"
                                                    class="form-control"
                                                    placeholder="Почта"
                                                    autocomplete="email"
                                                    v-model="user.email"
                                            />
                                        </b-input-group>
                                        <b-input-group class="mb-4">
                                            <b-form-input
                                                    type="password"
                                                    class="form-control"
                                                    placeholder="Пароль"
                                                    autocomplete="current-password"
                                                    v-model="user.password"
                                            />
                                        </b-input-group>
                                        <b-row>
                                            <b-col cols="6">
                                                <b-button
                                                        :disabled="!user.email || !user.password"
                                                        variant="primary"
                                                        class="px-4"
                                                        @click="login"
                                                >
                                                    Войти
                                                </b-button>
                                            </b-col>
                                            <router-link
                                                    class="text-muted mt-5"
                                                    to="/register"
                                            >
                                                Зарегистрировать компанию и оставить заявку на проект.
                                            </router-link>
                                        </b-row>
                                    </b-form>
                                </b-card-body>
                            </b-card>
                        </b-card-group>
                    </b-col>
                </b-row>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert'

export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapGetters( [ 'getIsAdmin' ] )
    },

    methods: {
        ...mapActions( [ 'sendLogin' ] ),
        login() {
            if( this.user.email || this.user.password ) {
                this.sendLogin( this.user )
                    .catch( ( err ) => {
                        swal( 'Произошла ошибка', err.body.message, 'error' )
                    } )
            }
        }
    }
}
</script>

<style lang="scss">
.app,
{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  background-color: #e4e5e6 !important;
}
</style>