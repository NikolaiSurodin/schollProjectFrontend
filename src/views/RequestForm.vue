<template>
    <div>
        <NavBar />
        <div class="app flex-row align-items-center">
            <div class="container">
                <div v-if="currentPage === 1">
                    <b-card bg-variant="light">
                        <b-form-group
                                label-cols-lg="3"
                                label="Регистрация нового проекта"
                                label-size="lg"
                                label-class="font-weight-bold pt-0"
                                class="mb-0"
                        >
                            <b-form-group
                                    label="Субъект РФ:"
                                    label-for="nested-country"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                            >
                                <b-form-input id="nested-street" v-model="project.state"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                    label="Город:"
                                    label-for="nested-city"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                            >
                                <b-form-input id="nested-city" v-model="project.city"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                    label="Адрес установки оборудования:"
                                    label-for="nested-state"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                            >
                                <b-form-input id="nested-state" v-model="project.address"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                    label="Координаты местоположения объекта:"
                                    label-for="nested-coordinates"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                            >
                                <b-form-input id="nested-coordinates" v-model="project.coordinates"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                    label="Место установки оборудования:"
                                    label-for="nested-place"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                            >
                                <b-form-input id="nested-place" v-model="project.placeSet"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                    label="Название ЖК, КП или БЦ:"
                                    label-for="nested-state"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                            >
                                <b-form-input id="nested-state" v-model="project.nameLivingSection"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                    label="Полное наименование заказчика (конечный пользователь):"
                                    label-for="nested-name"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                            >
                                <b-form-input id="nested-name" v-model="project.endUser"></b-form-input>
                            </b-form-group>
                        </b-form-group>
                        <b-row>
                            <b-col cols="6">
                                <b-button
                                        type="submit"
                                        variant="primary"
                                        class="px-4 mt-2"
                                        @click="currentPage = 2"
                                >
                                    Вперед
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </div>
                <b-card bg-variant="light" v-else>
                    <b-button
                            size="sm"
                            :variant="isChange? 'warning' : 'success' "
                            class="float-end"
                            @click="isChange = !isChange "
                    >
                        {{ isChange ? 'Отмена' : 'Редактировать' }}
                    </b-button>
                    <b-form-group
                            label-cols-lg="3"
                            label="Данные компании регистрирущий проект"
                            label-size="lg"
                            label-class="font-weight-bold pt-0"
                            class="mb-0"
                    >
                        <b-form-group
                                label="Полное наименование организации:"
                                label-for="nested-company"
                                label-cols-sm="3"
                                label-align-sm="right"
                        >
                            <b-form-input :disabled="!isChange" id="nested-company"
                                          v-model="getMe.company_name"></b-form-input>
                        </b-form-group>

                        <b-form-group
                                label="ИНН организации:"
                                label-for="nested-company-id"
                                label-cols-sm="3"
                                label-align-sm="right"
                        >
                            <b-form-input :disabled="!isChange" id="nested-company-id"
                                          v-model="getMe.INN"></b-form-input>
                        </b-form-group>

                        <b-form-group
                                label="ФИО контактного лица:"
                                label-for="nested-name"
                                label-cols-sm="3"
                                label-align-sm="right"
                        >
                            <b-form-input :disabled="!isChange" id="nested-name"
                                          v-model="getMe.responsible_full_name"></b-form-input>
                        </b-form-group>

                        <b-form-group
                                label="Эл почта отвесвтенного лица:"
                                label-for="nested-email"
                                label-cols-sm="3"
                                label-align-sm="right"
                        >
                            <b-form-input :disabled="!isChange" id="nested-email"
                                          v-model="getMe.company_email"></b-form-input>
                        </b-form-group>
                    </b-form-group>
                    <b-row>
                        <b-col cols="6" class="mt-2">
                            <b-button
                                    type="submit"
                                    variant="success"
                                    class="px-4 m-1"
                                    @click="sendRequestClick"
                            >
                                Отправить заявку
                            </b-button>
                            <b-button
                                    type="submit"
                                    variant="primary"
                                    class="px-4"
                                    @click="currentPage = 1"
                            >
                                Назад
                            </b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </div>
        </div>
    </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { requestList, sendRequest } from '@/services/request.service'
import { mapGetters, mapActions } from 'vuex'
import swal from 'sweetalert'
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'RequestForm',
    components: {
      NavBar
    },
    data() {
        return {
            currentPage: 1,
            isChange: false,
            project: {
                state: '',
                city: '',
                address: '',
                placeSet: '',
                coordinates: '',
                nameLivingSection: '',
                endUser: '',
                success: false
            }
        }
    },
    watch: {
        getIsLoggedIn: function() {
            if( !this.getIsLoggedIn ) {
                this.$router.replace( '/login' )
            }
        }
    },
    computed: {
        ...mapGetters( [ 'getIsLoggedIn', 'getMe' ] )
    },
    methods: {
        ...mapActions( [ 'sendLogout' ] ),
        sendRequestClick() {
            const company = {
                INN: this.getMe.INN,
                company_email: this.getMe.company_email,
                company_name: this.getMe.company_name,
                responsible_full_name: this.getMe.responsible_full_name
            }
            sendRequest( { ...this.project, ...{ company: company } } )
                .then( () => {
                    swal( 'Заявка отправлена!', '', 'success' )
                        .then( () => {
                            this.$router.push('/list')
                        } )
                } )
                .catch( ( err ) => {
                    console.log( err )
                    swal( 'Произошла ошибка', '', 'error' )
                } )
        },
        logout() {
            this.sendLogout()
        }
    },
    mounted() {
        requestList()
    }

}
</script>

<style scoped>

</style>