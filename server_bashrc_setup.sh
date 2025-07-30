#!/bin/bash

# Скрипт для настройки красивого терминала на сервере
# Выполните: chmod +x server_bashrc_setup.sh && ./server_bashrc_setup.sh

echo "🎨 Настройка красивого терминала на сервере..."

# Создаем резервную копию
cp ~/.bashrc ~/.bashrc.backup.$(date +%Y%m%d_%H%M%S)

# Добавляем настройки в .bashrc
cat >> ~/.bashrc << 'EOF'

# ===== НАСТРОЙКИ ТЕРМИНАЛА =====

# Цвета для терминала (зеленая тема)
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
export CLICOLOR=1
export LSCOLORS=ExGxBxDxCxEgEdxbxgxcxd

# Алиасы для цветного вывода
alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# Функция для отображения системной информации
show_system_info() {
    echo -e "\033[1;36m=== СИСТЕМНАЯ ИНФОРМАЦИЯ ===\033[0m"
    echo -e "\033[1;33mЗагрузка системы:\033[0m $(uptime | awk '{print $10}' | sed 's/,//')"
    echo -e "\033[1;33mИспользование диска:\033[0m $(df -h / | awk 'NR==2 {print $5}')"
    echo -e "\033[1;33mИспользование памяти:\033[0m $(free -h | awk 'NR==2{printf "%.1f%%", $3*100/$2}')"
    echo -e "\033[1;33mПроцессы:\033[0m $(ps aux | wc -l)"
    echo -e "\033[1;33mПользователи:\033[0m $(who | wc -l)"
    echo -e "\033[1;33mIP адрес:\033[0m $(hostname -I | awk '{print $1}')"
    echo ""
}

# Функция для отображения статуса Git
show_git_status() {
    if [ -d .git ]; then
        local branch=$(git branch --show-current 2>/dev/null)
        local status=$(git status --porcelain 2>/dev/null | wc -l)
        if [ "$status" -eq 0 ]; then
            echo -e "\033[1;32mGit: $branch ⚪\033[0m"
        else
            echo -e "\033[1;31mGit: $branch ⚠️  ($status изменений)\033[0m"
        fi
    fi
}

# Функция для отображения информации о проекте
show_project_info() {
    if [ -f package.json ]; then
        echo -e "\033[1;35m📦 Node.js проект\033[0m"
        echo -e "  Версия: $(node --version 2>/dev/null || echo 'не установлен')"
        echo -e "  NPM: $(npm --version 2>/dev/null || echo 'не установлен')"
    fi
    
    if [ -f requirements.txt ]; then
        echo -e "\033[1;35m🐍 Python проект\033[0m"
        echo -e "  Версия: $(python3 --version 2>/dev/null || echo 'не установлен')"
    fi
    
    if [ -f composer.json ]; then
        echo -e "\033[1;35m🐘 PHP проект\033[0m"
        echo -e "  Версия: $(php --version 2>/dev/null | head -1 || echo 'не установлен')"
    fi
}

# Функция для отображения предупреждений
show_warnings() {
    # Проверка обновлений
    if command -v apt &> /dev/null; then
        local updates=$(apt list --upgradable 2>/dev/null | wc -l)
        if [ "$updates" -gt 1 ]; then
            echo -e "\033[1;33m⚠️  Доступно $updates обновлений\033[0m"
        fi
    fi
    
    # Проверка места на диске
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 80 ]; then
        echo -e "\033[1;31m🚨 Мало места на диске: ${disk_usage}%\033[0m"
    fi
    
    # Проверка памяти
    local mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$mem_usage" -gt 80 ]; then
        echo -e "\033[1;31m🚨 Высокое использование памяти: ${mem_usage}%\033[0m"
    fi
}

# Основная функция приветствия
welcome_message() {
    clear
    echo -e "\033[1;32m╔══════════════════════════════════════════════════════════════╗\033[0m"
    echo -e "\033[1;32m║                    ДОБРО ПОЖАЛОВАТЬ НА СЕРВЕР!                ║\033[0m"
    echo -e "\033[1;32m╚══════════════════════════════════════════════════════════════╝\033[0m"
    echo ""
    
    show_system_info
    show_project_info
    show_warnings
    show_git_status
    
    echo -e "\033[1;36m💡 Полезные команды:\033[0m"
    echo -e "  \033[1;33msysinfo\033[0m - показать системную информацию"
    echo -e "  \033[1;33mupdate\033[0m - обновить систему"
    echo -e "  \033[1;33mstatus\033[0m - статус сервисов"
    echo ""
}

# Алиасы для удобства
alias sysinfo='show_system_info'
alias update='sudo apt update && sudo apt upgrade -y'
alias status='systemctl status'
alias ports='netstat -tulpn'
alias logs='tail -f /var/log/syslog'

# Запуск приветствия при входе
if [ -t 0 ]; then
    welcome_message
fi

EOF

echo "✅ Настройки добавлены в ~/.bashrc"
echo "🔄 Применяем изменения..."
source ~/.bashrc

echo ""
echo "🎉 Терминал настроен! Теперь он будет выглядеть информативно и красиво."
echo "💡 Для применения изменений выполните: source ~/.bashrc"
echo "🔄 Или просто откройте новый терминал" 