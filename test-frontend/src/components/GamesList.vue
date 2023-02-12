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
        <tr>
          <th scope="col">1</th>
          <td>thetitle</td>
          <td>this is a very long description of the game</td>
          <td>theyear</td>
          <td>thegenre</td>
          <td><b-icon-info-square /></td>
          <td><b-icon-pencil-square /></td>
        </tr>
        <tr>
          <th scope="col">2</th>
          <td>thetitle</td>
          <td>theDescription</td>
          <td>theyear</td>
          <td>thegenre</td>
          <td><b-icon-info-square /></td>
          <td><b-icon-pencil-square /></td>
        </tr>
        <tr>
          <th scope="col">3</th>
          <td>thetitle</td>
          <td>theDescription</td>
          <td>theyear</td>
          <td>thegenre</td>
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
import axios from 'axios';
export default {

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
data(){
return {
  games:[]
};
},
  components: {
    AddModal,
  },
  mounted() {
    axios.get('https://frontend-test-api.anothereality.io/data/retrieve/all?api-version=1')
      .then(response => {
        this.games = response.data;
        console.log(this.games);
      })
      .catch(error => {
        console.error(error);
      });
  }

};
</script>

<style lang="scss">
@import '@/assets/style/anothergame.scss';
</style>
