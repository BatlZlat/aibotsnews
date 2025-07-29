#!/bin/bash

echo "🧹 Быстрая очистка..."

# Останавливаем процессы
pkill -f "next" || true
pkill -f "node.*3000" || true

# Очищаем кэш
rm -rf .next/
rm -rf node_modules/.cache/ || true

echo "✅ Очистка завершена!"
echo "Теперь можно запускать: npm run dev"