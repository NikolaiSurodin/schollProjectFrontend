<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing>добавить менеджера</b-button>
        <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Создать нового менеджера"
        >
            <template #modal-footer="{ close }">
                <b-button
                        size="sm"
                        variant="success"
                        @click="handleOk"
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
            <form
                    ref="form"
                    @submit.stop.prevent="handleSubmit"
            >

                <b-form-group
                        label="Фамилия"
                        label-for="secondName-input"
                        invalid-feedback="secondName is required"
                >
                    <b-form-input
                            id="secondName-input"
                            v-model="manager.secondName"
                            required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        label="Имя"
                        label-for="name-input"
                        invalid-feedback="Name is required"
                >
                    <b-form-input
                            id="name-input"
                            v-model="manager.name"
                            required
                    ></b-form-input>

                    <b-form-group
                            label="email"
                            label-for="email"
                            invalid-feedback="email is required"
                    >
                        <b-form-input
                                id="email"
                                type="email"
                                v-model="manager.email"
                                required
                        ></b-form-input>
                    </b-form-group>


                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import { create } from '@/services/manager.service'
import swal from 'sweetalert'

export default {
    name: 'AddManagerModal',
    data() {
        return {
            manager: {
                name: '',
                secondName: '',
                email: ''
            }
        }
    },
    methods: {
        checkFormValidity() {

        },
        resetModal() {
            this.manager.name = ''
            this.manager.secondName = ''
            this.manager.email = ''
        },
        handleOk( bvModalEvent ) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            create( this.manager )
                .then( () => {
                    swal( 'Менеджер создан', '', 'success' )
                        .then( () => {
                            this.resetModal()
                            this.$bvModal.hide( 'modal-prevent-closing' )
                        } )

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