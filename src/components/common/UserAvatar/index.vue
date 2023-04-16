<script setup lang='ts'>
import { computed } from 'vue'
import { NAvatar, NPopover } from 'naive-ui'
import { SvgIcon } from '@/components/common'
import { useAuthStore, useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'

const userStore = useUserStore()
const authStore = useAuthStore()

const userInfo = computed(() => userStore.userInfo)
const balance = computed(() => {
  if (authStore.balance === null)
    return '--'

  if (authStore.balance < 1000)
    return authStore.balance.toString()

  return `${+(authStore.balance / 1000).toFixed(1)}k`
})
</script>

<template>
  <div class="flex items-center overflow-hidden">
    <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <NAvatar
          size="large"
          round
          :src="userInfo.avatar"
          :fallback-src="defaultAvatar"
        />
      </template>
      <template v-else>
        <NAvatar size="large" round :src="defaultAvatar" />
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2">
      <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
        {{ userInfo.name ?? 'ChenZhaoYu' }}
      </h2>
      <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap flex items-center">
        <span
          v-if="isString(userInfo.balanceDescription) && userInfo.balanceDescription !== ''"
          v-html="userInfo.balanceDescription.replace('$balance', balance)"
        />
        <NPopover trigger="hover" placement="top-start" class="max-w-lg" style="padding-top: 1rem;">
          <template #trigger>
            <svg class="ml-1 cursor-pointer" width="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M11.5 2A2.5 2.5 0 0 1 14 4.5v1.757A5.478 5.478 0 0 0 10.5 5H13v-.5A1.5 1.5 0 0 0 11.5 3h-7A1.5 1.5 0 0 0 3 4.5V5h7.5c-1.177 0-2.268.37-3.163 1H3v5.5A1.5 1.5 0 0 0 4.5 13h1.1c.183.358.404.693.657 1H4.5A2.5 2.5 0 0 1 2 11.5v-7A2.5 2.5 0 0 1 4.5 2h7zm3.5 8.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0zm-4.5 1.88a.624.624 0 1 0 0 1.25a.624.624 0 0 0 0-1.25zm0-4.877c-1.048 0-1.864.818-1.853 1.955a.5.5 0 0 0 1-.01c-.006-.579.36-.945.853-.945c.472 0 .853.392.853.95c0 .202-.07.315-.36.544l-.277.215c-.506.404-.716.717-.716 1.288a.5.5 0 0 0 .992.09l.011-.156c.017-.148.1-.254.346-.448l.277-.215c.513-.41.727-.732.727-1.318c0-1.104-.822-1.95-1.853-1.95z" fill="currentColor" /></g></svg>
          </template>
          <div>
            <p class="block font-medium">
              {{ $t('userAccountInfo.question1') }}
            </p>
            <ol class="list-decimal pl-9 mb-4 text-gray-500">
              <li>
                {{ $t('userAccountInfo.question1Answer1') }}
              </li>
              <li>
                {{ $t('userAccountInfo.question1Answer2Before') }}
                <SvgIcon class="inline-block align-text-bottom text-[#4b9e5f]" icon="ri:chat-history-line" />
                {{ $t('userAccountInfo.question1Answer2After') }}
              </li>
            </ol>
            <p class="block font-medium">
              {{ $t('userAccountInfo.question2') }}
            </p>
            <ol class="list-decimal pl-9 text-gray-500">
              <li>
                {{ $t('userAccountInfo.question2Answer1') }}
              </li>
              <li>
                {{ $t('userAccountInfo.question2Answer2') }}
              </li>
              <li>
                {{ $t('userAccountInfo.question2Answer3') }}
              </li>
              <li>
                {{ $t('userAccountInfo.question2Answer4') }}
              </li>
            </ol>
          </div>
        </NPopover>
      </p>
    </div>
  </div>
</template>
