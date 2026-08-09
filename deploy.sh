#!/bin/bash

set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use default

echo "🚀 Starting deployment..."

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm ci

echo "🧬 Generating Prisma Client..."
npx prisma generate

echo "🗄️ Running Database migration..."
npm run migration:run

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting application..."
pm2 reload ecosystem.config.js

echo "❤️ Running health check..."
./health-check.sh

echo "✅ Deployment successful!"