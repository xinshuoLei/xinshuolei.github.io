<template>
  <v-container class="container">
    <!-- <h3 class="text-h4 title">Education</h3> -->
    <v-card image="@/assets/siebel-dark-85.png" class="uiuc">
      <v-row>
        <v-col class="date" cols="3">AUG 2023 - PRESENT</v-col>
        <v-col class="uiuc-title">
          <div> University of Illinois at Urbana-Champaign </div>
        </v-col>
      </v-row>
      <v-row class="uiuc-degree">
        <v-col cols="3"></v-col>
        <v-col>
          <div> Master of Computer Science </div>
        </v-col>
      </v-row>
      <v-row class="uiuc-degree">
         <v-col cols="3"></v-col>
         <v-col class="gpa">
          <div> GPA: 4.0/4.0 </div>
        </v-col>
      </v-row>
      <v-row class="undergrad-courses">
        <v-col cols="3" />
        <v-col>
          Relevant Courseworks
          <v-row class="undergrad-courses-chip">
            <v-chip v-for="course in gradCourse" :key=course density="comfortable">
              {{ course }}
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card image="@/assets/uiuc-dark.png" class="uiuc">
      <v-row>
        <v-col class="date" cols="3">AUG 2019 - MAY 2023</v-col>
        <v-col class="uiuc-title">
          <div> University of Illinois at Urbana-Champaign </div>
        </v-col>
      </v-row>
      <v-row class="uiuc-degree">
        <v-col cols="3"></v-col>
        <v-col>
          <div> Bachelor of Science in Computer Science </div>
        </v-col>
      </v-row>
      <v-row class="uiuc-degree">
         <v-col cols="3"></v-col>
         <v-col class="gpa">
          <div> GPA: 4.0/4.0 </div>
        </v-col>
      </v-row>
      <v-row class="undergrad-courses">
        <v-col cols="3" />
        <v-col>
          Relevant Courseworks
          <v-row class="undergrad-courses-chip">
            <v-chip v-for="course in undergradCourse" :key=course color="#3282B8" density="comfortable">
              {{ course }}
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
const undergradCourse = ["Database Systems", "Artificial Intelligence", 
   "Web Development", "Interactive Computer Graphics","System Programming", "Computer Architecture", "Algorithms & Model of Computation",
  "Data Structures"]
const gradCourse = ["Distributed Systems", "Applied Parallel Programming", "Machine Learning + Database Systems"]
</script>

<style scoped>
.title {
  margin-top: 1vh;
  font-weight: 500;
}

.gpa {
  font-size: 0.9em;
  color: #545454;
  opacity: 0.83;
}

.uiuc {
  padding: 10px;
}

.date {
  font-size: 0.9em;
  display: flex;
  align-items: center;
  color: #9BBEC8
}

.uiuc-title {
  margin-bottom: 0 !important;
  font-size: 1.3em;
  color: #3282B8 !important;
  font-weight: bold;
}

.uiuc-degree {
  margin-top: 0 !important;
  opacity: 0.83;
}

.uiuc-degree .v-col {
  padding-top: 0 !important
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin-top: 15vh !important;
}

.undergrad-courses-chip {
  display: flex;
  margin-top: 5px;
  margin-left: 0;
  gap: 5px;
}

.undergrad-courses {
  margin-bottom: 5px;
}
</style>
