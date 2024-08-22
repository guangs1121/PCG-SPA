<template>
  <div>
    <h2>{{ isEdit ? 'Edit' : 'Create' }} Land Holding</h2>
    <form @submit.prevent="submitForm">
      <input v-model="landHolding.name" placeholder="Name" required />
      <input v-model="landHolding.legalEntity" placeholder="Legal Entity" />
      <input v-model="landHolding.netMineralAcres" placeholder="Net Mineral Acres" type="number" />
      <input v-model="landHolding.mineralOwnerRoyalty" placeholder="Mineral Owner Royalty (%)" type="number" />
      <input v-model="landHolding.sectionName" placeholder="Section Name" />
      <input v-model="landHolding.section" placeholder="Section (3 characters)" />
      <input v-model="landHolding.township" placeholder="Township (4 characters)" />
      <input v-model="landHolding.range" placeholder="Range (4 characters)" />
      <select v-model="landHolding.titleSource">
        <option value="">Select Title Source</option>
        <option v-for="source in titleSources" :key="source" :value="source">{{ source }}</option>
      </select>
      <select v-model="landHolding.owner">
        <option v-for="owner in owners" :key="owner._id" :value="owner._id">{{ owner.name }}</option>
      </select>
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      landHolding: {
        name: '',
        legalEntity: '',
        netMineralAcres: '',
        mineralOwnerRoyalty: '',
        sectionName: '',
        section: '',
        township: '',
        range: '',
        titleSource: '',
        owner: ''
      },
      isEdit: false,
      titleSources: ['Class A', 'Class B', 'Class C', 'Class D'],
      owners: []
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      const response = await fetch(`/api/landholdings/${this.$route.params.id}`);
      this.landHolding = await response.json();
    }
    const ownersResponse = await fetch('/api/owners');
    this.owners = await ownersResponse.json();
  },
  methods: {
    async submitForm() {
      const token = localStorage.getItem('token');
      const method = this.isEdit ? 'PUT' : 'POST';
      const response = await fetch(`/api/landholdings${this.isEdit ? '/' + this.$route.params.id : ''}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.landHolding)
      });
      if (response.ok) {
        this.$router.push('/landholdings');
      } else {
        const result = await response.json();
        alert(result.error);
      }
    }
  }
};
</script>
