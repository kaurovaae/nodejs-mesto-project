require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/main',
  JWT_SECRET,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './dist/app.js',
    env_production: {
      NODE_ENV: 'production',
      JWT_SECRET,
    },
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/kaurovaae/nodejs-mesto-project.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
