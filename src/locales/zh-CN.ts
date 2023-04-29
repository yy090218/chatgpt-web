export default {
  common: {
    add: '添加',
    addSuccess: '添加成功',
    edit: '编辑',
    editSuccess: '编辑成功',
    delete: '删除',
    deleteSuccess: '删除成功',
    save: '保存',
    saveSuccess: '保存成功',
    reset: '重置',
    action: '操作',
    export: '导出',
    exportSuccess: '导出成功',
    import: '导入',
    importSuccess: '导入成功',
    clear: '清空',
    clearSuccess: '清空成功',
    yes: '是',
    no: '否',
    confirm: '确定',
    download: '下载',
    noData: '暂无数据',
    wrong: '好像出错了，请稍后再试。',
    success: '操作成功',
    failed: '操作失败',
    verify: '验证',
    unauthorizedTips: '未经授权，请先进行验证。',
    unauthorizedOrInsufficientBalanceTips: '未经授权，或 token 不足',
    unauthorizedOrInsufficientBalanceHelperTips: '如需购买或做代理请扫描下方二维码',
    salePrice: '售价',
    salePriceUnit: '元',
    saleTokenCount: 'Token 数量',
    saleValidityPeriod: '有效期',
    saleFreeType: '免费（集赞）',
    saleLongTerm: '长期',
  },
  chat: {
    newChatButton: '新建对话',
    placeholder: '请输入问题...（Shift + Enter = 换行，"/" 获取模板）',
    placeholderMobile: '请输入问题...',
    copy: '复制',
    copied: '复制成功',
    copyCode: '复制代码',
    clearChat: '清空会话',
    clearChatConfirm: '是否清空会话?',
    exportImage: '保存会话到图片',
    exportImageConfirm: '是否将会话保存为图片?',
    exportSuccess: '保存成功',
    exportFailed: '保存失败',
    usingContext: '上下文模式',
    turnOnContext: '当前模式下, 发送消息会携带之前的聊天记录',
    turnOffContext: '当前模式下, 发送消息不会携带之前的聊天记录',
    deleteMessage: '删除消息',
    deleteMessageConfirm: '是否删除此消息?',
    deleteHistoryConfirm: '确定删除此记录?',
    clearHistoryConfirm: '确定清空聊天记录?',
    preview: '预览',
    showRawText: '显示原文',
    questionConsumption: '提问消耗:',
    answerConsumption: '回答消耗:',
    totalConsumption: '合计消耗:',
    stopResponding: '停止生成',
  },
  setting: {
    setting: '设置',
    general: '总览',
    advanced: '高级',
    config: '配置',
    avatarLink: '头像链接',
    name: '名称',
    description: '描述',
    role: '角色设定',
    temperature: 'Temperature',
    temperatureTip: 'Temperature参数影响模型生成文本时的随机性。它是一个正数，通常在0到1之间。当Temperature值较高时（例如接近1），模型将更倾向于探索不同的输出，可能包括较为出奇制胜的答案。较低的Temperature值（例如接近0）会使模型更倾向于选择具有高置信度的输出，可能导致更加保守和确定性的答案。根据使用场景和所需输出的类型，可以调整Temperature值以获得合适的结果。',
    top_p: 'Top_p',
    top_pTip: 'Top_p参数用于控制生成过程中考虑的概率质量。Top_p值介于0和1之间，通常设为0.9或其他较高的值。在生成过程中，模型会根据给定的Top_p值来筛选单词，只有累积概率高于Top_p阈值的单词会被考虑。较低的Top_p值会使输出更具多样性，同时可能导致文本质量降低。较高的Top_p值则会使模型更倾向于生成相对确定性的输出，但可能牺牲多样性。',
    resetUserInfo: '重置用户信息',
    chatHistory: '聊天记录',
    theme: '主题',
    language: '语言',
    api: 'API',
    reverseProxy: '反向代理',
    timeout: '超时',
    socks: 'Socks',
    httpsProxy: 'HTTPS Proxy',
    balance: 'API余额',
    monthlyUsage: '本月使用量',
  },
  store: {
    siderButton: '模板商店',
    local: '本地',
    online: '在线',
    title: '标题',
    description: '描述',
    clearStoreConfirm: '是否清空数据？',
    importPlaceholder: '请粘贴 JSON 数据到此处',
    addRepeatTitleTips: '标题重复，请重新输入',
    addRepeatContentTips: '内容重复：{msg}，请重新输入',
    editRepeatTitleTips: '标题冲突，请重新修改',
    editRepeatContentTips: '内容冲突{msg} ，请重新修改',
    importError: '键值不匹配',
    importRepeatTitle: '标题重复跳过：{msg}',
    importRepeatContent: '内容重复跳过：{msg}',
    onlineImportWarning: '注意：请检查 JSON 文件来源！',
    downloadError: '请检查网络状态与 JSON 文件有效性',
  },
  userAccountInfo: {
    question1: 'Q: 为什么提问就几个字，却消耗了几十个 token ？',
    question1Answer1: '首次提问：首次提问时会设置角色，传入角色会额外消耗 token，你可以在 “设置-高级-角色设定” 中进行修改。',
    question1Answer2Before: '后续提问：后续提问时会自动关联上下文，因此会额外消耗 token，你可以单击',
    question1Answer2After: '按钮关闭 “携带之前聊天记录” 功能。',
    question2: 'Q: 如何降低 token 数量消耗？',
    question2Answer1: '简化输入：尽量使用简短、精炼的句子来描述你的问题，避免重复或冗长的表述。',
    question2Answer2: '合并提问：同一问题尽量一次性描述清楚，而不是等它回复后再提出问题。',
    question2Answer3: '多多包容：当回答满足了您 80% 的要求时，剩余的尽量自己修改，而不是一次一次的让它修改到 100% 完美状态。',
    question2Answer4: '新建对话：当前问题结束后尽量开启新的对话（单击左上方新建对话按钮），而不是在当前对话中继续其它聊天。',
  },
  introduction: {
    // promptQ1: '介绍下你自己',
    promptQ2: '写一部短篇科幻小说',
    promptQ3: '英汉互译',
    promptA3: '你是一名专业的英语翻译人员，接下来我将对你输入中文或英文，我希望你能将我输入的中文翻译为英文，将我输入的英文翻译为中文。',
    promptQ4: '用简单的语言解释量子计算',
    promptQ5: '编程：如何在JavaScript中发起HTTP请求？',
    promptA5: '如何在JavaScript中发起HTTP请求？',
    promptQ6: '法律：试用期可以不交社保吗？',
    promptA6: '试用期可以不交社保吗？',
    promptQ7: '医学：口腔溃疡是什么原因引起的？如何改善？',
    promptA7: '口腔溃疡是什么原因引起的？如何改善？',
    // promptQ8: '创意：为10岁的孩子过生日有什么创意点子？',
    // promptA8: '为10岁的孩子过生日有什么创意点子？',
    promptQ9: '招聘：写一篇互联网AI产品经理招聘JD',
    promptA9: '写一篇互联网AI产品经理招聘JD',
    gptIntro1: '你好，',
    gptIntro2: '我是 ChatGPT，有什么可以帮助你的吗？',
    gptIntro3: '作为一个人工智能语言模型，我可以回答你的问题，为你提供有用信息，帮助你完成创作。',
    clickToTry: '选择以下话题，快速与我对话：',
  },
}
