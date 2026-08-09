module.exports = {
  apps: [
    {
      name: 'task-manager-api',
      script: 'dist/src/main.js',

      instances: 1,
      exec_mode: 'fork',

      autorestart: true,
      watch: false,

      max_memory_restart: '500M',

      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};