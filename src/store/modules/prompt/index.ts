import { defineStore } from 'pinia'
import PromptRecommend from '../../../assets/recommend.json'
import type { PromptStore } from './helper'
import { getLocalPromptList, setLocalPromptList } from './helper'

export const usePromptStore = defineStore('prompt-store', {
  state: (): PromptStore => getLocalPromptList(),

  actions: {
    updatePromptList(promptList: []) {
      this.$patch({ promptList })
      setLocalPromptList({ promptList })
    },
    getPromptList() {
      return this.$state
    },
    async initPromptList() {
      const res = await fetch(PromptRecommend[0].downloadUrl)
      const json: { act: string; prompt: string }[] = await res.json()
      const latestPromptList = json.map(item => ({ key: item.act, value: item.prompt })) as PromptStore['promptList']
      setLocalPromptList({ promptList: latestPromptList })
    },
  },
})
