<template>
    <div class="modal" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" @click="ToggleModal()">
        <div class="modal-dialog " @click.stop="">
            <div class="modal-content modal-large px-5 py-4">
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="game-name" class="col-form-label">{{ getLabel("modal-game-name") }}</label>
                            <input type="text" class="form-control" id="game-name" placeholder="Game name here..."
                                v-model="newGame.label">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label" placeholder="Describe the game here...">{{
                                getLabel("modal-game-description")
                            }}</label>
                            <textarea class="form-control" id="message-text" v-model="newGame.description"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="game-date" class="col-form-label">{{ getLabel("modal-game-date") }}</label>
                            <input type="date" class="form-control" id="game-date" v-model="newGame.date">
                        </div>


                        <div class="mb-3">
                            <label for="game-genre" class="col-form-label">{{
                                getLabel("modal-game-genre")
                            }}</label>
                            <div class="form-check" v-for="genre in gens" :key="genre.key">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                    :value=genre v-model="newGame.color" :checked="colorHelper(genre) == newGame.color">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    {{ genre }}
                                </label>
                            </div>

                        </div>

                    </form>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="submit" class="btn btn-primary btn-sm" @click="postData" :disabled="isDisable">{{
                        getLabel("modal-save-button")
                    }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import genres from '../data/genres.json'
import colorHelper from '@/helpers/colors';
import labelHelper from '@/helpers/labelHelper';
import { edit } from '../services/service-v1.js';
import { add } from '../services/service-v1.js';
export default {
    data() {
        return {
            //date variable to be formatted
            gamedate: null,
            //game object
            newGame: {
                label: '',
                description: '',
                date: '',
                color: ''
            },
            //list of genres
            gens: genres


        }

    },
    name: "add-modal",

    props: ['ToggleModal', 'gameToModify'],

    mounted() {
        //check if the game needs to be modified
        if (this.gameToModify != undefined) {
            this.gamedate = this.formattedInputDate(this.gameToModify.date)
            this.newGame = {
                id: this.gameToModify.id,
                label: this.gameToModify.label,
                description: this.gameToModify.description,
                date: this.gamedate,
                color: this.gameToModify.color
            }
        }

    },

    computed: {
//disables save button
        isDisable() {
            if (this.newGame.label == "" || this.newGame.description == "" || this.newGame.date.length === 0 || this.newGame.color === "") {
                return true;
            }
            else { return false }


        },

        //gets a label from its key
        getLabel() {
            return (v) => {
                return labelHelper(v);
            }
        },
        //format date to dd/MM/yyyy 
        formattedDate() {
            return (v) => {
                const dateToFormat = new Date(v);
                return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(dateToFormat);
            }
        },
        //format date to yyyy/mm/dd
        formattedInputDate() {
            return (v) => {

                return v.split('T')[0];
            }
        }

        ,
        //returns the genre by the color
        colorHelper() {
            return (v) => {
                return colorHelper(v);
            }
        }
    },

    methods: {


        //connect to service and add/edit a record
        postData() {
            if (this.gameToModify == undefined) {

                add({
                    label: this.newGame.label,
                    description: this.newGame.description,
                    date: this.newGame.date,
                    color: colorHelper(this.newGame.color)
                })

            }
            else {

                if (colorHelper(this.newGame.color) == undefined) {
                    this.newGame.color = this.gameToModify.color

                }
                else {
                    this.newGame.color = colorHelper(this.newGame.color)
                }
                edit({
                    id: this.newGame.id,
                    label: this.newGame.label,
                    description: this.newGame.description,
                    date: this.newGame.date,
                    color: this.newGame.color
                })

            }


            //close the modal
            this.ToggleModal();

            setTimeout(function () {
                window.location.reload();
            }, 800);

        },

    }

};
</script>