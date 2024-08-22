<template>
  <div>
    <h2>Land Holdings</h2>
    <ul>
      <li v-for="landHolding in landHoldings" :key="landHolding._id">
        {{ landHolding.name }} - {{ landHolding.sectionName }}
        <router-link :to="`/landholdings/edit/${landHolding._id}`">Edit</router-link>
        <button @click="deleteLandHolding(landHolding._id)">Delete</button>
      </li>
    </ul>
    <router-link to="/landholdings/new">Create New Land Holding</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      landHoldings: []
    };
  },
  methods: {
    async deleteLandHolding(id) {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/landholdings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        this.landHoldings = this.landHoldings.filter(landHolding => landHolding._id !== id);
      } else {
        const result = await response.json();
        alert(result.error);
      }
    }
  },
  async created() {
    const response = await fetch('/api/landholdings');
    this.landHoldings = await response.json();
  }
};
</script>
