<template>
  <app>
    <div class="d-flex flex-column align-items-center">
      <p>{{ msg }}</p>
      <button @click="updateVenue">updateVenue</button>
      <button @click="deleteVenue">deleteVenue</button>
      <input
        type="file"
        accept="image/png, image/jpeg, image/bmp"
        @change="onTargetFileChanged"
      />
      <button @click="updateTarget">updateTarget</button>
      <button @click="deleteTarget">deleteTarget</button>
      <button @click="getTargets">getTargets</button>
      <div v-for="(t, i) in targets" :key="i">
        {{ t.title }}<img :src="t.image" />
      </div>
    </div>
  </app>
</template>

<script setup lang="ts">
const msg = ref("--");
const tmp = ref<File | null>(null);
const venue = ref("a");
const targets = ref([]);
const no = ref(1);
const target = reactive({
  no: no,
  title: "1",
  lat: "1",
  lng: "1",
  comments: "1",
  base64: "",
});

const getVenues = async () => {
  const { data: res } = await useFetch("/api/GetVenues", {
    method: "GET",
  });
  console.log(res.value);
  msg.value = res.value?.venues;
};

const updateVenue = async () => {
  const { data: res } = await useFetch("/api/UpdateVenue", {
    method: "POST",
    body: { venue: venue },
  });
};

const deleteVenue = async () => {
  const { data: res } = await useFetch("/api/DeleteVenue", {
    method: "POST",
    body: { venue: venue },
  });
};

const getTargets = async () => {
  const { data: res } = await useFetch("/api/GetTargets", {
    method: "GET",
    params: { venue: venue },
  });
  console.log(res.value);
  targets.value = res.value?.targets;
};

const updateTarget = () => {
  const reader = new FileReader();
  reader.readAsDataURL(tmp.value);

  reader.onload = async (e: any) => {
    target.base64 = e.currentTarget.result;
    const { data: res } = await useFetch("/api//UpdateTarget", {
      method: "POST",
      body: { venue: venue, target: target },
    });
    no.value++;
  };
};

const deleteTarget = async () => {
  const { data: result } = await useFetch(
    "http://localhost:3001/delete-target",
    {
      method: "POST",
      body: { venue: venue, target: target },
    }
  );
};

const onTargetFileChanged = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  const file = files![0];
  tmp.value = file;
};

getVenues();
</script>

<style scoped lang="scss"></style>
