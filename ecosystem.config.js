module.exports = {
  apps: [
    {
      name: 'dashboard-proplayas',
      script: 'npm',
      args: 'start',
      cwd: '/home/redproplayas/web/proplayas.org/frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Configuración específica para Next.js 15
      node_args: '--max-old-space-size=2048',
      max_memory_restart: '1G',
      
      // Logs
      log_file: '/var/log/pm2/dashboard-proplayas.log',
      out_file: '/var/log/pm2/dashboard-proplayas-out.log',
      error_file: '/var/log/pm2/dashboard-proplayas-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Configuración de reinicio
      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
      max_restarts: 10,
      min_uptime: '10s',
      
      // Variables de entorno específicas
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        // Optimizaciones para Next.js 15
        NEXT_TELEMETRY_DISABLED: 1,
        // Agrega aquí tus variables de entorno específicas
        // NEXT_PUBLIC_APP_URL: 'https://tu-dominio.com',
      }
    }
  ]
};
