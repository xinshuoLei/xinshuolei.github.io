<template>
  <v-container class="container">
    <!-- <h3 class="text-h4 title">Experience</h3> -->
    <project-card
      v-for="project in allProjects"
      :key="project"
      :name="project.name"
      :date="project.date"
      :skills="project.skills"
      :description="project.description"
      :background="project.background"
      :links="project.links" 
    />
  </v-container>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
const allProjects = [
  {
    name: "MapleJuice - Distributed Batch Processing",
    date: "AUG 2023 - DEC 2023",
    skills: ["Golang", "Socket Programming", "Distributed Systems"],
    description: "Worked with a teammate to implement a simplified Golang version of Hadoop MapReduce, named MapleJuice.\
      Alongside MapleJuice, developed the underlying distributed file system, utilizing a gossip-based protocol for efficient \
      failure detection and membership management while keeping bandwidth usage minimal. This system is capable of tolerating \
      up to three consecutive failures through file replication. \n \
      Furthermore, incorporated a distributed log querier using Golang RPC, designed to serve a 60MB+ file on each node, \
      thereby simplifying the debugging process.",
    background: "distributed-dark.png",
  },
  {
    name: "LeNet-5 Convolutional Layer Optimization",
    date: "AUG 2023 - DEC 2023",
    skills: ["CUDA", "Nsight Compute", "C++", "Parallel Programming"],
    description: "Optimized the forward pass of convolutional layers in a modified LeNet-5 CNN using CUDA with various techniques. \
        Performed profiling on the Fashion MNIST dataset using Nsight Compute and compared it against the CPU baseline \
        implementation to analyze the effects of different techniques.",
    background: "cuda-dark.png",
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
