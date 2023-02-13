<template>
  <navbar-games></navbar-games>


  <div class="d-flex vh-100 justify-content-center align-items-center">
    <div class="col-10"><games-list v-bind:games = "games"></games-list></div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      games: [],

    };
  },
  mounted() {
    fetch('https://frontend-test-api.anothereality.io/data/retrieve/all?api-version=1').then((response) => {

      if (response.ok) {
        return response.json();
      }

    }).then((data) => {
      const results = [];
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        results.push({
          id: data[i].id,
          label: data[i].label,
          description: data[i].description,
          date: data[i].date,
          color: data[i].color
        });
      }
      console.log(results);
      this.games = results;

    })
  }


};
</script>

