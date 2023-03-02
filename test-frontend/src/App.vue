<template>
  <navbar-games @search="handleSearch"></navbar-games>
  <div class="d-flex justify-content-center align-items-center">
    <div class="col-10"><games-list :games="games" :search="searchText"> </games-list></div>
  </div>
</template>

<script>

//import { signin } from '../src/services/service.js';
import { getAll } from '../src/services/service-v1.js';
//import jwt from 'jsonwebtoken';
export default {


  data() {
    return {
      searchText: '',

      games: []
      ,
      // username: process.env.VUE_APP_USERNAME,
      // password: process.env.VUE_APP_PASSWORD,
      // authenticationScheme: {
      //   bearer: "",
      //   expiry: "",
      //   apiLabel: ""
      // },
      // config: null
    };
  },

  methods: {
    handleSearch(s) {
      this.searchText = s
    }
    // submit(username, password) {
    //   signin(username, password).then(auth => {
    //     this.authenticationScheme = auth.data
    //     this.config =jwt.decode(this.authenticationScheme.bearer)
    //   console.log(this.config);
    //   }).then(() => {
    //     getAll(this.config).then(data => {
    //       console.log(data)
    //     })
    //   })
    // }
  },

  mounted() {
    getAll().then((data) => {

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

