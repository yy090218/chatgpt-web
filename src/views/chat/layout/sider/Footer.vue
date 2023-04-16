<script setup lang='ts'>
import { defineAsyncComponent, ref } from 'vue'
import { NTooltip } from 'naive-ui'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'

const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))

const shouldDisplayAyncComponent = ref(false)
// const ayncComponentLoaded = ref(false)
const show = ref(false)

async function showModal() {
  shouldDisplayAyncComponent.value = true
  await Setting.__asyncLoader() // 等待组件加载
  setTimeout(() => {
    // ayncComponentLoaded.value = true
    show.value = true
  })
}
</script>

<template>
  <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
    <div class="flex-1 flex-shrink-0 overflow-hidden">
      <UserAvatar />
    </div>

    <NTooltip>
      <template #trigger>
        <HoverButton circle @click="showModal">
          <span class="text-xl text-[#4f555e] dark:text-white">
            <SvgIcon icon="ri:settings-4-line" />
          </span>
        </HoverButton>
      </template>
      设置
    </NTooltip>

    <Setting v-if="shouldDisplayAyncComponent" v-model:visible="show" />
  </footer>
</template>
