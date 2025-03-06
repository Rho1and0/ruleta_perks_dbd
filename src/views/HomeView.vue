<template>
  <div class="home">
    <v-app>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="3">
              <div class="perks-wrapper">
                <Carousel ref="perk1" v-bind="carouselConfig" v-model="positions[0]">
                  <Slide v-for="(slide, idx) in perks" :key="idx">
                    <div class="perk-wrapper">
                      <img width="100px" height="100px" :src="slide.icon_name">
                    </div>
                  </Slide>
                </Carousel>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="perks-wrapper">
                <Carousel ref="perk2" v-bind="carouselConfig" v-model="positions[1]">
                  <Slide v-for="(slide, idx) in perks" :key="idx">
                    <div class="perk-wrapper">
                      <img width="100px" height="100px" :src="slide.icon_name">
                    </div>
                  </Slide>
                </Carousel>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="perks-wrapper">
                <Carousel ref="perk3" v-bind="carouselConfig" v-model="positions[2]">
                  <Slide v-for="(slide, idx) in perks" :key="idx">
                    <div class="perk-wrapper">
                      <img width="100px" height="100px" :src="slide.icon_name">
                    </div>
                  </Slide>
                </Carousel>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="perks-wrapper">
                <Carousel ref="perk4" v-bind="carouselConfig" v-model="positions[3]">
                  <Slide v-for="(slide, idx) in perks" :key="idx">
                    <div class="perk-wrapper">
                      <img width="100px" height="100px" :src="slide.icon_name">
                    </div>
                  </Slide>
                </Carousel>
              </div>
            </v-col>
          </v-row>
          <v-row justify-center>
            <v-btn @mousedown="turnround" @mouseup="stopTurnround" @mouseleave="stopTurnround">Jugar</v-btn>
          </v-row>
        </v-container>
      </v-main>
      <v-dialog transition="dialog-top-transition" v-model="showResult">
          <v-card>
            <v-card-text>
              <v-row justify="center">
                <v-col cols="6" md="3">
                  <div class="perk-img-result">
                    <v-row justify="center" style="width: 100%;">
                      <v-img style="max-width: 200px" :src="perks[positions[0]]?.icon_name"></v-img>
                    </v-row>
                    <p class="text-center">[MEX]: <strong class="text-warning">{{ perks[positions[0]]?.name_mx }}</strong></p>
                    <p class="text-center">[ENG]: <strong class="text-warning">{{ perks[positions[0]]?.name_en }}</strong></p>
                    <p class="text-center"><small>{{ perks[positions[0]]?.surv }}</small></p>
                  </div>
                </v-col>
                <v-col cols="6" md="3">
                  <div class="perk-img-result">
                    <v-row justify="center" style="width: 100%;">
                      <v-img style="max-width: 200px" :src="perks[positions[1]]?.icon_name"></v-img>
                    </v-row>
                    <p class="text-center">[MEX]: <strong class="text-warning">{{ perks[positions[1]]?.name_mx }}</strong></p>
                    <p class="text-center">[ENG]: <strong class="text-warning">{{ perks[positions[1]]?.name_en }}</strong></p>
                    <p class="text-center"><small>{{ perks[positions[1]]?.surv }}</small></p>
                  </div>
                </v-col>
                <v-col cols="6" md="3">
                  <div class="perk-img-result">
                    <v-row justify="center" style="width: 100%;">
                      <v-img style="max-width: 200px" :src="perks[positions[2]]?.icon_name"></v-img>
                    </v-row>
                    <p class="text-center">[MEX]: <strong class="text-warning">{{ perks[positions[2]]?.name_mx }}</strong></p>
                    <p class="text-center">[ENG]: <strong class="text-warning">{{ perks[positions[2]]?.name_en }}</strong></p>
                    <p class="text-center"><small>{{ perks[positions[2]]?.surv }}</small></p>
                  </div>
                </v-col>
                <v-col cols="6" md="3">
                  <div class="perk-img-result">
                    <v-row justify="center" style="width: 100%;">
                      <v-img style="max-width: 200px" :src="perks[positions[3]]?.icon_name"></v-img>
                    </v-row>
                    <p class="text-center">[MEX]: <strong class="text-warning">{{ perks[positions[3]]?.name_mx }}</strong></p>
                    <p class="text-center">[ENG]: <strong class="text-warning">{{ perks[positions[3]]?.name_en }}</strong></p>
                    <p class="text-center"><small>{{ perks[positions[3]]?.surv }}</small></p>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn text="Cerrar" @click="showResult = false"></v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'


const perks = ref([])

const showResult = ref(false)
const intervalId = ref(null)
const perk1 = ref(null)
const perk2 = ref(null)
const perk3 = ref(null)
const perk4 = ref(null)
const carouselConfig = {
  dir: 'btt',
  itemsToShow: 2,
  snapAlign: 'center',
  gap: 5,
  height: '200px',
  transition: 600,
  wrapAround: true
}

// 3 carretes para la máquina tragamonedas
const positions = ref([0, 1, 2, 3])

onMounted(() => {
  loadPerksSurvis();
})

const randPerk = (INDEX) => {
  const extraShift = Math.floor(Math.random() * (perks.value.length*3));
  return (positions.value[INDEX] + extraShift) % perks.value.length;
}

// Función para iniciar el giro
const spin = () => {
  const finalInds = [randPerk(0), randPerk(1), randPerk(2), randPerk(3)]

  console.log(positions.value, finalInds);
  intervalId.value = setInterval(() => {
      finalInds.forEach( (val, INDEX) => {
      positions.value[INDEX]++;
      finalInds[INDEX]--;
      if(finalInds[INDEX] === 0) {
        clearInterval(intervalId.value);
        intervalId.value = null;
        showResult.value = true;
      }
    })
  }, 60);
}

const turnround = () => {
  intervalId.value = setInterval(() => {
    positions.value[0]++;
    positions.value[1]++;
    positions.value[2]++;
    positions.value[3]++;
  }, 60); // Ajusta el tiempo a tu gusto (en milisegundos)
}

const stopTurnround = () => {
  if(intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
    spin();
  }
}

const loadPerksSurvis = () => {
  axios.get('/perks.json')
    .then(response => {
      perks.value = response.data
      setTimeout( () => {
        positions.value = [randPerk(0), randPerk(1), randPerk(2), randPerk(3)]
      }, 300)
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error)
    })
}

</script>
