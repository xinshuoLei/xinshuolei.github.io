<template>
  <v-row class="fill-height container">
    <v-col cols="5" class="left">
      <name />
      <Nav />
    </v-col>
    <v-col class="right">
      <about class="section" id="about-section"/>
      <education class="section" id="education-section"/>
      <experience class="section" id="experience-section"/>
      <project class="section" id="featured-section"/>
    </v-col>
  </v-row>
</template>

<script setup>
  import Name from '@/components/Name.vue'
  import Nav from '@/components/Nav.vue'
  import About from '@/components/About.vue'
  import Education from '@/components/Education.vue'
  import Experience from '@/components/Experience.vue'
  import Project from '@/components/Projects.vue'
  import { onMounted } from 'vue'

  var allSections = document.getElementsByClassName("section");
  var navSections = document.querySelectorAll(".nav, .nav_selected");

  const onScroll = () => {
    var scrollY = window.scrollY + screen.height * 0.3;

    // console.log(scrollY)
    // console.log(navSections.length)

    for (var j = 0; j < allSections.length; j++) {
      var sectionHeight = allSections[j].offsetHeight;
      var sectionTop = allSections[j].offsetTop;
      var navSection = document.getElementById("nav-" + allSections[j].id)

      // console.log(sectionTop, sectionHeight)
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        if (!navSection.className.includes("nav_selected")) {
          navSection.className += " nav_selected"
        }
      } else {
        navSection.className = navSection.className.replace("nav_selected", "")
      }
    }
  }

  window.addEventListener("scroll", onScroll);

  onMounted(() => {
    var firstSection = document.getElementById("nav-" + allSections[0].id)
    if (firstSection) {
      if (!firstSection.className.includes("nav_selected")) {
        firstSection.className += " nav_selected"
      }
    }
  })
  

</script>

<style scoped>
  .container {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Rubik&display=swap');


html {
  padding-left: 10vw;
  padding-right: 10vw;
  background-color: #1B262C;
}

* {
  color: #BBE1FA;
  /* font-family: 'Ubuntu', sans-serif; */
  /* font-family: 'PT Sans', sans-serif; */
  font-family: 'Barlow', sans-serif;
}

.left {
  /* keep the left (name and nav) fixed while scrolling */
  height: 100vh;
  position: sticky;
  top: 0;
  overflow: hidden;
  background-color: #1B262C;
}

.right {
  padding-top: 10vh;
  padding-bottom: 5vh;
  overflow-y: auto;
  background-color: #1B262C;
}

.v-chip__content {
  color: #96EFFF;
  font-weight: 500;
  filter: brightness(1.2)
}

.v-chip__underlay {
  background-color: #96EFFF !important;
  opacity: 0.2 !important;
}

.v-card {
  border-radius: 10px !important;
}
</style>
