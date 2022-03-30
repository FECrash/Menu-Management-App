<script setup lang="ts">
import { computed, ref } from 'vue';
import MenuItem from './MenuItem.vue';
import { useMenuStore } from '@/store';

const inputName = ref('');

const menuStore = useMenuStore();
const selected = computed(() => menuStore.category);

const addMenuAction = event => {
  event.preventDefault();
  menuStore.add(inputName.value);
  inputName.value = '';
};
</script>
<template>
  <div class="flex justify-between">
    <h2 class="text-2xl mb-5 mt-1 font-bold">{{ selected.text }} 메뉴 관리</h2>
    <span class="mr-2 mt-4">총 {{ selected.menus.length }}개</span>
  </div>
  <form :id="selected.id + '-menu-form'">
    <div class="flex w-full">
      <label for="selected.id+'-menu-name'" hidden> {{ selected.text }} 메뉴 이름 </label>
      <input
        :id="selected.id + '-menu-name'"
        v-model="inputName"
        type="text"
        :name="selected.id + 'MenuName'"
        class="text-base font-normal w-full h-auto px-5 py-3 border-none outline-none rounded-[2rem] bg-[#f1f5f9]"
        :placeholder="selected.text + '이름'"
        autocomplete="off"
        @keydown="handleKeydown"
      />
      <button
        :id="selected.id + '-menu-submit-button'"
        type="submit"
        name="submit"
        class="text-base cursor-pointer min-w-[90px] h-auto px-5 py-[0.65rem] border-none outline-none rounded-[2rem] bg-green-600 ml-2"
        @click="addMenuAction"
      >
        확인
      </button>
    </div>
  </form>
  <ul :id="selected.id + '-menu-list'" class="mt-3 pl-0">
    <MenuItem />
  </ul>
</template>
