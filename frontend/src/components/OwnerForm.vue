<template>
  <div>
    <h2>{{ isEdit ? 'Edit' : 'Create' }} Owner</h2>
    <form @submit.prevent="submitForm">
      <input v-model="owner.name" placeholder="Name" required />
      <select v-model="owner.entityType">
        <option value="">Select Entity Type</option>
        <option v-for="type in entityTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <select v-model="owner.ownerType">
        <option value="">Select Owner Type</option>
        <option v-for="type in ownerTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <input v-model="owner.address" placeholder="Address" required />
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      owner: {
        name: '',
        entityType: '',
        ownerType: '',
        address: ''
      },
      isEdit: false,
      entityTypes: ['Company', 'Individual', 'Investor', 'Trust'],
      ownerTypes: ['Competitor', 'Seller', 'Investor', 'Professional']
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      const response = await fetch(`/api/owners/${this.$route.params.id}`);
      this.owner = await response.json();
    }
  },
  methods: {
    async submitForm() {
      const token = localStorage.getItem('token');
      const method = this.isEdit ? 'PUT' : 'POST';
      const response = await fetch(`/api/owners${this.isEdit ? '/' + this.$route.params.id : ''}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.owner)
      });
      if (response.ok) {
        this.$router.push('/owners');
      } else {
        const result = await response.json();
        alert(result.error);
      }
    }
  }
};
</script>
