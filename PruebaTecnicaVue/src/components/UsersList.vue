<template>
    <div>
      <h1 class="mb-4">Lista de Usuarios</h1>
      <div v-if="loading" class="alert alert-info">Cargando usuarios...</div>
      <ul v-else class="list-group">
        <li
          v-for="user in users"
          :key="user.id"
          class="list-group-item list-group-item-action"
          @click="selectUser(user.id)"
          style="cursor:pointer;"
        >
          {{ user.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'UsersList',
    setup() {
      const users = ref([])
      const loading = ref(true)
      const router = useRouter()
  
      const fetchUsers = async () => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/users')
          users.value = await res.json()
        } catch (error) {
          console.error('Error al obtener usuarios:', error)
        } finally {
          loading.value = false
        }
      }
  
      const selectUser = (id) => {
        router.push(`/user/${id}`)
      }
  
      onMounted(() => {
        fetchUsers()
      })
  
      return {
        users,
        loading,
        selectUser
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  