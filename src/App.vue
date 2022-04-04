<template>
  <h1 style="text-align: center; margin-bottom: 2rem">Songs</h1>
  <div v-for="({ title, artist, tracks, price }, index) in albums" :key="title">
    <div class="album">
      <div style="margin-bottom: 0.25rem">
        <b>{{ title }}</b>
      </div>
      <div>{{ artist }}</div>
      <button @click="showPrice(index)">
        {{ price ?? "Show Price" }}
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 5%">#</th>
          <th style="width: 80%">Title</th>
          <th style="text-align: center">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ name, duration }, index) in tracks" :key="name">
          <td>{{ index + 1 }}</td>
          <td>{{ name }}</td>
          <td style="text-align: center">
            {{ getHumanReadableDuration(duration) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import * as Vue from "vue";
import getPrice from "./api/getPrice";

interface Track {
  name: string;
  duration: number;
}

interface Album {
  title: string;
  artist: string;
  price?: string;
  tracks: Track[];
}

const padDuration = (duration: number) => duration.toString().padStart(2, "0");

export default Vue.defineComponent({
  data: () => ({
    albums: [
      {
        artist: "Sofiane Pamart",
        price: undefined,
        tracks: [
          { name: "La Havane", duration: 185 },
          { name: "Le Caire", duration: 206 },
          { name: "Seoul", duration: 212 },
          { name: "Bora Bora", duration: 129 },
          { name: "Chicago", duration: 255 },
          { name: "Carthage", duration: 162 },
          { name: "Sicilia", duration: 266 },
          { name: "Paris", duration: 212 },
          { name: "Nagasaki", duration: 186 },
          { name: "Alaska", duration: 240 },
          { name: "Medellin", duration: 374 },
          { name: "Planet", duration: 151 },
        ],
      },
      {
        title: "The Golden Age",
        artist: "Woodkid",
        price: undefined,
        tracks: [
          { name: "The Golden Age", duration: 224 },
          { name: "Run Boy Run", duration: 213 },
          { name: "The Great Escape", duration: 195 },
          { name: "Boat Song", duration: 270 },
          { name: "I Love You", duration: 230 },
          { name: "The Shore", duration: 253 },
          { name: "Ghost Lights", duration: 220 },
          { name: "Shadows", duration: 124 },
          { name: "Stabat Mater", duration: 169 },
          { name: "Conquest Of Spaces", duration: 269 },
          { name: "Falling", duration: 43 },
          { name: "Where I Live", duration: 264 },
          { name: "Iron", duration: 201 },
          { name: "The Other Side", duration: 221 },
        ],
      },
    ] as Album[],
  }),

  methods: {
    async showPrice(id: any) {
      const price = await getPrice(id);
      const euros = Math.floor(price / 100);
      const cents = price % 100;
      this.albums[id].price = `${euros}.${cents}€`;
    },

    getHumanReadableDuration(duration: number) {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;

      return `${padDuration(minutes)}:${padDuration(seconds)}`;
    },
  },
});
</script>

<style lang="scss" scope>
#app {
  margin-top: 60px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

button {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
}

.album {
  position: relative;
  padding: 1rem 1.25rem;
  background-color: black;
  color: white;
}
</style>
