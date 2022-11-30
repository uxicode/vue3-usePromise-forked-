import { ref } from "vue";
import { defineStore } from "pinia";
import http from "../api";
import type { IPost } from "../models/IPost";

const usePostStore = defineStore("postStore", () => {
  const loadID = ref(0);
  const isLoading = ref<boolean | null>(null);
  const error = ref(null);
  const resultData = ref<IPost[]>([]);

  const fetchCall = async () => {
    isLoading.value = true;
    try {
      const response = await http.get(`/posts/${loadID.value}`);
      resultData.value.push(response.data);
      // console.log(response.data);
    } catch (err: any) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  function increaseData(id: number) {
    loadID.value = id;
    fetchCall();
  }

  return { isLoading, error, increaseData, resultData };
});

export default usePostStore;
