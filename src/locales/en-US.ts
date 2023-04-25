export default {
  common: {
    add: 'Add',
    addSuccess: 'Add Success',
    edit: 'Edit',
    editSuccess: 'Edit Success',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    save: 'Save',
    saveSuccess: 'Save Success',
    reset: 'Reset',
    action: 'Action',
    export: 'Export',
    exportSuccess: 'Export Success',
    import: 'Import',
    importSuccess: 'Import Success',
    clear: 'Clear',
    clearSuccess: 'Clear Success',
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    download: 'Download',
    noData: 'No Data',
    wrong: 'Something went wrong, please try again later.',
    success: 'Success',
    failed: 'Failed',
    verify: 'Verify',
    unauthorizedTips: 'Unauthorized, please verify first.',
    unauthorizedOrInsufficientBalanceTips: 'Unauthorized or insufficient tokens',
    unauthorizedOrInsufficientBalanceHelperTips: 'If you wish to purchase or become an agent, please scan the QR code below.',
    salePrice: 'Price',
    salePriceUnit: 'CNY',
    saleTokenCount: 'Token Quantity',
    saleValidityPeriod: 'Validity Period',
    saleFreeType: 'Free (Collect Likes)',
    saleLongTerm: 'Long-term',
  },
  chat: {
    newChatButton: 'New Chat',
    placeholder: 'Ask me anything...(Shift + Enter = line break, "/" to get template)',
    placeholderMobile: 'Ask me anything...',
    copy: 'Copy',
    copied: 'Copied',
    copyCode: 'Copy Code',
    clearChat: 'Clear Chat',
    clearChatConfirm: 'Are you sure to clear this chat?',
    exportImage: 'Export Image',
    exportImageConfirm: 'Are you sure to export this chat to png?',
    exportSuccess: 'Export Success',
    exportFailed: 'Export Failed',
    usingContext: 'Context Mode',
    turnOnContext: 'In the current mode, sending messages will carry previous chat records.',
    turnOffContext: 'In the current mode, sending messages will not carry previous chat records.',
    deleteMessage: 'Delete Message',
    deleteMessageConfirm: 'Are you sure to delete this message?',
    deleteHistoryConfirm: 'Are you sure to clear this history?',
    clearHistoryConfirm: 'Are you sure to clear chat history?',
    preview: 'Preview',
    showRawText: 'Show as raw text',
    questionConsumption: 'Question consumption:',
    answerConsumption: 'Answer consumption:',
    totalConsumption: 'Total consumption:',
  },
  setting: {
    setting: 'Setting',
    general: 'General',
    advanced: 'Advanced',
    config: 'Config',
    avatarLink: 'Avatar Link',
    name: 'Name',
    description: 'Description',
    role: 'Role',
    temperature: 'Temperature',
    temperatureTip: 'Temperature parameter affects the randomness of the text generated by the model. It is a positive number, usually between 0 and 1. When the temperature value is higher (e.g., close to 1), the model will be more inclined to explore different outputs, which may include more surprising answers. Lower temperature values (e.g., close to 0) make the model more likely to choose outputs with high confidence, possibly resulting in more conservative and deterministic answers. The temperature value can be adjusted to achieve appropriate results based on the use case and desired output type.',
    top_p: 'Top_p',
    top_pTip: 'Top_p parameter is used to control the probability mass considered during the generation process. The Top_p value is between 0 and 1, usually set to 0.9 or other higher values. During the generation process, the model filters words based on the given Top_p value, and only words with cumulative probabilities above the Top_p threshold are considered. Lower Top_p values make the output more diverse while potentially reducing text quality. Higher Top_p values make the model more inclined to generate relatively deterministic outputs, but may sacrifice diversity.',
    resetUserInfo: 'Reset UserInfo',
    chatHistory: 'ChatHistory',
    theme: 'Theme',
    language: 'Language',
    api: 'API',
    reverseProxy: 'Reverse Proxy',
    timeout: 'Timeout',
    socks: 'Socks',
    httpsProxy: 'HTTPS Proxy',
    balance: 'API Balance',
    monthlyUsage: 'Monthly Usage',
  },
  store: {
    siderButton: 'Template Store',
    local: 'Local',
    online: 'Online',
    title: 'Title',
    description: 'Description',
    clearStoreConfirm: 'Whether to clear the data?',
    importPlaceholder: 'Please paste the JSON data here',
    addRepeatTitleTips: 'Title duplicate, please re-enter',
    addRepeatContentTips: 'Content duplicate: {msg}, please re-enter',
    editRepeatTitleTips: 'Title conflict, please revise',
    editRepeatContentTips: 'Content conflict {msg} , please re-modify',
    importError: 'Key value mismatch',
    importRepeatTitle: 'Title repeatedly skipped: {msg}',
    importRepeatContent: 'Content is repeatedly skipped: {msg}',
    onlineImportWarning: 'Note: Please check the JSON file source!',
    downloadError: 'Please check the network status and JSON file validity',
  },
  userAccountInfo: {
    question1: 'Q: Why does asking a question with just a few characters consume dozens of tokens?',
    question1Answer1: 'First-time question: When you ask a question for the first time, you will set a role. Inputting a role will consume additional tokens. You can modify this in "Settings - Advanced - Role Settings".',
    question1Answer2Before: 'Subsequent questions: When asking subsequent questions, the context will be automatically linked, consuming extra tokens. You can click the',
    question1Answer2After: 'button to turn off the "Carry previous chat history" feature.',
    question2: 'Q: How can I reduce token consumption?',
    question2Answer1: 'Simplify input: Try to use short, concise sentences to describe your questions and avoid repetitive or lengthy expressions.',
    question2Answer2: 'Combine questions: Try to describe the same question clearly in one go instead of waiting for a reply before asking another question.',
    question2Answer3: 'Be more accommodating: When the answer meets 80% of your requirements, try to modify the remaining part yourself instead of asking for revisions until it\'s 100% perfect.',
    question2Answer4: 'Create a new conversation: After the current question is finished, try to start a new conversation (by clicking the "Create a new conversation" button in the upper left corner) instead of continuing other chats in the current conversation.',
  },
  introduction: {
    // promptQ1: 'Introduce yourself',
    promptQ2: 'Write a short sci-fi story',
    promptQ3: 'English-Chinese translation',
    promptA3: 'You are a professional English translator. Next, I will input either Chinese or English for you. I hope you can translate the Chinese I input into English and translate the English I input into Chinese.',
    promptQ4: 'Explain quantum computing in simple terms',
    promptQ5: 'Programming: How to make an HTTP request in JavaScript?',
    promptA5: 'How to make an HTTP request in JavaScript?',
    promptQ6: 'Law: Is it legal not to pay social security during the probation period?',
    promptA6: 'Is it legal not to pay social security during the probation period?',
    promptQ7: 'Medicine: What causes oral ulcers and how to improve them?',
    promptA7: 'What causes oral ulcers and how to improve them?',
    promptQ8: 'Creativity: What are some creative ideas for a 10-year-old\'s birthday party?',
    promptA8: 'What are some creative ideas for a 10-year-old\'s birthday party?',
    promptQ9: 'Job Posting: Write a Job Description for an Internet AI Product Manager',
    promptA9: 'Write a Job Description for an Internet AI Product Manager',
    gptIntro1: 'Hello,',
    gptIntro2: 'I am ChatGPT.',
    gptIntro3: 'As an artificial intelligence language model, I can answer your questions, provide you with useful information, and help you with your creative endeavors.',
    clickToTry: 'Choose from the following topics to quickly chat with me:',
  },
}
