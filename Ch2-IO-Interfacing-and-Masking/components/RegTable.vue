<!--
  8-bit register table, like the Beamer slides:
    <RegTable label="DDRB =" bits="11110000" />
    <RegTable label="PortB =" bits="11110000" prefix="P" />
    <RegTable label="OUTPUT =" bits="10000111" prefix="B" :red="[2]" />
  bits   : 8 characters, written MSB first (bit 7 … bit 0)
  prefix : header letter (D / P / B …)
  red    : bit numbers whose value is shown in red
-->
<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: { type: String, default: '' },
  bits: { type: String, required: true },
  prefix: { type: String, default: 'D' },
  red: { type: Array, default: () => [] },
})
const cells = computed(() =>
  props.bits.split('').map((v, i) => ({ name: props.prefix + (7 - i), value: v, red: props.red.includes(7 - i) })),
)
</script>

<template>
  <div class="regtable">
    <span v-if="label" class="regtable-label">{{ label }}</span>
    <table>
      <thead>
        <tr><th v-for="c in cells" :key="c.name">{{ c.name }}</th></tr>
      </thead>
      <tbody>
        <tr><td v-for="c in cells" :key="c.name" :class="{ 'reg-red': c.red }">{{ c.value }}</td></tr>
      </tbody>
    </table>
  </div>
</template>
