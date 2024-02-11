<template>
    <v-card :image="backgroundImage" class="experience">
      <v-row class="date-place">
        <v-col class="date" cols="3">{{ date }}</v-col>
        <v-col class="name">
          <div> {{ name }} </div>
        </v-col>
      </v-row>
      <v-row class="description">
        <v-col cols="3" />
        <v-col>
          <div> {{ description }} </div>
        </v-col>
      </v-row>
      <v-row class="links" v-if="links">
        <v-col cols="3" />
        <v-col>
          <v-row class="links-chip">
            <div v-for="link in links" 
              :key=link
              @click="openLink(link.link)"
              class="link"
            >
              <v-icon start icon="mdi-link-variant" />
              {{ link.display }}
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="relevant-skills">
        <v-col cols="3" />
        <v-col>
          <!-- Relevant Skills -->
          <v-row class="relevant-skills-chip">
            <v-chip v-for="skill in skills" :key=skill density="comfortable">
              {{ skill }}
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
</template>

<script setup>
const props = defineProps({
  "date": String,
  "name": String,
  "position": String,
  "description": String,
  "skills": Array,
  "background": String,
  "links": Array,
})

var backgroundImage = new URL(`../assets/${props.background}`, import.meta.url).href

const openLink = (link) => { window.open(link) }

</script>

<style scoped>
.title {
  margin-top: 1vh;
}

.experience {
  padding: 10px;
}

.date {
  font-size: 0.9em;
  display: flex;
  align-items: center;
  color: #9BBEC8
}

.name {
  margin-bottom: 0 !important;
  font-size: 1.3em;
  color: #3282B8 !important;
  font-weight: bold;
}

.position {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  opacity: 0.83;
}

.position .v-col {
  padding-bottom: 0 !important;
}

.description .v-col {
  padding-top: 0 !important;
  opacity: 0.83;
}

.position, .description .v-col {
  padding-top: 0 !important;
  white-space: pre-line;
}


.relevant-skills-chip, .links-chip {
  display: flex;
  margin-top: 5px;
  margin-left: 0;
  gap: 5px;
}

.relevant-skills {
  margin-bottom: 5px;
}

.links-chip i {
  margin-right: 1px;
  color: #A5C9CA;
  font-size: 1.1em;
}

.link {
  cursor: pointer;
  font-size: 0.9em;
  color: #A5C9CA;
}

.link:hover {
  filter: brightness(1.2);
}
</style>
