<template>
  <div>
    <h1>El Gran Libro de Retos Buyanger</h1>
    <p>
      Cargando...
    </p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  // middleware: 'auth',
  layout: 'empty',
  created () {
    return this.$router.replace('/challenges')
  }
}
</script>
