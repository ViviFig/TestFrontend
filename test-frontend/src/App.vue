<template>
  <navbar-games @search="onSearch"></navbar-games>

  <!--  -->
  <div class="d-flex justify-content-center align-items-center">
    <div class="col-10"><games-list :games="games" v-model:inputSearch="searchInput"> </games-list></div>
  </div>


</template>

<script>


export default {


  data() {
    return {
      games: [],
      

    };
  },

  methods: {
    onSearch: (val) => {
      const searchInput = val
      
    return {
      searchInput
    }

    }

  },

  mounted() {


    fetch(process.env.VUE_APP_BASE_API_URL + '/retrieve/all?api-version=1').then((response) => {

      if (response.ok) {
        return response.json();
      }

    }).then((data) => {
      const results = [];

      for (let i = 0; i < data.length; i++) {
        results.push({
          id: data[i].id,
          label: data[i].label,
          description: data[i].description,
          date: data[i].date,
          color: data[i].color
        });
      }

      this.games = results;

    })


  }

};
</script>

