<script setup lang="ts">
import { storeToRefs } from "pinia";
import usePostStore from "./stores";
const store = usePostStore();
const { isLoading, error, resultData } = storeToRefs(store);

let countId = 1;
const increase = () => {
  store.increaseData(countId);
  countId++;
  console.log(resultData.value);
};
</script>

<template>
  <div>
    <button type="button" @click="increase()">load test</button>
    <p v-if="isLoading">Loading</p>
    <p v-else-if="error">{{ error.code }}::{{ error.response.status }}</p>
    <div v-else>
      <div v-if="resultData.length > 0" class="list">
        <div v-for="item in resultData" :key="item.id" class="list-item">
          <p>user id: {{ item.id }}</p>
          <p class="tit">title: {{ item.title }}</p>
          <p class="desc">description: {{ item.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
	column-gap: 10px;
}
.list-item{
    padding:10px 20px;
    border:1px solid #dedede;
    text-align:left;
    font-size:13px;
}
.bold{
   font-wegith:bold;
}
.tit{
  font-size:18px;
}
.desc{
  font-size:13px;
}
</style>
