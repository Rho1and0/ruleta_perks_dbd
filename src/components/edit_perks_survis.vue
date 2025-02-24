<template>
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
</template>