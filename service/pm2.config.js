module.exports = {
  apps: [
    {
      name: 'chatgpt-service',
      script: 'pnpm start',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
