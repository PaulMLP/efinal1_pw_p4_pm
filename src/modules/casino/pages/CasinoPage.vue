<template>
  <div v-if="!mostrarMensaje" class="juego">
    <div class="texto">
      <div class="contenedor-puntaje">
        Puntaje: <span>{{ puntaje }}</span>
      </div>
      <div class="contenedor-intentos">
        Intentos: <span>{{ intentos }}</span>
      </div>
    </div>
    <div class="imagenes">
      <CasinoImagen :nombre="nombres[0]" :imagen="imagenes[0]" />
      <CasinoImagen :nombre="nombres[0]" :imagen="imagenes[1]" />
      <CasinoImagen :nombre="nombres[0]" :imagen="imagenes[2]" />
    </div>
    <button @click="mostrarImagen">JUGAR</button>
  </div>
  <div v-if="mostrarMensaje" class="mensajes">
    <div v-if="!ganar" class="mensaje-perder">
      <h2>Has utilizado tus 5 intentos</h2>
      <h2>El juego ha terminado, intentalo nuevamente</h2>
    </div>
    <div v-if="ganar" class="mensaje-ganar">
      <h2>
        Puntaje: <span>{{ puntaje }}</span>
      </h2>
      <h2>Felicitaciones has ganado un premio de $10.000,00</h2>
    </div>
    <button @click="reiniciar">Nuevo Juego</button>
  </div>
</template>

<script>
import CasinoImagen from "../components/CasinoImagen.vue";
import fachadaObtenerPokemon from "../helpers/clientePokemonAPI";

export default {
  components: { CasinoImagen },
  data() {
    return {
      mostrarMensaje: false,
      ganar: false,
      puntaje: 0,
      intentos: 0,
      nombres: ["xxxxxxxx", "xxxxxxxx", "xxxxxxxx"],
      imagenes: [
        "https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg",
        "https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg",
        "https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg",
      ],
    };
  },
  methods: {
    async mostrarImagen() {
      const pokemones = await fachadaObtenerPokemon();
      const ids = pokemones.map(({ id }) => id);

      this.nombres.splice(
        0,
        3,
        pokemones[0].name,
        pokemones[1].name,
        pokemones[2].name
      );

      this.imagenes.splice(
        0,
        3,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ids[0]}.svg`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ids[1]}.svg`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ids[2]}.svg`
      );
      console.log(this.imagenes);
      this.jugar(ids[0], ids[1], ids[2]);
      this.ganarVerificacion();
    },
    jugar(id1, id2, id3) {
      this.puntaje +=
        id1 == id2 && id2 == id3
          ? 5
          : id1 == id2 || id2 == id3 || id1 == id3
          ? 2
          : 0;
      this.intentos++;
    },
    ganarVerificacion() {
      if (this.intentos < 5) {
        if (this.puntaje >= 10) {
          this.mostrarMensaje = true;
          this.ganar = true;
        }
      } else {
        this.mostrarMensaje = true;
        this.ganar = false;
      }
    },
    reiniciar() {
      this.mostrarMensaje = false;
      this.ganar = false;
      this.puntaje = 0;
      this.intentos = 0;
      this.nombres = ["xxxxxxxx", "xxxxxxxx", "xxxxxxxx"];
      this.imagenes = [
        "https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg",
        "https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg",
        "https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg",
      ];
    },
  },
};
</script>

<style scoped>
.juego {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.imagenes {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 750px;
  height: 350px;
  padding: 10px;
  gap: 20px;
}
.texto {
  display: flex;
  gap: 40px;
}

button {
  width: 150px;
  height: 30px;
}

.mensaje-perder {
  color: red;
}

.mensaje-ganar {
  color: blue;
  animation: zoom 1s linear infinite;
}
@keyframes zoom {
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
