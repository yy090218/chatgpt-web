<script lang="ts" setup>
import { NButton, NModal, NSelect } from 'naive-ui'
import { computed, ref } from 'vue'
import Avatar from '../Message/Avatar.vue'
import { GPT_MODEL_OPTIONS } from '../../model'
import { t } from '@/locales'
import { getTokenModel } from '@/store/modules/auth/helper'

interface Emit {
  (e: 'update:prompt', value: string): void
  (e: 'update:model', value: string): void
}

const emit = defineEmits<Emit>()

const gptModel = ref<string>(getTokenModel())
const showModal = ref(false)

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

/**
 * 广播到父级
 * @param value 当前提示值
 */
function emitToParent(value: string) {
  emit('update:prompt', value)
}

/**
 * 选择 gpt-4 时提示
 */
function onChange(value: string) {
  if (value === 'gpt-4' && getTokenModel() !== value) {
    showModal.value = true
    return
  }

  gptModel.value = value
  emit('update:model', gptModel.value)
}

/**
 * 确认切换
 */
function submitCallback() {
  gptModel.value = 'gpt-4'
  emit('update:model', gptModel.value)
}
</script>

<template>
  <section class="h-full flex flex-col justify-between p-4">
    <!-- 切换 model -->
    <div class="w-full mx-auto mb-8 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <NSelect v-model:value="gptModel" :options="GPT_MODEL_OPTIONS" size="large" :on-update:value="onChange" />
    </div>

    <!-- ChatGPT 介绍 -->
    <div class="flex items-start mb-auto">
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

  <!-- 切换提醒 -->
  <NModal
    v-model:show="showModal"
    preset="dialog"
    :title="t('introduction.gpt4TipTitle')"
    :content="t('introduction.gpt4TipContent')"
    :positive-text="t('introduction.gpt4TipConfrimText')"
    :negative-text="t('introduction.gpt4TipCancelText')"
    @positive-click="submitCallback"
  />
</template>
