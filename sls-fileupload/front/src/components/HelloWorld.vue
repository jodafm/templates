<template>
  <div class="hello">
    <h1>S3 Uploader Test</h1>

    <div v-if="!image">
      <h2>Select an image</h2>
      <input type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <img :src="image" />
      <button v-if="!uploadURL" @click="removeImage">Remove image</button>
      <button v-if="!uploadURL" @click="uploadImage">Upload image</button>
    </div>
    <h2 v-if="uploadURL">Success! Image uploaded to:</h2>
    <a :href="uploadURL">{{ uploadURL }}</a>
  </div>
</template>

<script>
import axios from "axios";
const config = {
  url: `https://i29s0ci9ak.execute-api.us-east-1.amazonaws.com/dev/signedurl`
};

const MAX_IMAGE_SIZE = 1000000;
export default {
  name: "s3uploader",
  data() {
    return {
      image: "",
      uploadURL: ""
    };
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = e => {
        if (!e.target.result.includes("data:image/jpeg")) {
          return alert("Wrong file type - JPG only.");
        }
        if (e.target.result.length > MAX_IMAGE_SIZE) {
          return alert("Image is loo large - 1Mb maximum");
        }
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function() {
      this.image = "";
    },
    uploadImage: async function() {
      // Get the presigned URL
      const response = await axios({
        method: "GET",
        url: config.url
      });

      let binary = atob(this.image.split(",")[1]);
      let array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      let blobData = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

      await fetch(response.data.uploadURL, {
        method: "PUT",
        body: blobData
      });

      // Final URL for the user doesn't need the query string params
      this.uploadURL = response.data.uploadURL.split("?")[0];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#app {
  text-align: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>