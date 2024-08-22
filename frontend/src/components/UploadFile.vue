<template>
  <div>
    <h2>Upload File</h2>
    <form @submit.prevent="uploadFile">
      <input type="file" @change="onFileChange" />
      <button type="submit">Upload</button>
    </form>
    <ul>
      <li v-for="file in files" :key="file">
        <a :href="file" target="_blank">{{ file }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      files: []
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) return alert('No file selected');
      const formData = new FormData();
      formData.append('file', this.file);
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const result = await response.json();
        this.files.push(result.fileUrl);
      } else {
        const result = await response.json();
        alert(result.error);
      }
    }
  },
  async created() {
    const response = await fetch('/api/files');
    this.files = await response.json();
  }
};
</script>
