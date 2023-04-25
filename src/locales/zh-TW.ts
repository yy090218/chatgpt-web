export default {
  common: {
    add: '新增',
    addSuccess: '新增成功',
    edit: '編輯',
    editSuccess: '編輯成功',
    delete: '刪除',
    deleteSuccess: '刪除成功',
    save: '儲存',
    saveSuccess: '儲存成功',
    reset: '重設',
    action: '操作',
    export: '匯出',
    exportSuccess: '匯出成功',
    import: '匯入',
    importSuccess: '匯入成功',
    clear: '清除',
    clearSuccess: '清除成功',
    yes: '是',
    no: '否',
    confirm: '確認',
    download: '下載',
    noData: '目前無資料',
    wrong: '發生錯誤，請稍後再試。',
    success: '操作成功',
    failed: '操作失敗',
    verify: '驗證',
    unauthorizedTips: '未經授權，請先進行驗證。',
    unauthorizedOrInsufficientBalanceTips: 'Traditional Chinese: 未經授權，或 token 不足',
    unauthorizedOrInsufficientBalanceHelperTips: '如需購買或做代理，請掃描下方二維碼',
    salePrice: '售價',
    salePriceUnit: '元',
    saleTokenCount: 'Token 數量',
    saleValidityPeriod: '有效期',
    saleFreeType: '免費（集讚）',
    saleLongTerm: '長期',
  },
  chat: {
    newChatButton: '新建對話',
    placeholder: '請輸入問題...（Shift + Enter = 換行，"/" 獲取模板）',
    placeholderMobile: '請輸入問題...',
    copy: '複製',
    copied: '複製成功',
    copyCode: '複製代碼',
    clearChat: '清除對話',
    clearChatConfirm: '是否清空對話?',
    exportImage: '儲存對話為圖片',
    exportImageConfirm: '是否將對話儲存為圖片?',
    exportSuccess: '儲存成功',
    exportFailed: '儲存失敗',
    usingContext: '上下文模式',
    turnOnContext: '啟用上下文模式，在此模式下，發送訊息會包含之前的聊天記錄。',
    turnOffContext: '關閉上下文模式，在此模式下，發送訊息不會包含之前的聊天記錄。',
    deleteMessage: '刪除訊息',
    deleteMessageConfirm: '是否刪除此訊息?',
    deleteHistoryConfirm: '確定刪除此紀錄?',
    clearHistoryConfirm: '確定清除紀錄?',
    preview: '預覽',
    showRawText: '顯示原文',
    questionConsumption: '提問消耗:',
    answerConsumption: '回答消耗:',
    totalConsumption: '合計消耗:',
  },
  setting: {
    setting: '設定',
    general: '總覽',
    advanced: '高級',
    config: '設定',
    avatarLink: '頭貼連結',
    name: '名稱',
    description: '描述',
    role: '角色設定',
    temperature: 'Temperature',
    temperatureTip: 'Temperature 參數影響模型生成文本時的隨機性。它是一個正數，通常在 0 到 1 之間。當 Temperature 值較高時（例如接近 1），模型將更傾向於探索不同的輸出，可能包括較為出奇制勝的答案。較低的 Temperature 值（例如接近 0）會使模型更傾向於選擇具有高置信度的輸出，可能導致更加保守和確定性的答案。根據使用場景和所需輸出的類型，可以調整 Temperature 值以獲得合適的結果。',
    top_p: 'Top_p',
    top_pTip: 'Top_p 參數用於控制生成過程中考慮的概率質量。Top_p 值介於 0 和 1 之間，通常設為 0.9 或其他較高的值。在生成過程中，模型會根據給定的 Top_p 值來篩選單詞，只有累積概率高於 Top_p 閾值的單詞會被考慮。較低的 Top_p 值會使輸出更具多樣性，同時可能導致文本質量降低。較高的 Top_p 值則會使模型更傾向於生成相對確定性的輸出，但可能犧牲多樣性。',
    resetUserInfo: '重設使用者資訊',
    chatHistory: '紀錄',
    theme: '主題',
    language: '語言',
    api: 'API',
    reverseProxy: '反向代理',
    timeout: '逾時',
    socks: 'Socks',
    httpsProxy: 'HTTPS Proxy',
    balance: 'API余額',
    monthlyUsage: '本月使用量',
  },
  store: {
    siderButton: '模板商店',
    local: '本機',
    online: '線上',
    title: '標題',
    description: '描述',
    clearStoreConfirm: '是否清除資料？',
    importPlaceholder: '請將 JSON 資料貼在此處',
    addRepeatTitleTips: '標題重複，請重新輸入',
    addRepeatContentTips: '內容重複：{msg}，請重新輸入',
    editRepeatTitleTips: '標題衝突，請重新修改',
    editRepeatContentTips: '內容衝突{msg} ，請重新修改',
    importError: '鍵值不符合',
    importRepeatTitle: '因標題重複跳過：{msg}',
    importRepeatContent: '因內容重複跳過：{msg}',
    onlineImportWarning: '注意：請檢查 JSON 檔案來源！',
    downloadError: '請檢查網路狀態與 JSON 檔案有效性',
  },
  userAccountInfo: {
    question1: 'Q: 為什麼提問只有幾個字，卻消耗了幾十個 token ？',
    question1Answer1: '首次提問：首次提問時會設置角色，傳入角色會額外消耗 token，你可以在 "設置-高級-角色設定" 中進行修改。',
    question1Answer2Before: '後續提問：後續提問時會自動關聯上下文，因此會額外消耗 token，你可以單擊',
    question1Answer2After: '按鈕關閉 "攜帶之前聊天記錄" 功能。',
    question2: 'Q: 如何降低 token 數量消耗？',
    question2Answer1: '簡化輸入：盡量使用簡短、精煉的句子來描述你的問題，避免重複或冗長的表述。',
    question2Answer2: '合併提問：同一問題盡量一次性描述清楚，而不是等它回覆後再提出問題。',
    question2Answer3: '多多包容：當回答滿足了您 80% 的要求時，剩餘的盡量自己修改，而不是一次一次的讓它修改到 100% 完美狀態。',
    question2Answer4: '新建對話：在目前問題結束後，盡量開啟新的對話（點擊左上方新建對話按鈕），而不是在當前對話中繼續其他聊天。',
  },
  introduction: {
    // promptQ1: '簡介',
    promptQ2: '寫一部短篇科幻小說',
    promptQ3: '英漢互譯',
    promptA3: '你是一名專業的英語翻譯人員，接下來我將對你輸入中文或英文，我希望你能將我輸入的中文翻譯為英文，將我輸入的英文翻譯為中文。',
    promptQ4: '用簡單的語言解釋量子計算',
    promptQ5: '編程：如何在JavaScript中發起HTTP請求？',
    promptA5: '如何在JavaScript中發起HTTP請求？',
    promptQ6: '法律：試用期可以不交社保嗎？',
    promptA6: '試用期可以不交社保嗎？',
    promptQ7: '醫學：口腔潰瘍是什麼原因引起的？如何改善？',
    promptA7: '口腔潰瘍是什麼原因引起的？如何改善？',
    promptQ8: '創意：為10歲的孩子過生日有什麼創意點子？',
    promptA8: '為10歲的孩子過生日有什麼創意點子？',
    gptIntro1: '你好，',
    gptIntro2: '我是 ChatGPT',
    gptIntro3: '作為一個人工智能語言模型，我可以回答你的問題，為你提供有用信息，幫助你完成創作。',
    clickToTry: '選擇以下話題，快速與我對話：',
  },
}
