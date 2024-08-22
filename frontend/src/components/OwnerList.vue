<template>
  <div>
    <h2>Owners</h2>
    <ul>
      <li v-for="owner in owners" :key="owner._id">
        {{ owner.name }} - {{ owner.address }}
        <router-link :to="`/owners/edit/${owner._id}`">Edit</router-link>
        <button @click="deleteOwner(owner._id)">Delete</button>
      </li>
    </ul>
    <router-link to="/owners/new">Create New Owner</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      owners: []
    };
  },
  methods: {
    async deleteOwner(id) {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/owners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        this.owners = this.owners.filter(owner => owner._id !== id);
      } else {
        const result = await response.json();
        alert(result.error);
      }
    }
  },
  async created() {
    const response = await fetch('/api/owners');
    this.owners = await response.json();
  }
};
</script>
