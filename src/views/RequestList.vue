<template>
    <div>
        <NavBar class="mt-3" @click="toNewRequest" />
        <b-container fluid class="container">

            <!-- User Interface controls -->
            <b-row>
                <b-col lg="6" class="my-1">
                    <b-form-group
                            label-for="filter-input"
                            label-cols-sm="3"
                            label-align-sm="right"
                            label-size="sm"
                            class="mb-0"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Поиск"
                            ></b-form-input>

                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Очистить</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Main table element -->
            <b-card bg-variant="light">
                <b-button class="float-end" variant="success" @click="logout">Выйти</b-button>
                <b-table
                        :items="items"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        :filter-included-fields="filterOn"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        stacked="md"
                        show-empty
                        small
                        @filtered="onFiltered"
                >

                    <template #cell(success)="row">
                        <b>{{ row.item.success ? 'Одобрено' : 'Не одобрено' }}</b>
                    </template>

                    <template #cell(manager)="row">
                        <b>{{ _.get( row, 'item.manager.name', 'Не назначено' ) }} {{
                                _.get( row, 'item.manager.secondName', '' )
                            }}</b>
                    </template>

                    <template #cell(actions)="row">
                        <b-button
                                size="sm"
                                @click="info(row.item, row.index, $event.target)"
                                class="mr-1"
                        >
                            Подробнее
                        </b-button>
                    </template>


                </b-table>
            </b-card>

            <!-- Info modal -->
            <b-modal
                    :id="infoModal.id"
                    :title="infoModal.title"
                    @close="resetInfoModal"
                    :lazy="true"
                    no-close-on-backdrop
                    no-close-on-esc

            >

                <template #modal-footer="{ close }">
                    <b-button
                            size="sm"
                            variant="success"
                            v-if="getIsAdmin"
                            @click="saveDataRequest(infoModal.content, infoModal)"
                    >
                        Сохранить
                    </b-button>
                    <b-button
                            size="sm"
                            variant="danger"
                            @click="close"
                    >
                        Закрыть
                    </b-button>
                </template>
                <div class="d-flex flex-column info">

                    <div class="info__item">
                        <span>Дата запроса: </span> <span> {{ infoModal.content.createdAt }}</span>
                    </div>

                    <div class="info__item">
                        <span>Статус:</span> <span> {{ infoModal.content.success ? 'Одобрено' : 'Не одобрено' }}</span>
                    </div>


                    <div class="info__item">
                        <span>Субект РФ:</span> <span> {{ infoModal.content.state }}</span>
                    </div>

                    <div class="info__item">
                        <span>Город:</span> <span> {{ infoModal.content.city }}</span>

                    </div>
                    <div class="info__item">
                        <span>Адрес установки оборудования:</span> <span> {{ infoModal.content.address }}</span>

                    </div>
                    <div class="info__item">
                        <span>Место установки оборудования:</span> <span> {{ infoModal.content.placeSet }}</span>
                    </div>
                    <div class="info__item">
                        <span>Координаты объекта:</span> <span> {{ infoModal.content.coordinates }}</span>
                    </div>
                    <div class="info__item">
                        <span>Название ЖК, КП или БЦ:</span> <span> {{ infoModal.content.nameLivingSection }}</span>
                    </div>
                    <div class="info__item">
                        <span>Полное наименование заказчика (конечный пользователь):</span>
                        <span> {{ infoModal.content.endUser }}</span>
                    </div>
                    <div class="info__item">
                        <span>Название компании-партнера:</span>
                        <span> {{ _.get( infoModal, 'content.userCompany.company_name' ) }}</span>
                    </div>
                    <div class="info__item">
                        <span>Код контрагента DIGIS:</span> <span> - </span>
                    </div>
                    <div class="info__item">
                        <span>Отвественный от компании партнера:</span>
                        <span> {{ _.get( infoModal, 'content.userCompany.responsible_full_name' ) }}</span>
                    </div>
                    <div class="info__item">
                        <span>Ответсвенный менеджер ГK DIGIS:</span>
                        <span>
                            <p v-if="_.get( infoModal, 'content.manager.name') && isDisabledManager">
{{
                                    `${ this.selectManager.name ? `${ this.selectManager.name } ${ this.selectManager.secondName }` : `${ _.get( infoModal, 'content.manager.name', '' ) } ${ _.get( infoModal, 'content.manager.secondName', '' ) }` }`
                                }}
                            </p>
                            <input
                                    v-else
                                    :disabled="isDisabledManager"
                                    v-model="searchManager"
                                    @input="debounceSearch"
                            >
                        </span>
                        <b-icon
                                :icon="isDisabledManager ? 'pencil' : 'x-lg'"
                                role="button"
                                v-if="getIsAdmin"
                                @click="changeManager"></b-icon>
                        <!--                        <b-icon icon="x-lg" role="button"></b-icon>-->
                        <!--                        <b-button-->
                        <!--                                size="sm"-->
                        <!--                                :variant="isDisabledManager ? 'success' : 'warning'"-->

                        <!--                        >-->
                        <!--                            {{ isDisabledManager ? 'Редактировать' : 'Отменить' }}-->
                        <!--                        </b-button>-->
                    </div>
                    <div v-if="managerList.length">

                        <div
                                v-for="item in managerList"
                                :key="item.id"
                        >
                            <div
                                    @click="setManager( item )"
                                    role="button"
                            >
                                {{ item.name }} {{ item.secondName }}
                            </div>

                        </div>
                    </div>
                </div>

            </b-modal>
        </b-container>
    </div>

</template>

<script>
import _ from 'lodash'

// eslint-disable-next-line no-unused-vars
import { requestList, userRequestList, updateRequest } from '@/services/request.service'
import { managerList } from '@/services/manager.service'

import { mapActions, mapGetters } from 'vuex'

import NavBar from '@/components/NavBar.vue'

export default {
    name: 'RequestList',
    components: {
        NavBar
    },
    data() {
        return {
            items: [],
            managerList: [],
            searchManager: '',
            isDisabledManager: true,
            selectManager: {},
            successRequest: false,
            fields: [
                { key: 'city', label: 'Город' },
                { key: 'userCompany.company_name', label: 'Компания', class: 'text-center' },
                {
                    key: 'success',
                    label: 'Статус'
                },
                { key: 'manager', label: 'Менеджер' },
                { key: 'actions', label: 'Просмотр' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [ 5, 10, 15, { value: 100, text: 'Show a lot' } ],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            infoModal: {
                id: 'info-modal',
                title: 'qweqwe',
                content: ''
            }
        }
    },
    computed: {
        ...mapGetters( [ 'getIsLoggedIn', 'getIsAdmin' ] )
    },
    watch: {
        'getIsLoggedIn': function() {
            if( !this.getIsLoggedIn ) {
                this.$router.replace( '/login' )
            }
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length
        this.loadData()
    },
    methods: {
        ...mapActions( [ 'sendLogout', 'fetchMe' ] ),

        saveDataRequest( request ) {
            // eslint-disable-next-line no-unused-vars
            const { manager, success, ...data } = request
            updateRequest( {
                ...data,
                success: this.successRequest,
                manager: this.selectManager.name ? this.selectManager : manager
            }, request.id )
                .then( () => {
                    this.loadData()
                    this.$bvModal.hide( this.infoModal.id )
                } )
        },

        debounceSearch: _.debounce( function() {
            this.loadManagerList()
        }, 300 ),

        logout() {
            this.sendLogout()
        },
        loadManagerList() {
            managerList( this.searchManager )
                .then( ( data ) => {
                    this.managerList = data
                } )
        },
        loadData() {
            if( this.getIsAdmin ) {
                requestList()
                    .then( ( res ) => {
                        this.items = res
                    } )
            } else {
                userRequestList()
                    .then( ( res ) => {
                        this.items = res
                    } )
            }

        },
        changeManager() {
            this.isDisabledManager = !this.isDisabledManager
            if( this.isDisabledManager && this.managerList.length ) {
                this.managerList = []
            }
        },
        setManager( item ) {
            this.selectManager = item
            this.searchManager = `${ item.name } ${ item.secondName }`
            this.managerList = []
            this.isDisabledManager = true
        },
        toNewRequest() {
            this.$router.push( '/new-request' )
        },
        info( item, index, button ) {
            this.infoModal.title = 'Информация о зарегистрированном проекте'
            this.infoModal.content = item
            this.$root.$emit( 'bv::show::modal', this.infoModal.id, button )
        },
        resetInfoModal( index, button ) {
            this.searchManager = ''
            this.selectManager = {}
            this.managerList = []
            this.isDisabledManager = true
            this.$root.$emit( 'bv::modal::hide', this.infoModal.id, button )
        },
        onFiltered( filteredItems ) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        }
    }
}
</script>

<style lang="scss">
.modal-dialog {
  max-width: 1000px !important;
}

.modal-header {
  background: linear-gradient(54.74deg, #2699D6 34.37%, #2699D6 34.38%, #121628 176.99%) !important;
  color: white;
}

.close {
  background: transparent;
  border: none;
}

.info {
  &__item {
    display: flex;
    padding: 15px;

    span {
      padding: 0 5px;
    }

    &:nth-child(2n) {
      background: #f0f0f0;
    }
  }
}
</style>