<template>
  <div class="home">
    <v-app>
      <v-main>
        <v-container>
          <v-btn @click="downloadAllImages" color="primary">
            Descargar Todas las Imágenes
          </v-btn>
          <v-list density="compact">
            <v-list-item
              v-for="(perk, index) in perks"
              :key="index"
            >
            <v-list-item-avatar>
              <a :href="perk.icon"><img :src="perk.icon_name" alt="icono" /></a>
            </v-list-item-avatar>
    
            <v-list-item-content>
              <v-list-item-title>{{ perk.name_en }}</v-list-item-title>
              <v-list-item-subtitle>{{ perk.surv }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          </v-list>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import * as FileSaver from 'file-saver'

const perks = ref([])

onMounted(() => {
  axios.get('/perks.json')
    .then(response => {
      perks.value = response.data
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error)
    })
})

// Función para descargar todas las imágenes
const downloadAllImages = () => {
  perks.value.forEach((perk) => {
    axios.get(perk.icon, {
      responseType: 'blob'
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.error('Error al descargar la imagen:', error)
    })
  })
}
</script>
