<template>
    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        @click="ToggleModal()">
        <div class="modal-dialog " @click.stop="">
            <div class="modal-content modal-large px-5 py-4">
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Name</label>
                            <input type="text" class="form-control" id="recipient-name" placeholder="Game name here..."
                                v-model="newGame.label">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label"
                                placeholder="Describe the game here...">Description:</label>
                            <textarea class="form-control" id="message-text" v-model="newGame.description"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Release date</label>
                            <input type="date" class="form-control" id="recipient-name" v-model="newGame.date">
                        </div>


                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Genre</label>
                            <div class="form-check" v-for="genre in gens" :key="genre.key">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault1" :value=genre v-model="newGame.color">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    {{ genre }}
                                </label>
                            </div>

                        </div>

                    </form>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="submit" class="btn btn-primary btn-sm" @click="postData">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import genres from '../data/genres.json'
import colorHelper from '@/helpers/colors';

export default {
   
    data() {
        return {

            newGame: {
                label: '',
                description: '',
                date: '',
                color: ''
            },
            gens: genres


        }

    },
    name: "add-modal",

    props: ['ToggleModal'],

    methods: {
      


        postData() {
            fetch(process.env.VUE_APP_BASE_API_URL + '/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    label: this.newGame.label,
                    description: this.newGame.description,
                    date: this.newGame.date,
                    color: colorHelper(this.newGame.color)

                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                this.ToggleModal();
        },

    }

};
</script>