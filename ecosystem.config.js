module.exports = {
  apps: [
    {
      script: 'npm start',
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '185.225.35.163',
      ref: 'origin/main',
      repo: 'git@github.com:Nik68rus/myhoreca.git',
      path: '/home/root',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      ssh_options: 'ForwardAgent=yes',
    },
  },
};
