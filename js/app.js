document.addEventListener('DOMContentLoaded', function() {
    // Simulação de login após 2 segundos
    setTimeout(function() {
        document.getElementById('login-btn').addEventListener('click', function() {
            showScreen('dashboard-screen');
        });
    }, 2000);

    // Navegação entre telas
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetScreen = this.getAttribute('data-screen');
            showScreen(targetScreen);
            
            // Atualizar item ativo no menu
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Botões de voltar
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showScreen('dashboard-screen');
            
            // Atualizar item ativo no menu
            navItems.forEach(navItem => {
                if (navItem.getAttribute('data-screen') === 'dashboard-screen') {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            });
        });
    });

    // Botões de ação rápida
    document.getElementById('btn-denuncias').addEventListener('click', function() {
        showScreen('denuncias-screen');
        updateActiveNavItem('denuncias-screen');
    });

    document.getElementById('btn-agendamentos').addEventListener('click', function() {
        showScreen('agendamentos-screen');
        updateActiveNavItem('agendamentos-screen');
    });

    document.getElementById('btn-mapa').addEventListener('click', function() {
        showScreen('mapa-screen');
        updateActiveNavItem('mapa-screen');
    });

    document.getElementById('btn-chat').addEventListener('click', function() {
        showScreen('chat-screen');
        updateActiveNavItem('chat-screen');
    });

    // Modal de Nova Denúncia
    const newReportBtn = document.querySelector('.new-report-btn');
    const newReportModal = document.getElementById('new-report-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    if (newReportBtn) {
        newReportBtn.addEventListener('click', function() {
            newReportModal.style.display = 'flex';
        });
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Categorias de denúncia
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            newReportModal.style.display = 'flex';
        });
    });

    // Serviços de agendamento
    const serviceCards = document.querySelectorAll('.service-card');
    const confirmBtn = document.querySelector('.confirm-btn');
    const appointmentModal = document.getElementById('appointment-confirmation-modal');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Destacar serviço selecionado
            serviceCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            appointmentModal.style.display = 'flex';
        });
    }

    // Calendário
    generateCalendar();

    // Seleção de horários
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            timeSlots.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Filtros do mapa
    const mapFilters = document.querySelectorAll('.filter-item');
    const mapMarkers = document.querySelectorAll('.map-marker');

    mapFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            mapFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.textContent.toLowerCase();
            
            if (filterType === 'todos') {
                mapMarkers.forEach(marker => {
                    marker.style.display = 'flex';
                });
            } else {
                mapMarkers.forEach(marker => {
                    const markerType = marker.getAttribute('data-type');
                    if (markerType === filterType) {
                        marker.style.display = 'flex';
                    } else {
                        marker.style.display = 'none';
                    }
                });
            }
        });
    });

    // Chat
    const chatOptions = document.querySelectorAll('.chat-option button');
    const chatContainer = document.querySelector('.chat-container');
    const faqSection = document.querySelector('.faq-section');

    chatOptions.forEach(option => {
        option.addEventListener('click', function() {
            chatContainer.style.display = 'flex';
            faqSection.style.display = 'none';
        });
    });

    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // Funções auxiliares
    function showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    function updateActiveNavItem(screenId) {
        navItems.forEach(item => {
            if (item.getAttribute('data-screen') === screenId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function generateCalendar() {
        const calendarDays = document.querySelector('.calendar-days');
        if (!calendarDays) return;

        // Limpar calendário existente
        calendarDays.innerHTML = '';

        // Data atual
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const currentDay = now.getDate();

        // Primeiro dia do mês
        const firstDay = new Date(currentYear, currentMonth, 1);
        const startingDay = firstDay.getDay(); // 0 = Domingo, 1 = Segunda, etc.

        // Número de dias no mês
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDay.getDate();

        // Adicionar dias vazios para alinhar com o dia da semana
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            calendarDays.appendChild(emptyDay);
        }

        // Adicionar dias do mês
        for (let i = 1; i <= totalDays; i++) {
            const day = document.createElement('div');
            day.textContent = i;
            
            // Destacar dia atual
            if (i === currentDay) {
                day.classList.add('today');
            }

            // Adicionar evento de clique
            day.addEventListener('click', function() {
                const selectedDays = document.querySelectorAll('.calendar-days .selected');
                selectedDays.forEach(d => d.classList.remove('selected'));
                this.classList.add('selected');
            });

            calendarDays.appendChild(day);
        }
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Adicionar mensagem do usuário
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(userMessage);

        // Limpar input
        chatInput.value = '';

        // Simular resposta do sistema após 1 segundo
        setTimeout(function() {
            const systemMessage = document.createElement('div');
            systemMessage.className = 'message system';
            systemMessage.innerHTML = `
                <div class="message-content">Obrigado pelo seu contato. Um atendente irá responder em breve.</div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
            chatMessages.appendChild(systemMessage);

            // Rolar para o final da conversa
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        // Rolar para o final da conversa
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Acessibilidade
    const toggleHighContrast = function() {
        document.body.classList.toggle('high-contrast');
    };

    const toggleLargeText = function() {
        document.body.classList.toggle('large-text');
    };
});
