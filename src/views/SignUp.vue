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
                                        <h1>Регистрация</h1>
                                        <b-input-group class="mb-3 flex-column">
                                            <label for="email">Email:</label>
                                            <b-form-input
                                                    type="email"
                                                    class="form-control w-100"
                                                    autocomplete="email"
                                                    id="email"
                                                    :required="true"
                                                    v-model="user.email"
                                            />
                                        </b-input-group>
                                        <b-input-group class="mb-3 flex-column">
                                            <label for="password">Пароль:</label>
                                            <b-form-input
                                                    type="password"
                                                    class="form-control w-100"
                                                    autocomplete="current-password"
                                                    id="password"
                                                    v-model="user.password"
                                            />
                                        </b-input-group>
                                        <b-card bg-variant="light">
                                            <b-form-group
                                                    label="Данные о Вашей компании:"
                                                    label-size="lg"
                                                    label-class="font-weight-bold pt-0"
                                                    class="mb-0"
                                            >
                                                <b-form-group
                                                        label="Полное наименование организации:"
                                                        label-for="nested-company"
                                                        label-align-sm="right"
                                                        class="mb-4"
                                                >
                                                    <b-form-input id="nested-company"
                                                                  v-model="user.company.company_name"></b-form-input>
                                                </b-form-group>

                                                <b-form-group
                                                        label="ИНН организации:"
                                                        label-for="nested-company-id"
                                                        class="mb-4"
                                                        label-align-sm="right"
                                                >
                                                    <b-form-input id="nested-company-id"
                                                                  v-model="user.company.INN"></b-form-input>
                                                </b-form-group>

                                                <b-form-group
                                                        label="ФИО контактного лица:"
                                                        label-for="nested-name"
                                                        class="mb-4"
                                                        label-align-sm="right"
                                                >
                                                    <b-form-input id="nested-name"
                                                                  v-model="user.company.responsible_full_name"></b-form-input>
                                                </b-form-group>

                                                <b-form-group
                                                        label="email ответственного лица:"
                                                        label-for="nested-email"
                                                        class="mb-4"
                                                        label-align-sm="right"
                                                >
                                                    <b-form-input id="nested-email"
                                                                  v-model="user.company.company_email"></b-form-input>
                                                </b-form-group>
                                            </b-form-group>
                                        </b-card>
                                        <b-row class="align-items-center d-flex h-100">
                                            <b-col cols="6">
                                                <b-button

                                                        variant="primary"
                                                        class="px-4 mt-4"
                                                        @click="registerClick"
                                                >
                                                    Зарегистрироваться
                                                </b-button>
                                                <router-link
                                                        class="text-muted d-flex mt-3"
                                                        to="/login"
                                                >
                                                    Войти
                                                </router-link>
                                            </b-col>
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
import { register } from '@/services/me.service'
import swal from 'sweetalert'


export default {
    name: 'SignUp',
    data() {
        return {
            user: {
                email: '',
                password: '',
                company: {
                    company_name: '',
                    company_email: '',
                    responsible_full_name: '',
                    INN: ''
                }
            }
        }
    },
    methods: {
        registerClick() {
            register( this.user )
                .then( () => {
                    this.$router.push( '/new-request' )
                } )
                .catch( ( err ) => {
                    swal( 'Произошла ошибка', err.body.message, 'error' )
                } )
        }
    }
}
</script>

<style scoped>

</style>