<template>
  <v-container class="white mt-1">
      <Inventory />
  </v-container>
</template>

<script>
import BanerBlock from '~/components/BanerBlock.vue';
import Inventory from '@/components/Inventory.vue';
export default {
    data() {
        return {
        }
    },
    components: { BanerBlock, Inventory }
};
</script>      