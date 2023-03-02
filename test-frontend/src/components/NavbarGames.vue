<template>
  <nav class="navbar nav p-0">
    <a class="navbar-brand mx-2" href="#">
      <img src="@/assets/images/sword.svg" width="45" height="45" alt="sword">
    </a>
    <a class="mx-2 title-nav navbar-brand">{{ getLabel("navbar-title") }}</a>
    <form class="row ms-auto mx-2">
      <div class="col">
        <input class="form-control mr-sm-2" 
        type="search" :placeholder="searchPlaceholder"
        v-model="searchText" >
      </div>
      <div class="col-auto">
        <button class="btn my-2 my-sm-0 navbutton" type="button" 
        @click="buttonSearchcliked"
        
        >{{ getLabel("navbar-search-button") }} </button>
      </div>
    </form>
  </nav>
</template>

<script>
import labelHelper from '@/helpers/labelHelper';




export default {

  data(){
    return{
      searchText: ''

    }
  },

  computed: {
    searchPlaceholder: {
      get() {

        return this.getLabel("navbar-search-input-placeholder");
      },
      set(newValue) {
        this.value.second = newValue;
      }

    },
 //gets a label from its key
    getLabel() {
      return (v) => {
        return labelHelper(v);
      }
    },
    uppercase() {
      return (v) => {
        return v.toUpperCase()
      }
    },
  },

  methods: {

    
    buttonSearchcliked() {
      this.$emit('search', this.searchText)
   
    }

  }
};



</script>
<style lang="scss">
@import '@/assets/style/anothergame.scss';
</style>