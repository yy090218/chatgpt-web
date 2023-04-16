<script lang="ts" setup>
import { NButton, NCheckbox } from 'naive-ui'
import { computed, ref } from 'vue'
import { SvgIcon } from '@/components/common'
import { t } from '@/locales'

interface Emit {
  (e: 'update:prompt', value: string): void
}

const emit = defineEmits<Emit>()

/** 问题模板 */
const QUESTION_TEMPLATE = computed(() => [
  { label: t('introduction.promptQ1'), value: t('introduction.promptQ1') },
  { label: t('introduction.promptQ2'), value: t('introduction.promptQ2') },
  { label: t('introduction.promptQ3'), value: t('introduction.promptA3') },
  { label: t('introduction.promptQ4'), value: t('introduction.promptQ4') },
  { label: t('introduction.promptQ5'), value: t('introduction.promptA5') },
  { label: t('introduction.promptQ6'), value: t('introduction.promptA6') },
  { label: t('introduction.promptQ7'), value: t('introduction.promptA7') },
  { label: t('introduction.promptQ8'), value: t('introduction.promptA8') },
])

/** 不再展示 */
const NO_LONGER_DISPLAYED_CACHE_KEY = 'NO_LONGER_DISPLAYED_CACHE_KEY'
const cache = window.localStorage.getItem(NO_LONGER_DISPLAYED_CACHE_KEY)
const defaultNoLongerDisplayed = cache ? JSON.parse(cache) : false
const noLongerDisplayedRef = ref(defaultNoLongerDisplayed)

/**
 * 记住用户选择
 */
function setNoLongerDisplayedToCache(checked: boolean) {
  window.localStorage.setItem(NO_LONGER_DISPLAYED_CACHE_KEY, JSON.stringify(checked))
}

/**
 * 广播到父级
 * @param value 当前提示值
 */
function emitToParent(value: string) {
  emit('update:prompt', value)
}
</script>

<template>
  <section v-if="!defaultNoLongerDisplayed" class="text-center p-4">
    <p class="mb-6">
      <span class="text-3xl font-medium block mb-2">{{ $t('introduction.fastLearnGPT') }}</span>
      <NCheckbox v-model:checked="noLongerDisplayedRef" @update:checked="setNoLongerDisplayedToCache">
        {{ $t('introduction.noDisplay') }}
      </NCheckbox>
    </p>
    <p class="font-medium mb-2 text-base text-green-700 flex items-center before:content-[''] before:flex-1 before:h-px before:border-t before:border-dashed before:border-gray-400 before:mr-4 after:content-[''] after:flex-1 after:h-px after:border-t after:border-dashed after:border-gray-400 after:ml-4">
      {{ $t('introduction.whatGPT') }}
    </p>
    <p class="mb-10 text-gray-400 text-justify" style="text-align-last: center;">
      {{ $t('introduction.whatGPTAnswer') }}
    </p>
    <p class="font-medium mb-2 text-base text-green-700 flex items-center before:content-[''] before:flex-1 before:h-px before:border-t before:border-dashed before:border-gray-400 before:mr-4 after:content-[''] after:flex-1 after:h-px after:border-t after:border-dashed after:border-gray-400 after:ml-4">
      {{ $t('introduction.clickToTry') }}
    </p>
    <div class="flex flex-wrap justify-center">
      <NButton v-for="item in QUESTION_TEMPLATE" :key="item.label" class="!mr-3 !mb-3" type="tertiary" style="width: fit-content;" @click="emitToParent(item.value)">
        {{ item.label }}
      </NButton>
    </div>
  </section>
  <div v-else class="flex items-center justify-center mt-4 text-center text-neutral-300">
    <SvgIcon icon="ri:bubble-chart-fill" class="mr-2 text-3xl" />
    <span>Aha~</span>
  </div>
</template>
