<template>

  <div class="container">
    <add-modal v-if="popupTriggers.buttonTrigger" :ToggleModal="() => ToggleModal('buttonTrigger')" />
    <div class="justify-content-between d-flex flex-row">
      <h1 class="my-3">Games catalogue</h1>
      <button type="button" class="btn btn-primary btn-sm" @click="() => ToggleModal('buttonTrigger')">+ Add
        new</button>
    </div>

    <div class="justify-content-end d-flex flex-row my-4">
      <button class="btn btn-display mx-2"><b-icon-list-task /></button>
      <button class="btn btn-display mx-2"><b-icon-grid /></button>
    </div>

    <table class="table table-striped table-responsive ">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Year</th>
          <th scope="col">Genre</th>
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
          <td>{{ formattedGame(game.color) }}</td>
          <td><b-icon-info-square /></td>
          <td><b-icon-pencil-square /></td>
        </tr>

      </tbody>

    </table>
  </div>

</template>

<script>
import { ref } from 'vue';
import { AddModal } from './AddModal.vue';
import genreHelper from '@/helpers/genreHelper';

export default {
  props: ['games'],



  setup() {

    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const ToggleModal = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]

    }

    return {
      AddModal,
      popupTriggers,
      ToggleModal

    }
  },

  computed: {
    uppercase() {
      return (v) => {
        return v.toUpperCase()
      }
    },
    formattedDate() {
      return (v) => {
        const dateToFormat = new Date(v);
        return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(dateToFormat);
      }
    },

    formattedGame(){
      return(v) => {
        return genreHelper(v);
      }
    }
  },

  components: {
    AddModal,

  }


};
</script>

<style lang="scss">
@import '@/assets/style/anothergame.scss';
</style>
