<template>
  <v-container class="container">
    <!-- <h3 class="text-h4 title">Experience</h3> -->
    <experience-card
      v-for="experience in allExperience"
      :key="experience"
      :place="experience.place"
      :date="experience.date"
      :position="experience.position"
      :skills="experience.skills"
      :description="experience.description"
      :background="experience.background"
      :links="experience.links" 
    />
  </v-container>
</template>

<script setup>
import ExperienceCard from '@/components/ExperienceCard.vue'
const allExperience = [
  {
    place: "Influence Campaign Awareness & Sensemaking (INCAS) Project",
    date: "MAY 2022 - PRESENT",
    position: "Research Software Engineer (MAY 2022 - MAY 2023) \n Graduate Research Assitant (AUG 2023 - PRESENT)",
    skills: ["React", "MongoDB", "Django", "Docker", "D3.js", "Javascript", "Python"],
    description: "Advised by Prof. Tarek Abdelzaher. \n \
        Containerized models using Docker to streamline the operational \
        process, enhancing the pipeline with Python and Django for running models and efficiently dispatching results. \n \
        Developed and further refined dashboards using React, visualizing public opinions and their personas on social media. \n \
        Connected the analytics and visualization pipeline by performing data post-processing and statistics calculation, \
        ensuring seamless integration of raw and processed data insights for more accurate and meaningful interpretations \
        of social media trends and public sentiments.",
    background: "incas-dark.png",
    links: [{ display: "INCAS Dashboard", link: "https://incas.csl.illinois.edu/"}]
  },
  {
    place: "CCC Intelligent Solutions",
    date: "JAN 2023 - AUG 2023",
    position: "SWE Intern in the AI Enablement team",
    skills: ["Vue.js", "FastAPI", "Okta", "Apigee", "AWS", "PyTorch", "Docker", "Kubernetes", "Javascript", "Python"],
    description: "Developed an interactive web app using Vue.js to showcase the company's core technology to customers,\
        providing a comprehensive view of its workflow and details.\n \
        Migrated the team portal's Okta authentication from Apigee to a FastAPI backend to implement role-based \
        access control, enhancing the security of critical resources such as Amazon S3 buckets. \n \
        Contributed to a Pytorch distributed training proof of concept (POC) on a Kubernetes cluster, assisting \
        in benchmarking its performance using ClearML. \n \
        Built a prototype of a tool through a Vue.js web app and a FastAPI backend, designed to centralize the \
        management of tools utilized in machine learning training, streamlining operations and boosting productivity.",
    background: "ccc-dark.png",
    links: [{ display: "CCC Intelligent Solutions", link: "https://www.cccis.com/"}]
  },
  {
    place: "Forward Data Lab",
    date: "MAY 2022 - AUG 2022",
    position: "Developer",
    skills: ["React", "PostgreSQL", "Express.js", "Javascript"],
    description: "Stored the OpenAlex dataset in a PostgreSQL database and carried out simple query optimization. \
        Following that, developed a web app using React and JavaScript, connecting it to the database to allow efficient\
        exploration of the dataset",
    background: "openalex-dark.png",
    links: [{ display: "GitHub Repo", link: "https://github.com/xinshuoLei/OpenAlex-Explorer"}]
  },
  {
    place: "Caesar Research Group",
    date: "FEB 2022 - JAN 2023",
    position: "Undergrad Developer",
    skills: ["React", "MongoDB", "Express.js", "Javascript"],
    description: "Contributed to both the frontend and backend of OLCN, a public web service that \
        provides a user-friendly database of open educational resources in computer networking. Additionally, took the lead  \
        in managing its development",
    background: "olcn-dark.png",
    links: [{ display: "OLCN", link: "http://openlibrary.cs.illinois.edu" }] 
  },
]
</script>

<style scoped>
.title {
  margin-top: 1vh;
  font-weight: 500;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin-top: 15vh !important;
}
</style>
