<template>
  <h1 style="text-align: center; margin-bottom: 2rem">Songs</h1>
  <div v-for="({ title, artist, tracks, price }, index) in albums">
    <div
      style="
        position: relative;
        padding: 1rem 1.25rem;
        background-color: black;
        color: white;
      "
    >
      <div style="margin-bottom: 0.25rem">
        <b>{{ title }}</b>
      </div>
      <div>{{ artist }}</div>
      <button @click="showPrice(index)">
        {{ price ? price : "Show Price" }}
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
        <tr v-for="({ name, duration }, index) in tracks">
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

interface Album {
  title: string;
  artist: string;
  price?: string;
  tracks: Record<string, any>[];
}

export default Vue.defineComponent({
  data: (): {
    albums: Album[];
  } => ({
    albums: [
      {
        title: "PLANET GOLD",
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
    ],
  }),

  methods: {
    showPrice(id: any) {
      getPrice(id)
        .then((price) => {
          return { euros: Math.floor(price / 100), cents: price % 100 };
        })
        .then(({ euros, cents }) => {
          this.albums[id].price = [euros, cents].join(".") + `€`;
        });
    },

    getHumanReadableDuration(duration: number) {
      let m = Math.floor(duration / 60);
      var s: number = duration % 60;

      return (
        m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0")
      );
    },
  },
});
</script>

<style lang="scss">
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
</style>
