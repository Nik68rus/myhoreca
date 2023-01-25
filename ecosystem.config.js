module.exports = {
  apps: [
    {
      script: 'npm start',
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '62.113.111.18',
      ref: 'origin/main',
      repo: 'git@github.com:Nik68rus/myhoreca.git',
      path: '/home/root',
      'pre-deploy-local': '',
      'post-deploy':
        'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      ssh_options: 'ForwardAgent=yes',
    },
  },
};
