#!/bin/bash

# Скрипт для настройки красивого терминала на сервере (синяя тема)
# Выполните: chmod +x server_bashrc_blue.sh && ./server_bashrc_blue.sh

echo "🔵 Настройка красивого терминала на сервере (синяя тема)..."

# Создаем резервную копию
cp ~/.bashrc ~/.bashrc.backup.$(date +%Y%m%d_%H%M%S)

# Добавляем настройки в .bashrc
cat >> ~/.bashrc << 'EOF'

# ===== НАСТРОЙКИ ТЕРМИНАЛА (СИНЯЯ ТЕМА) =====

# Цвета для терминала (синяя тема)
export PS1='\[\033[01;34m\]\u@\h\[\033[00m\]:\[\033[01;36m\]\w\[\033[00m\]\$ '
export CLICOLOR=1
export LSCOLORS=ExGxBxDxCxEgEdxbxgxcxd

# Алиасы для цветного вывода
alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# Функция для отображения системной информации
show_system_info() {
    echo -e "\033[1;34m╔══════════════════════════════════════════════════════════════╗\033[0m"
    echo -e "\033[1;34m║                    СИСТЕМНАЯ ИНФОРМАЦИЯ                      ║\033[0m"
    echo -e "\033[1;34m╚══════════════════════════════════════════════════════════════╝\033[0m"
    echo ""
    echo -e "\033[1;36m🖥️  Загрузка системы:\033[0m \033[1;33m$(uptime | awk '{print $10}' | sed 's/,//')\033[0m"
    echo -e "\033[1;36m💾 Использование диска:\033[0m \033[1;33m$(df -h / | awk 'NR==2 {print $5}')\033[0m"
    echo -e "\033[1;36m🧠 Использование памяти:\033[0m \033[1;33m$(free -h | awk 'NR==2{printf "%.1f%%", $3*100/$2}')\033[0m"
    echo -e "\033[1;36m⚙️  Процессы:\033[0m \033[1;33m$(ps aux | wc -l)\033[0m"
    echo -e "\033[1;36m👥 Пользователи:\033[0m \033[1;33m$(who | wc -l)\033[0m"
    echo -e "\033[1;36m🌐 IP адрес:\033[0m \033[1;33m$(hostname -I | awk '{print $1}')\033[0m"
    echo ""
}

# Функция для отображения статуса Git
show_git_status() {
    if [ -d .git ]; then
        local branch=$(git branch --show-current 2>/dev/null)
        local status=$(git status --porcelain 2>/dev/null | wc -l)
        if [ "$status" -eq 0 ]; then
            echo -e "\033[1;32m📦 Git: $branch ⚪\033[0m"
        else
            echo -e "\033[1;31m📦 Git: $branch ⚠️  ($status изменений)\033[0m"
        fi
    fi
}

# Функция для отображения информации о проекте
show_project_info() {
    echo -e "\033[1;34m📁 ИНФОРМАЦИЯ О ПРОЕКТЕ:\033[0m"
    
    if [ -f package.json ]; then
        echo -e "  \033[1;35m📦 Node.js проект\033[0m"
        echo -e "    Версия Node: \033[1;33m$(node --version 2>/dev/null || echo 'не установлен')\033[0m"
        echo -e "    Версия NPM: \033[1;33m$(npm --version 2>/dev/null || echo 'не установлен')\033[0m"
    fi
    
    if [ -f requirements.txt ]; then
        echo -e "  \033[1;35m🐍 Python проект\033[0m"
        echo -e "    Версия Python: \033[1;33m$(python3 --version 2>/dev/null || echo 'не установлен')\033[0m"
    fi
    
    if [ -f composer.json ]; then
        echo -e "  \033[1;35m🐘 PHP проект\033[0m"
        echo -e "    Версия PHP: \033[1;33m$(php --version 2>/dev/null | head -1 || echo 'не установлен')\033[0m"
    fi
    
    if [ -f docker-compose.yml ]; then
        echo -e "  \033[1;35m🐳 Docker проект\033[0m"
        echo -e "    Версия Docker: \033[1;33m$(docker --version 2>/dev/null || echo 'не установлен')\033[0m"
    fi
    
    echo ""
}

# Функция для отображения предупреждений
show_warnings() {
    local has_warnings=false
    
    # Проверка обновлений
    if command -v apt &> /dev/null; then
        local updates=$(apt list --upgradable 2>/dev/null | wc -l)
        if [ "$updates" -gt 1 ]; then
            echo -e "\033[1;33m⚠️  Доступно $updates обновлений\033[0m"
            has_warnings=true
        fi
    fi
    
    # Проверка места на диске
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 80 ]; then
        echo -e "\033[1;31m🚨 Мало места на диске: ${disk_usage}%\033[0m"
        has_warnings=true
    fi
    
    # Проверка памяти
    local mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$mem_usage" -gt 80 ]; then
        echo -e "\033[1;31m🚨 Высокое использование памяти: ${mem_usage}%\033[0m"
        has_warnings=true
    fi
    
    if [ "$has_warnings" = false ]; then
        echo -e "\033[1;32m✅ Все системы работают нормально\033[0m"
    fi
    
    echo ""
}

# Основная функция приветствия
welcome_message() {
    clear
    echo -e "\033[1;34m╔══════════════════════════════════════════════════════════════╗\033[0m"
    echo -e "\033[1;34m║                ДОБРО ПОЖАЛОВАТЬ НА СЕРВЕР!                   ║\033[0m"
    echo -e "\033[1;34m║                    $(date '+%d.%m.%Y %H:%M:%S')                    ║\033[0m"
    echo -e "\033[1;34m╚══════════════════════════════════════════════════════════════╝\033[0m"
    echo ""
    
    show_system_info
    show_project_info
    show_warnings
    show_git_status
    
    echo -e "\033[1;36m💡 Полезные команды:\033[0m"
    echo -e "  \033[1;33msysinfo\033[0m - показать системную информацию"
    echo -e "  \033[1;33mupdate\033[0m - обновить систему"
    echo -e "  \033[1;33mstatus\033[0m - статус сервисов"
    echo -e "  \033[1;33mports\033[0m - открытые порты"
    echo -e "  \033[1;33mlogs\033[0m - логи системы"
    echo ""
}

# Алиасы для удобства
alias sysinfo='show_system_info'
alias update='sudo apt update && sudo apt upgrade -y'
alias status='systemctl status'
alias ports='netstat -tulpn'
alias logs='tail -f /var/log/syslog'
alias disk='df -h'
alias mem='free -h'
alias proc='ps aux --sort=-%cpu | head -10'

# Запуск приветствия при входе
if [ -t 0 ]; then
    welcome_message
fi

EOF

echo "✅ Настройки добавлены в ~/.bashrc"
echo "🔄 Применяем изменения..."
source ~/.bashrc

echo ""
echo "🎉 Терминал настроен с синей темой!"
echo "💡 Для применения изменений выполните: source ~/.bashrc"
echo "🔄 Или просто откройте новый терминал" 