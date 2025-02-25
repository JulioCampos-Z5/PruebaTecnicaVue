<template>
  <div>
    <button class="btn btn-secondary mb-3" @click="goBack">Volver</button>
    <div v-if="loading" class="alert alert-info">Cargando detalles del usuario...</div>
    <div v-else>
      <h2>{{ user.name }}</h2>
      <p><strong>Nombre:</strong> {{ user.username }}</p>
      <p><strong>Correo:</strong> {{ user.email }}</p>
      <p><strong>Teléfono:</strong> {{ user.phone }}</p>
      <p><strong>Sito Web:</strong> {{ user.website }}</p>
      <p v-if="user.company"><strong>Empresa:</strong> {{ user.company.name }}</p>
      <p v-if="user.company"><strong>Palabra Clave:</strong> {{ user.company.catchPhrase }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UserDetails',
  props: ['id'],
  setup(props) {
    const user = ref(null)
    const loading = ref(true)
    const router = useRouter()

    const fetchUser = async () => {
      loading.value = true
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${props.id}`)
        user.value = await res.json()
      } catch (error) {
        console.error('Error al obtener el usuario:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchUser()
    })

    watch(() => props.id, () => {
      fetchUser()
    })

    const goBack = () => {
      router.push('/')
    }

    return {
      user,
      loading,
      goBack
    }
  }
}
</script>

<style scoped></style>