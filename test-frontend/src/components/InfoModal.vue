<template>
    <div class="modal" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true"
         >
        <div class="modal-dialog" @click.stop="">
            <div class="modal-content modal-large px-5 py-4">
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <h3>{{data.label}}</h3>
                        </div>
                        <div class="mb-3">
                            <p> <span class="fw-bold">{{getLabel("info-modal-release-date")}}</span> {{ formattedDate(data.date) }}</p>
</div>
                        <div class="mb-3">
                            <p>{{data.description}}</p>
                        </div>

                        <div class="mb-3">
                            <p>{{data.genre}}</p>
                        </div>

                       

                    </form>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="submit" class="btn btn-primary btn-sm" @click="ToggleModalInfo()">{{getLabel("info-modal-close-button")}}</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// import genres from '../data/genres.json'
// import colorHelper from '@/helpers/colors';
import labelHelper from '@/helpers/labelHelper';
export default {

    name: "info-modal",

    props: ['ToggleModalInfo','data'],



    computed: {
        getLabel() {
            return (v) => {
                return labelHelper(v);
            }
        },
        formattedDate() {
      return (v) => {
        const dateToFormat = new Date(v);
        return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(dateToFormat);
      }
    },
    
    },


};
</script>