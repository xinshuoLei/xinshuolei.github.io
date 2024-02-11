<template>
  <v-container class="container">
      <h1 class="text-h2 font-weight-bold">Xinshuo Lei</h1>
      <h5 class="text-h5 font-weight-bold title">CS @ UIUC</h5>
      <div class="contact">
        <v-icon
          size="large"
          icon="mdi-github"
          @click="openGithub()"
        />
        <v-icon
          size="large"
          icon="mdi-linkedin"
          @click="openLinkedin()"
        />
      </div>
  </v-container>
</template>

<script setup>

const openGithub = () => { window.open("https://github.com/xinshuoLei") }
const openLinkedin = () => { window.open("https://www.linkedin.com/in/xinshuo-lei-1495aa220/") } 

</script>

<style scoped>

.container {
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2vh;
  /* background-color: blue; */
}

.contact {
  display: flex;
  gap: 0.5vw;
}

.contact i:hover {
  color: #d3d3d3;
}
</style>
