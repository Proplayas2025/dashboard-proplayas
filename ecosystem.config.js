module.exports = {
  apps: [
    {
      name: 'dashboard-proplayas',
      cwd: '/home/proplayas/apps/frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000 -H 127.0.0.1',
      instances: 1,
      exec_mode: 'fork',

      node_args: '--max-old-space-size=2048',
      max_memory_restart: '1G',

      // Usa logs separados (o elimina out/error y usa log_file único)
      out_file: '/var/log/pm2/dashboard-proplayas-out.log',
      error_file: '/var/log/pm2/dashboard-proplayas-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
      max_restarts: 10,
      min_uptime: '10s',
      autorestart: true,
      restart_delay: 2000,
      kill_timeout: 5000,

      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        NEXT_PUBLIC_API_URL: 'https://proplayas.org/api/',
        NEXT_PUBLIC_PROFILE_COVER_URL: 'https://proplayas.org/storage/uploads/profiles/',
        NEXT_PUBLIC_COVER_URL: 'https://proplayas.org/storage/uploads/covers/',
        NEXT_PUBLIC_FILES_PATH: 'https://proplayas.org/storage/uploads/docs/'
      }
    }
  ]
};
