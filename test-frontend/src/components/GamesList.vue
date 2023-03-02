<template>
  <div class="container my-3">
    <add-modal v-if="popupTriggers.buttonTrigger" :ToggleModal="() => ToggleModal('buttonTrigger')" />
    <add-modal v-if="popupTriggers.iconTrigger" :ToggleModal="() => ToggleModal('iconTrigger')"
      :gameToModify="modalData" />
    <info-modal v-if="infomodalTriggers.iconTrigger" :ToggleModalInfo="() => ToggleModalInfo('iconTrigger')"
      :data="modalData" />

    <div class="justify-content-between d-flex flex-row">
      <h1 class="my-5">{{ getLabel("home-title") }}</h1>
      <button type="button" class="btn btn-primary btn-sm" @click="() => ToggleModal('buttonTrigger')">
        {{ getLabel("home-add-new-game-button") }}</button>
    </div>

    <div class="justify-content-end d-flex flex-row my-4">
      <button class="btn btn-display mx-2 disabled"><b-icon-list-task /></button>
      <button class="btn btn-display mx-2 disabled"><b-icon-grid /></button>
    </div>

    <!--#region TABLE  -->
    <div class="table-responsive-sm" v-if="cardslayout == false">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ getLabel("home-game-title") }}</th>
            <th scope="col" class="d-none d-md-table-cell">{{ getLabel("home-game-description") }}</th>
            <th scope="col" class="d-none d-sm-table-cell">{{ getLabel("home-game-date") }}</th>
            <th scope="col">{{ getLabel("home-game-genre") }}</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in filteredGames" :key="game.id">

            <th scope="col">{{ game.id }}</th>
            <td>{{ game.label }}</td>
            <td class="d-none d-md-table-cell"> {{ truncate(game.description, 90) }}</td>
            <td class="d-none d-sm-table-cell">{{ formattedDate(game.date) }}</td>
            <td>{{ formattedGenre(game.color) }}</td>
            <td><b-icon-info-square @click="() => openModal(game)" class="button-info" /></td>
            <td><b-icon-pencil-square @click="() => openModifyModal(game)" class="button-info" /></td>
            <td><b-icon-trash @click="() => Itemdelete(game.id)" class="button-info" /></td>
          </tr>

        </tbody>

      </table>

    </div>


    <!--#endregion  -->




    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="cardslayout == true">


      <div class="col-6">
        <div class="card" v-for="game in games" :key="game.id">
          <div class="card-body">
            <h5 class="card-title">{{ game.label }}</h5>
            <p class="card-text">{{ formattedDate(game.date) }}</p>
            <p class="card-text">{{ formattedGenre(game.color) }}</p>

          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { ref } from 'vue';
import { AddModal } from './AddModal.vue';
import { InfoModal } from './InfoModal.vue';
import genreHelper from '@/helpers/genreHelper';
import labelHelper from '@/helpers/labelHelper';
import { deleteItem } from '../services/service-v1';


export default {

  props: ['games', 'search'],
  watch: {

    search() {

      if (this.search == undefined || this.search == '') {
        this.filteredGames = this.games;
      }
      else {
        this.filteredGames = this.returnFilteredGames;
      }

    },

    games() {
      this.filteredGames = this.games
    }
  },

  data() {
    return {

      cardslayout: false,
      filteredGames: this.games,
      infovisible: false,
      //game data 
      modalData: null,

    }
  },

  mounted() {


    this.filteredGames = this.games;

  },
  setup() {
    //triggers for AddModal
    const popupTriggers = ref({
      buttonTrigger: false,
      iconTrigger: false
    });
    //triggers for InfoModal
    const infomodalTriggers = ref({
      iconTrigger: false,
    });


    const ToggleModal = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]

    };
    const ToggleModalInfo = (trigger) => {
      infomodalTriggers.value[trigger] = !infomodalTriggers.value[trigger]

    };


    return {
      AddModal,
      popupTriggers,
      infomodalTriggers,
      ToggleModal,
      ToggleModalInfo,

    }
  },

  computed: {

    returnFilteredGames() {
      return this.games.filter(
        game => this.uppercase(game.label).includes(this.uppercase(this.search)) || this.uppercase(game.description).includes(this.uppercase(this.search))
      );
    },


    uppercase() {
      return (v) => {
        return v.toUpperCase()
      }
    },
    //format date to dd/MM/yyyy 
    formattedDate() {
      return (v) => {
        const dateToFormat = new Date(v);
        return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(dateToFormat);
      }
    },

    //returns the genre by the color
    formattedGenre() {
      return (v) => {
        return genreHelper(v);
      }
    },
    //gets a label from its key
    getLabel() {
      return (v) => {
        return labelHelper(v);
      }
    }
  },

  methods: {
    truncate(value, length) {
      if (value.length > length) {
        return value.substring(0, length) + "...";
      } else {
        return value;
      }
    },
    openModal(data) {
      this.modalData = data
      this.ToggleModalInfo('iconTrigger')
    },
    openModifyModal(data) {
      this.modalData = data
      this.ToggleModal('iconTrigger')
    },

    Itemdelete(data) {

      deleteItem(data);
      setTimeout(function () {
        window.location.reload();
      }, 800);
    },


  },


  components: {
    AddModal,
    InfoModal
  }


};
</script>

<style lang="scss">
@import '@/assets/style/anothergame.scss';
</style>
