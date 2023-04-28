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
  { price: t('common.saleFreeType'), tokenCount: 5000, validityPeriod: t('common.saleLongTerm') },
  { price: 5, tokenCount: 25000, validityPeriod: t('common.saleLongTerm') },
  { price: 10, tokenCount: 55000, validityPeriod: t('common.saleLongTerm') },
  { price: 20, tokenCount: 115000, validityPeriod: t('common.saleLongTerm') },
  { price: 50, tokenCount: 290000, validityPeriod: t('common.saleLongTerm') },
  { price: 100, tokenCount: 600000, validityPeriod: t('common.saleLongTerm') },
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
  <NModal class="overflow-y-auto" :show="visible" :style="`width: 90%; max-width: 680px; max-height: ${modalMaxHeight}px;`">
    <div class="flex flex-wrap justify-between p-8 pb-4 bg-white rounded dark:bg-slate-800">
      <div class="flex-1 flex flex-col justify-between mb-4 space-y-4 max-w-[280px]">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            {{ $t('common.unauthorizedOrInsufficientBalanceTips') }}
          </h2>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('common.unauthorizedOrInsufficientBalanceHelperTips') }}
          </p>
        </header>
        <div class="flex justify-between">
          <img width="130px" height="130px" :src="`https://chatgpt-1258090505.cos.ap-chengdu.myqcloud.com/${referrer}/wechat-contact.png`" alt="微信号: 18500510050">
          <img width="130px" height="130px" :src="`https://chatgpt-1258090505.cos.ap-chengdu.myqcloud.com/${referrer}/wechat-pay.png`" alt="微信付款二维码">
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
      <div class="flex-1 space-y-4 mb-4 max-w-[300px]">
        <NTable single-column :single-line="false">
          <thead>
            <tr class="align-baseline">
              <th>
                {{ $t('common.saleTokenCount') }}
              </th>
              <th class="!bg-green-50 dark:!bg-green-700 font-medium">
                {{ $t('common.salePrice') }}
                <span class="block text-xs text-gray-500 dark:text-gray-300 leading-none">
                  GPT-3.5
                </span>
              </th>
              <th>
                {{ $t('common.saleValidityPeriod') }}
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
              <td>{{ item.validityPeriod }}</td>
            </tr>
          </tbody>
        </NTable>
      </div>
    </div>
  </NModal>
</template>
