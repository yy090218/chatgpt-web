<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { computed } from 'vue'
import Avatar from '../Message/Avatar.vue'
import { SvgIcon } from '@/components/common'
import { t } from '@/locales'

interface Emit {
  (e: 'update:prompt', value: string): void
}

const emit = defineEmits<Emit>()

/** 问题模板 */
const QUESTION_TEMPLATE = computed(() => [
  // { label: t('introduction.promptQ1'), value: t('introduction.promptQ1') },
  { label: t('introduction.promptQ2'), value: t('introduction.promptQ2') },
  { label: t('introduction.promptQ3'), value: t('introduction.promptA3') },
  { label: t('introduction.promptQ4'), value: t('introduction.promptQ4') },
  { label: t('introduction.promptQ7'), value: t('introduction.promptA7') },
  { label: t('introduction.promptQ6'), value: t('introduction.promptA6') },
  { label: t('introduction.promptQ5'), value: t('introduction.promptA5') },
  // { label: t('introduction.promptQ8'), value: t('introduction.promptA8') },
  { label: t('introduction.promptQ9'), value: t('introduction.promptA9') },
])

/** 不再展示 */
const NO_LONGER_DISPLAYED_CACHE_KEY = 'NO_LONGER_DISPLAYED_CACHE_KEY'
const cache = window.localStorage.getItem(NO_LONGER_DISPLAYED_CACHE_KEY)
const defaultNoLongerDisplayed = cache ? JSON.parse(cache) : false

/**
 * 广播到父级
 * @param value 当前提示值
 */
function emitToParent(value: string) {
  emit('update:prompt', value)
}
</script>

<template>
  <section v-if="!defaultNoLongerDisplayed" class="h-full flex flex-col justify-between p-4">
    <!-- ChatGPT 介绍 -->
    <div class="flex items-start mb-4">
      <div class="p-0.5 mr-2 bg-black rounded-sm">
        <Avatar class="text-white" />
      </div>
      <div class="flex-1 rounded-md">
        <div class="inline-block font-medium text-2xl mb-4 bg-gradient-to-br from-purple-500 to-green-500 bg-clip-text text-transparent">
          {{ $t('introduction.gptIntro1') }}
          <div class="dark:after:text-white after:content-[''] after:inline-block after:translate-y-[4px] after:w-[4px] after:h-[24px] after:text-black after:animate-blink">
            {{ $t('introduction.gptIntro2') }}
          </div>
        </div>
        <span class="block text-gray-500 text-justify">{{ $t('introduction.gptIntro3') }}</span>
      </div>
    </div>

    <!-- 按钮交互 -->
    <div class="w-full flex flex-wrap">
      <span class="block w-full mb-2 text-gray-500">{{ $t('introduction.clickToTry') }}</span>
      <NButton v-for="item in QUESTION_TEMPLATE" :key="item.label" class="!mr-2 !mb-2 !whitespace-break-spaces !leading-4" type="tertiary" style="width: fit-content;" @click="emitToParent(item.value)">
        {{ item.label }}
      </NButton>
    </div>
  </section>
  <div v-else class="flex items-center justify-center mt-4 text-center text-neutral-300">
    <SvgIcon icon="ri:bubble-chart-fill" class="mr-2 text-3xl" />
    <span>Aha~</span>
  </div>
</template>
