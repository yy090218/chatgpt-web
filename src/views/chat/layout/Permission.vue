<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NInput, NModal, NTable, useMessage } from 'naive-ui'
import { fetchVerify } from '@/api'
import { useAuthStore } from '@/store'
import { t } from '@/locales'

interface Props {
  visible: boolean
}

defineProps<Props>()

const authStore = useAuthStore()

const ms = useMessage()

const loading = ref(false)
const token = ref('')

const disabled = computed(() => !token.value.trim() || loading.value)

const modalMaxHeight = computed(() => window.innerHeight * 0.8)

/** 售价列表 */
const PRICE_LIST = computed(() => [
  { price: t('common.saleFreeType'), gpt4Price: t('common.saleFreeType'), tokenCount: 5000 },
  { price: 5, gpt4Price: 30, tokenCount: 25000 },
  { price: 10, gpt4Price: 55, tokenCount: 55000 },
  { price: 20, gpt4Price: 105, tokenCount: 115000 },
  { price: 50, gpt4Price: 255, tokenCount: 290000 },
  { price: 100, gpt4Price: 500, tokenCount: 600000 },
])

/** 推荐人，默认为站长 */
const referrer = computed(() => window.location.host.split('.').slice(-3, -2)[0] || 'admin')

async function handleVerify() {
  const secretKey = token.value.trim()

  if (!secretKey)
    return

  try {
    loading.value = true
    await fetchVerify(secretKey)
    authStore.setToken(secretKey)
    ms.success('success')
    window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    token.value = ''
  }
  finally {
    loading.value = false
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <NModal class="overflow-y-auto" :show="visible" :style="`width: 90%; max-width: 700px; max-height: ${modalMaxHeight}px;`">
    <div class="flex flex-wrap justify-between p-8 pb-4 bg-white rounded dark:bg-slate-800">
      <div class="flex-1 flex flex-col justify-between mb-4 mx-auto space-y-4 min-w-[250px] max-w-[280px]">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            {{ $t('common.unauthorizedOrInsufficientBalanceTips') }}
          </h2>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('common.unauthorizedOrInsufficientBalanceHelperTips') }}
          </p>
        </header>
        <div class="flex justify-between">
          <img width="130" height="130" :src="`https://chatgpt-1258090505.cos.ap-chengdu.myqcloud.com/${referrer}/wechat-contact.png`" alt="微信号: 18500510050">
          <img width="130" height="130" :src="`https://chatgpt-1258090505.cos.ap-chengdu.myqcloud.com/${referrer}/wechat-pay.png`" alt="微信付款二维码">
        </div>
        <NInput v-model:value="token" class="mt-auto" type="password" placeholder="" show-password-on="click" @keypress="handlePress" />
        <NButton
          block
          type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="handleVerify"
        >
          {{ $t('common.verify') }}
        </NButton>
      </div>

      <!-- 售价表 -->
      <div class="flex-1 space-y-4 mb-4 mx-auto min-w-[250px] max-w-[320px]">
        <NTable single-column :single-line="false">
          <thead>
            <tr class="align-baseline">
              <th>
                {{ $t('common.saleTokenCount') }}
                <span class="block text-xs text-gray-500 dark:text-gray-300 leading-none">
                  {{ $t('common.saleLongTerm') }}
                </span>
              </th>
              <th class="!bg-green-50 dark:!bg-green-700 font-medium">
                {{ $t('common.salePrice') }}
                <span class="block text-xs text-gray-500 dark:text-gray-300 leading-none">
                  GPT-3.5
                </span>
              </th>
              <th class="!bg-green-50 dark:!bg-green-700 font-medium">
                {{ $t('common.salePrice') }}
                <span class="block text-xs text-gray-500 dark:text-gray-300 leading-none">
                  GPT-4
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in PRICE_LIST" :key="item.price">
              <td>{{ item.tokenCount }}</td>
              <td class="!bg-green-50 dark:!bg-green-700 font-medium">
                {{ item.price }}
                {{ typeof item.price === 'number' ? $t('common.salePriceUnit') : '' }}
              </td>
              <td class="!bg-green-50 dark:!bg-green-700 font-medium">
                {{ item.gpt4Price }}
                {{ typeof item.gpt4Price === 'number' ? $t('common.salePriceUnit') : '' }}
              </td>
            </tr>
          </tbody>
        </NTable>
      </div>
    </div>
  </NModal>
</template>
