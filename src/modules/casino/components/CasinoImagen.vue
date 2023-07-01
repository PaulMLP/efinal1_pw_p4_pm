<template>
  <div class="imagen">
    <img :src="imagen" alt="no se pudo cargar la imagen" />
    <h2>{{ nombre }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    imagen: {
      type: String,
      required: false,
    },
    nombre: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.imagen {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 33%;
  height: 90%;
}
img {
  width: 200px;
  height: 250px;
}
</style>
