<template>
  <div class="home">
    <v-app>
      <v-main>
        <v-container>
          <v-list density="compact">
            <v-list-item
              v-for="(perk, index) in perks"
              :key="index"
              :title="perk.name_en"
              :subtitle="perk.surv"
            >
            <template v-slot:prepend>
              <v-list-item-avatar>
                <a :href="perk.icon" target="_blank"><img height="42px" :src="perk.icon_name" alt="icono" /></a>
              </v-list-item-avatar>
            </template>
            <v-divider></v-divider>
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

</script>
