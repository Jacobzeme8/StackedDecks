<template>
  <!-- TODO Add Github Links -->
  <div class="container-fluid rounded bg-pic">
    <h1 class="text-center text-dark letter">About our Devs</h1>

    <div class="container-fluid">
      <div class="row d-flex justify-content-around">
        <div class="col-md-4">
          <div class="img-fluid">
            <img class="photo img-fluid" src="Parker.jpg" alt="Parker">
          </div>
          <div class="text-center">
            <span><b class="letter text-dark">Parker Ward</b></span>
            <p class="letter text-dark"><b> 6 Ft. & Stacked</b></p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="img-fluid">
            <img class="photo img-fluid" src="T-Rex.jpg" alt="T-Rex">
          </div>
          <div class="text-center">
            <span><b class="letter text-dark">Thomas "T-Rex" Fuhriman</b></span>
            <p class="letter text-dark"><b>Wannabe Stacked
                Strong Man and amateur arm wrestler</b></p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row d-flex justify-content-around">
        <div class="col-md-4">
          <div class="img-fluid">
            <img class="photo img-fluid" src="Linda.jpg " alt="Linda Taing">
          </div>
          <div class="text-center">
            <span><b class=" text-light">Linda Taing</b></span>
            <p class=" text-light"><b>Cyclist that goes nowhere, but stacked!</b></p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="img-fluid">
            <img class="photo img-fluid" src="Jacob.jpg" alt="JACOB MARTINEZ">
          </div>
          <div class="text-center">
            <span><b class=" text-light ">Jacob Martinez</b></span>
            <p class=" text-light"><b>5’11 and 3/4
                in the morning, STACKED</b></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.photo {
  height: 25em;
  width: 25em;
  object-fit: cover;
  border-radius: 2%;
}



.bg-pic {
  background-image: url(https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTUyfHx3b3Jrb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  opacity: 80;
}

.letter {
  font-family: 'M PLUS 1p', sans-serif;
  text-shadow: 1px 1px 1px rgb(242, 238, 238);
}
</style>