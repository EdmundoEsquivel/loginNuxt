<template>
  <div class="container">
    <section>
      <h1>Pagina de Cuenta</h1>
    </section>
  </div>
</template>

<script>
export default {

    fetch({store,redirect}) {
        if (
        !store.state.user ||
        (store.state.user && store.state.user.isAutenticated === false)
    ){
        return redirect('../register')
    }

    }

}
</script>

<style></style>
