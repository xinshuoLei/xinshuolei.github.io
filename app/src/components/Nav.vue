<template>
  <v-container class="container">
      <v-list class="list">
        <div v-for="item in navItems" 
          :key="item.id"
          class="nav"
          :id="`nav-${item.id}`"
          @click="handleNavClick(item.id)"  
        >
          {{ item.display }}
        </div>
        <!-- <v-list-item class = "nav" id="nav-about-section">About</v-list-item>
        <v-list-item class = "nav" id="nav-education-section">Education</v-list-item>
        <v-list-item class = "nav" id="nav-experience-section">Experience</v-list-item>
        <v-list-item class = "nav" id="nav-featured-section">Featured Projects</v-list-item> -->
      </v-list>      
  </v-container>
</template>

<script setup>
  const navItems = [
    {id: "about-section", display: "About"},
    {id: "education-section", display: "Education"},
    {id: "experience-section", display: "Experience"},
    {id: "featured-section", display: "Featured Projects"},
  ]

  const handleNavClick = (id) => {
    var correspondingSection = document.getElementById(id);
    var top = correspondingSection.offsetTop;
    window.scrollTo({
        top: top - screen.height * 0.03,
        behavior: "smooth"
    });
  }
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
}

.container, .list {
  background-color: #1B262C;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v-list-item--density-default {
  padding-inline: 0 !important;
}

.nav {
  opacity: 0.5;
  transition: font-size 0.3s ease-in-out;
}

.container .nav:hover {
  color: #7DF9FF;
  opacity: 1;
  font-size: 1.3em;
  font-weight: 600;
  cursor: pointer;
}

.nav_selected {
  color: #7DF9FF;
  opacity: 1;
  font-size: 1.3em;
  font-weight: 600;
}
</style>