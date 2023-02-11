<template id="games">
  <div class="container">
    <div class="justify-content-between d-flex flex-row">
      <h1 class="my-3">Games catalogue</h1>
      <button type="button" class="btn btn-primary btn-sm">+ Add new</button>
      
    </div>
    
    <div class="justify-content-end d-flex flex-row">
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

<script>export default {


};</script>

<style lang="scss">
@import '@/assets/style/anothergame.scss';
</style>
