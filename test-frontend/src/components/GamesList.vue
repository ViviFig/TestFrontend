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

    <table class="table table-striped table-responsive ">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ getLabel("home-game-title") }}</th>
          <th scope="col">{{ getLabel("home-game-description") }}</th>
          <th scope="col">{{ getLabel("home-game-date") }}</th>
          <th scope="col">{{ getLabel("home-game-genre") }}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">

          <th scope="col">{{ game.id }}</th>
          <td>{{ game.label }}</td>
          <td> {{ game.description }}</td>
          <td>{{ formattedDate(game.date) }}</td>
          <td>{{ formattedGenre(game.color) }}</td>
          <td><b-icon-info-square @click="() => openModal(game)" class="button-info" /></td>
          <td><b-icon-pencil-square @click="() => openModifyModal(game)" class="button-info" /></td>
        </tr>

      </tbody>

    </table>
  </div>

</template>

<script>
import { ref } from 'vue';
import { AddModal } from './AddModal.vue';
import { InfoModal } from './InfoModal.vue';
import genreHelper from '@/helpers/genreHelper';
import labelHelper from '@/helpers/labelHelper';
export default {

  props: ['games', 'inputSearch'],


  data() {
    return {
      infovisible: false,
      //game data 
      modalData: null,

    }
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

    openModal(data) {
      this.modalData = data
      this.ToggleModalInfo('iconTrigger')
    },
    openModifyModal(data) {
      this.modalData = data
      this.ToggleModal('iconTrigger')
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
