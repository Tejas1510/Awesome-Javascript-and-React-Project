<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Authentication for newbs</h1>
      <p class="lead">
        Learning auth is fun.
      </p>
      <hr class="my-4" />
      <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi aliquid consequuntur illo fugiat assumenda.
          Voluptatem soluta modi vel ad labore!
      </p>
      <p class="lead">
        <router-link
        class="btn btn-primary btn-lg"
        :to="{name:'signup'}"
        role="button">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
