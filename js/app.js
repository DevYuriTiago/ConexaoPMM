// Inicializar todos os eventos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showScreen('dashboard-screen');
        });
    }
    
    // Inicializar o carrossel de notícias
    initNewsCarousel();
    
    // Inicializar eventos de filtro do mapa
    initMapFilters();
    
    // Inicializar eventos do calendário
    initCalendarEvents();
    
    // Inicializar eventos para os horários
    initTimeSlotEvents();
    
    // Inicializar eventos para os botões de confirmação
    initConfirmationEvents();
    
    // Inicializar eventos para os botões de denúncia
    initReportEvents();
    
    // Inicializar eventos para os botões de chat
    initChatEvents();
    
    // Inicializar eventos para a navegação inferior
    initBottomNavEvents();
    
    // Adicionar eventos para os botões de navegação
    const navButtons = document.querySelectorAll('.bottom-nav-item');
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            if (screenId) {
                showScreen(screenId);
            }
        });
    });
    
    // Adicionar eventos para os botões de ação
    const actionButtons = document.querySelectorAll('.action-card');
    actionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'report') {
                showScreen('reports-screen');
            } else if (action === 'appointment') {
                showScreen('appointments-screen');
            }
        });
    });
    
    // Adicionar eventos para os chips de filtro do mapa
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            // Remover classe ativa de todos os chips
            filterChips.forEach(c => c.classList.remove('active'));
            // Adicionar classe ativa ao chip clicado
            this.classList.add('active');
        });
    });
    
    // Simulação de login após 2 segundos
    setTimeout(function() {
        document.getElementById('login-btn').addEventListener('click', function() {
            showScreen('dashboard-screen');
        });
    }, 2000);

    // Adicionar eventos para botões de voltar
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            showScreen('dashboard-screen');
        });
    });

    // Adicionar eventos para itens de navegação
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const screenId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            if (screenId) {
                showScreen(screenId);
            }
        });
    });

    // Adicionar eventos para modais
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modalId = this.closest('.modal-overlay').id;
            closeModal(modalId);
        });
    });

    // Adicionar eventos para cards de categoria
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Adicionar eventos para dias do calendário
    const calendarDays = document.querySelectorAll('.calendar-day:not(.disabled)');
    calendarDays.forEach(function(day) {
        day.addEventListener('click', function() {
            calendarDays.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
            // Atualizar os horários disponíveis com base no dia selecionado
            updateAvailableTimeSlots(parseInt(this.textContent, 10));
        });
    });

    // Adicionar eventos para horários
    const timeSlots = document.querySelectorAll('.time-slot:not(.disabled)');
    timeSlots.forEach(function(slot) {
        slot.addEventListener('click', function() {
            timeSlots.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Adicionar eventos para filtros do mapa
    const mapFilters = document.querySelectorAll('.filter-chip');
    mapFilters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            mapFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Adicionar evento para envio de mensagem no chat
    const chatSendBtn = document.querySelector('.chat-send-btn');
    const chatInput = document.querySelector('.chat-input input');
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', function() {
            sendChatMessage();
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    // Inicializar eventos para os modais
    initModalEvents();
    
    // Inicializar eventos para o calendário
    initCalendarEvents();
    
    // Inicializar eventos relacionados aos agendamentos
    initAppointmentEvents();
    
    // Verificar se há um hash na URL para navegação direta
    if (window.location.hash) {
        const screenId = window.location.hash.substring(1);
        const validScreens = ['home-screen', 'reports-screen', 'appointments-screen', 'map-screen', 'chat-screen'];
        if (validScreens.includes(screenId)) {
            showScreen(screenId);
        }
    }
});

// Função para inicializar eventos relacionados aos modais
function initModalEvents() {
    // Botão de configurações no header
    const settingsBtn = document.querySelector('.settings-icon');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            openSettings();
        });
    }
    
    // Botão de notificações no header
    const notificationsBtn = document.querySelector('.notifications-icon');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            openNotifications();
        });
    }
    
    // Botão de SOS no dashboard
    const sosBtn = document.querySelector('.sos-button');
    if (sosBtn) {
        sosBtn.addEventListener('click', function() {
            openSOS();
        });
    }
    
    // Botões para abrir detalhes de denúncias
    const reportCards = document.querySelectorAll('.report-card');
    reportCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id') || '1';
            openReportDetails(reportId);
        });
    });
    
    // Status cards para abrir detalhes de denúncias
    const statusCards = document.querySelectorAll('.status-card');
    statusCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const reportId = this.getAttribute('data-id') || '1';
            openReportDetails(reportId);
        });
    });
    
    // Filtros do mapa
    const mapFilters = document.querySelectorAll('.filter-chip');
    mapFilters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            // Remover classe active de todos os filtros
            mapFilters.forEach(f => f.classList.remove('active'));
            
            // Adicionar classe active ao filtro clicado
            this.classList.add('active');
            
            // Filtrar marcadores no mapa
            const filterType = this.textContent.toLowerCase();
            filterMapMarkers(filterType);
        });
    });
    
    // Eventos para opções de acessibilidade
    const highContrastToggle = document.getElementById('high-contrast-toggle');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', function() {
            document.body.classList.toggle('high-contrast', this.checked);
            // Salvar preferência no localStorage
            localStorage.setItem('highContrast', this.checked);
        });
        
        // Verificar preferência salva
        const savedHighContrast = localStorage.getItem('highContrast') === 'true';
        highContrastToggle.checked = savedHighContrast;
        document.body.classList.toggle('high-contrast', savedHighContrast);
    }
    
    const largeTextToggle = document.getElementById('large-text-toggle');
    if (largeTextToggle) {
        largeTextToggle.addEventListener('change', function() {
            document.body.classList.toggle('large-text', this.checked);
            // Salvar preferência no localStorage
            localStorage.setItem('largeText', this.checked);
        });
        
        // Verificar preferência salva
        const savedLargeText = localStorage.getItem('largeText') === 'true';
        largeTextToggle.checked = savedLargeText;
        document.body.classList.toggle('large-text', savedLargeText);
    }
    
    // Marcar notificações como lidas
    const markAsReadBtn = document.querySelector('#notifications-modal .secondary-btn');
    if (markAsReadBtn) {
        markAsReadBtn.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(function(notification) {
                notification.classList.remove('unread');
            });
            
            // Atualizar o badge de notificações
            const badge = document.querySelector('.notifications-icon .badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }
}

// Função para filtrar marcadores no mapa
function filterMapMarkers(filterType) {
    const markers = document.querySelectorAll('.map-marker');
    
    markers.forEach(function(marker) {
        const markerIcon = marker.querySelector('.marker-icon i');
        const markerType = getMarkerType(markerIcon);
        
        if (filterType === 'todos' || markerType === filterType) {
            marker.style.display = 'block';
        } else {
            marker.style.display = 'none';
        }
    });
}

// Função para obter o tipo de marcador com base no ícone
function getMarkerType(iconElement) {
    if (!iconElement) return 'outros';
    
    const iconClass = iconElement.className;
    
    if (iconClass.includes('exclamation-circle')) return 'buracos';
    if (iconClass.includes('lightbulb')) return 'iluminação';
    if (iconClass.includes('trash')) return 'lixo';
    if (iconClass.includes('water')) return 'esgoto';
    if (iconClass.includes('traffic-light')) return 'trânsito';
    if (iconClass.includes('spray-can')) return 'vandalismo';
    
    return 'outros';
}

// Função para mostrar uma tela específica
function showScreen(screenId) {
    // Esconder todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(function(screen) {
        screen.classList.remove('active');
    });
    
    // Mostrar a tela selecionada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Inicializar o calendário quando a tela de agendamento for exibida
        if (screenId === 'appointments-screen') {
            generateCalendar();
        }
        
        // Inicializar o mapa quando a tela de mapa for exibida
        if (screenId === 'map-screen') {
            initMap();
        }
        
        // Garantir que o carrossel de notícias seja reinicializado quando voltar ao dashboard
        if (screenId === 'dashboard-screen') {
            initNewsCarousel();
        }
        
        // Atualizar a navegação inferior
        updateBottomNav(screenId);
        
        // Rolar para o topo da tela
        window.scrollTo(0, 0);
    }
}

// Função para atualizar a navegação inferior
function updateBottomNav(activeScreenId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        item.classList.remove('active');
        const itemScreenId = item.getAttribute('onclick').match(/'([^']+)'/);
        if (itemScreenId && itemScreenId[1] === activeScreenId) {
            item.classList.add('active');
        }
    });
}

// Função para abrir modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

// Função para fechar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

// Função para enviar mensagem no chat
function sendChatMessage() {
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatInput && chatInput.value.trim() !== '') {
        const messageText = chatInput.value.trim();
        const now = new Date();
        const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        
        // Criar elemento de mensagem do usuário
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-user animate-fadeIn';
        messageDiv.innerHTML = `
            <div>${messageText}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        // Adicionar mensagem à conversa
        chatMessages.appendChild(messageDiv);
        
        // Limpar input
        chatInput.value = '';
        
        // Scroll para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simular resposta automática após 1 segundo
        setTimeout(function() {
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message message-bot animate-fadeIn';
            botMessageDiv.innerHTML = `
                <div>Obrigado pelo seu contato. Um atendente analisará sua mensagem em breve.</div>
                <div class="message-time">${timeString}</div>
            `;
            
            chatMessages.appendChild(botMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Função para abrir modal de detalhes da denúncia
function openReportDetails(reportId) {
    // Simular carregamento de dados da denúncia com base no ID
    const reportData = getReportData(reportId);
    
    // Atualizar o conteúdo do modal com os dados da denúncia
    const modal = document.getElementById('report-details-modal');
    if (modal) {
        const title = modal.querySelector('.modal-title');
        const reportTitle = modal.querySelector('.report-title');
        const reportAddress = modal.querySelector('.report-address');
        const reportDate = modal.querySelector('.report-date');
        const reportStatus = modal.querySelector('.report-status');
        const reportImage = modal.querySelector('.report-image img');
        
        if (title) title.textContent = `Detalhes da Denúncia #${reportId}`;
        if (reportTitle) reportTitle.textContent = reportData.title;
        if (reportAddress) reportAddress.textContent = reportData.address;
        if (reportDate) reportDate.textContent = reportData.date;
        if (reportStatus) {
            reportStatus.textContent = reportData.status;
            reportStatus.className = 'report-status';
            reportStatus.classList.add(reportData.statusClass);
        }
        if (reportImage) reportImage.src = reportData.image;
        
        // Preencher a timeline com atualizações
        const timelineContainer = modal.querySelector('.report-timeline');
        if (timelineContainer) {
            timelineContainer.innerHTML = '';
            reportData.updates.forEach(update => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                timelineItem.innerHTML = `
                    <div class="timeline-date">${update.date}</div>
                    <div class="timeline-content">
                        <h4>${update.title}</h4>
                        <p>${update.description}</p>
                    </div>
                `;
                timelineContainer.appendChild(timelineItem);
            });
        }
    }
    
    openModal('report-details-modal');
}

// Função para obter dados simulados de uma denúncia
function getReportData(reportId) {
    const reports = {
        '1': {
            title: 'Buraco na Rua das Flores',
            address: 'Rua das Flores, 123 - Centro',
            date: '18/03/2025',
            status: 'Em análise',
            statusClass: 'status-pending',
            image: 'https://placehold.co/400x300/2196F3/FFFFFF/png?text=Buraco',
            updates: [
                {
                    date: '20/03/2025',
                    title: 'Análise técnica',
                    description: 'Equipe técnica realizou vistoria no local e confirmou a necessidade de reparo.'
                },
                {
                    date: '18/03/2025',
                    title: 'Denúncia registrada',
                    description: 'Sua denúncia foi registrada com sucesso e está aguardando análise.'
                }
            ]
        },
        '2': {
            title: 'Lâmpada queimada',
            address: 'Av. Principal, em frente ao mercado',
            date: '15/03/2025',
            status: 'Resolvido',
            statusClass: 'status-completed',
            image: 'https://placehold.co/400x300/4CAF50/FFFFFF/png?text=Lâmpada',
            updates: [
                {
                    date: '17/03/2025',
                    title: 'Problema resolvido',
                    description: 'A equipe de manutenção substituiu a lâmpada defeituosa.'
                },
                {
                    date: '16/03/2025',
                    title: 'Em andamento',
                    description: 'Equipe de manutenção foi designada para resolver o problema.'
                },
                {
                    date: '15/03/2025',
                    title: 'Denúncia registrada',
                    description: 'Sua denúncia foi registrada com sucesso e está aguardando análise.'
                }
            ]
        },
        '3': {
            title: 'Lixo acumulado',
            address: 'Praça Central, próximo ao coreto',
            date: '19/03/2025',
            status: 'Em andamento',
            statusClass: 'status-in-progress',
            image: 'https://placehold.co/400x300/2196F3/FFFFFF/png?text=Lixo',
            updates: [
                {
                    date: '20/03/2025',
                    title: 'Em andamento',
                    description: 'Equipe de limpeza foi designada e iniciará os trabalhos amanhã.'
                },
                {
                    date: '19/03/2025',
                    title: 'Denúncia registrada',
                    description: 'Sua denúncia foi registrada com sucesso e está aguardando análise.'
                }
            ]
        },
        '4': {
            title: 'Vazamento de água',
            address: 'Rua dos Ipês, esquina com Av. das Palmeiras',
            date: '17/03/2025',
            status: 'Em análise',
            statusClass: 'status-pending',
            image: 'https://placehold.co/400x300/2196F3/FFFFFF/png?text=Vazamento',
            updates: [
                {
                    date: '19/03/2025',
                    title: 'Vistoria agendada',
                    description: 'Equipe técnica realizará vistoria no local amanhã pela manhã.'
                },
                {
                    date: '17/03/2025',
                    title: 'Denúncia registrada',
                    description: 'Sua denúncia foi registrada com sucesso e está aguardando análise.'
                }
            ]
        },
        '5': {
            title: 'Semáforo quebrado',
            address: 'Cruzamento da Av. Principal com Rua do Comércio',
            date: '14/03/2025',
            status: 'Resolvido',
            statusClass: 'status-completed',
            image: 'https://placehold.co/400x300/4CAF50/FFFFFF/png?text=Semáforo',
            updates: [
                {
                    date: '16/03/2025',
                    title: 'Problema resolvido',
                    description: 'Equipe técnica substituiu o controlador do semáforo e o equipamento está funcionando normalmente.'
                },
                {
                    date: '15/03/2025',
                    title: 'Em andamento',
                    description: 'Equipe de manutenção foi designada para resolver o problema.'
                },
                {
                    date: '14/03/2025',
                    title: 'Denúncia registrada',
                    description: 'Sua denúncia foi registrada com sucesso e está aguardando análise.'
                }
            ]
        }
    };
    
    // Retornar dados da denúncia ou um objeto padrão se não encontrado
    return reports[reportId] || {
        title: 'Denúncia não encontrada',
        address: 'Endereço não disponível',
        date: 'Data não disponível',
        status: 'Status desconhecido',
        statusClass: '',
        image: 'https://placehold.co/400x300/cccccc/666666/png?text=Não+encontrado',
        updates: []
    };
}

// Função para abrir modal de notificações
function openNotifications() {
    openModal('notifications-modal');
}

// Função para abrir modal de SOS
function openSOS() {
    openModal('sos-modal');
}

// Função para abrir modal de configurações
function openSettings() {
    openModal('settings-modal');
}

// Função para inicializar o carrossel de notícias
function initNewsCarousel() {
    const carousel = document.querySelector('.news-carousel');
    if (!carousel) return;
    
    // Limpar qualquer timer existente
    if (window.carouselInterval) {
        clearInterval(window.carouselInterval);
        window.carouselInterval = null;
    }
    
    const cards = carousel.querySelectorAll('.news-card');
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    
    // Função para mostrar o card atual e esconder os outros
    function showCurrentCard() {
        cards.forEach((card, index) => {
            // Garantir que todos os cards estejam no DOM
            if (!carousel.contains(card)) {
                carousel.appendChild(card);
            }
            
            // Mostrar apenas o card atual
            if (index === currentIndex) {
                card.style.display = 'block';
                card.classList.add('active');
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
            }
        });
    }
    
    // Mostrar o primeiro card
    showCurrentCard();
    
    // Configurar intervalo para alternar entre os cards
    window.carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCurrentCard();
    }, 5000);
    
    // Adicionar evento para reiniciar o carrossel quando a tela se tornar visível
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Reiniciar o carrossel quando a página se tornar visível
            initNewsCarousel();
        }
    });
}

// Função para gerar o calendário
function generateCalendar() {
    const calendarDays = document.querySelector('.calendar-days');
    if (!calendarDays) return;

    // Limpar calendário existente
    calendarDays.innerHTML = '';

    // Data atual
    const now = new Date();
    const currentMonth = 2; // Março (0-11)
    const currentYear = 2025;
    const currentDay = 20; // Dia atual fixo em 20 para corresponder à imagem

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
        day.classList.add('calendar-day');
        
        // Destacar dia atual (20)
        if (i === currentDay) {
            day.classList.add('selected');
        }

        // Adicionar evento de clique
        day.addEventListener('click', function() {
            const selectedDays = document.querySelectorAll('.calendar-days .selected');
            selectedDays.forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            
            // Atualizar horários disponíveis com base no dia selecionado
            updateAvailableTimeSlots(parseInt(this.textContent, 10));
        });

        calendarDays.appendChild(day);
    }
    
    // Inicializar os horários disponíveis para o dia atual
    updateAvailableTimeSlots(currentDay);
}

// Inicializar eventos para o calendário
function initCalendarEvents() {
    // Gerar o calendário
    generateCalendar();
    
    // Adicionar eventos para os botões de navegação do calendário
    const prevMonthBtn = document.querySelector('.calendar-nav-prev');
    const nextMonthBtn = document.querySelector('.calendar-nav-next');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            // Implementar navegação para o mês anterior
            // Por enquanto, apenas regenerar o calendário
            generateCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            // Implementar navegação para o próximo mês
            // Por enquanto, apenas regenerar o calendário
            generateCalendar();
        });
    }
}

// Função para atualizar os horários disponíveis com base no dia selecionado
function updateAvailableTimeSlots(day) {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    // Resetar todos os slots
    timeSlots.forEach(slot => {
        slot.classList.remove('disabled');
        slot.classList.remove('active');
    });
    
    // Simular horários indisponíveis com base no dia
    if (day % 2 === 0) {
        // Para dias pares, o primeiro horário está indisponível
        if (timeSlots[0]) {
            timeSlots[0].classList.add('disabled');
        }
    } else {
        // Para dias ímpares, o último horário está indisponível
        if (timeSlots[timeSlots.length - 1]) {
            timeSlots[timeSlots.length - 1].classList.add('disabled');
        }
    }
    
    // Selecionar o primeiro horário disponível
    for (let i = 0; i < timeSlots.length; i++) {
        if (!timeSlots[i].classList.contains('disabled')) {
            timeSlots[i].classList.add('active');
            break;
        }
    }
}

// Função para inicializar eventos relacionados aos agendamentos
function initAppointmentEvents() {
    // Adicionar evento para os slots de horário
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(function(slot) {
        slot.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                // Remover classe ativa de todos os slots
                timeSlots.forEach(s => s.classList.remove('active'));
                // Adicionar classe ativa ao slot clicado
                this.classList.add('active');
                
                // Atualizar informações no modal
                updateAppointmentModalInfo();
            }
        });
    });
    
    // Adicionar evento para o botão de confirmar agendamento
    const confirmBtn = document.querySelector('.appointment-confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            // Abrir modal de confirmação
            openModal('appointment-modal');
        });
    }
}

// Função para atualizar as informações no modal de agendamento
function updateAppointmentModalInfo() {
    // Obter o dia selecionado
    const selectedDay = document.querySelector('.calendar-day.selected');
    // Obter o mês atual
    const currentMonth = document.querySelector('.calendar-header h4');
    // Obter o horário selecionado
    const selectedTime = document.querySelector('.time-slot.active');
    
    // Atualizar as informações no modal
    const dateInfo = document.getElementById('appointment-date-info');
    const timeInfo = document.getElementById('appointment-time-info');
    const serviceInfo = document.getElementById('appointment-service-info');
    
    if (dateInfo && currentMonth && selectedDay) {
        dateInfo.textContent = selectedDay.textContent + ' de ' + currentMonth.textContent;
    }
    
    if (timeInfo && selectedTime) {
        timeInfo.textContent = selectedTime.textContent;
    }
    
    if (serviceInfo) {
        const selectedService = document.querySelector('.action-card.active span');
        if (selectedService) {
            serviceInfo.textContent = selectedService.textContent;
        }
    }
}

// Função para inicializar o mapa
function initMap() {
    // Reinicializar os filtros do mapa
    initMapFilters();
    
    // Adicionar eventos de hover para os marcadores
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        const tooltip = marker.querySelector('.marker-tooltip');
        
        marker.addEventListener('mouseenter', function() {
            tooltip.style.display = 'block';
        });
        
        marker.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });
}

// Inicializar eventos de filtro do mapa
function initMapFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filterType = this.textContent.trim().toLowerCase();
            
            // Mostrar todos os marcadores se o filtro for "todos"
            if (filterType === 'todos') {
                mapMarkers.forEach(marker => {
                    marker.style.display = 'block';
                });
                return;
            }
            
            // Filtrar marcadores com base no tipo selecionado
            mapMarkers.forEach(marker => {
                const markerType = marker.querySelector('.marker-tooltip strong').textContent.toLowerCase();
                
                if (markerType.includes(filterType)) {
                    marker.style.display = 'block';
                } else {
                    marker.style.display = 'none';
                }
            });
        });
    });
}

// Função para mostrar o assistente virtual
function showVirtualAssistant() {
    openModal('virtual-chat-modal');
    
    // Focar no campo de input
    setTimeout(() => {
        const input = document.querySelector('#virtual-chat-modal .chat-input input');
        if (input) {
            input.focus();
        }
    }, 300);
}

// Função para mostrar o atendimento humano
function showHumanAssistant() {
    openModal('human-chat-modal');
    
    // Simular conexão com atendente após 3 segundos
    setTimeout(() => {
        const chatStatus = document.querySelector('#human-chat-modal .chat-status');
        const chatMessages = document.querySelector('#human-chat-modal .chat-messages');
        const chatInput = document.querySelector('#human-chat-modal .chat-input');
        
        if (chatStatus && chatMessages && chatInput) {
            chatStatus.style.display = 'none';
            chatMessages.style.display = 'block';
            chatInput.style.display = 'flex';
            
            // Focar no campo de input
            const input = chatInput.querySelector('input');
            if (input) {
                input.focus();
            }
        }
    }, 3000);
}

// Função para alternar a visibilidade das respostas do FAQ
function toggleFaq(element) {
    // Remover classe active de todas as perguntas
    const allQuestions = document.querySelectorAll('.faq-question');
    allQuestions.forEach(question => {
        if (question !== element) {
            question.classList.remove('active');
        }
    });
    
    // Alternar classe active na pergunta clicada
    element.classList.toggle('active');
}

// Inicializar eventos para o chat
function initChatEvents() {
    // Adicionar evento para enviar mensagem no chat virtual
    const virtualChatInput = document.querySelector('#virtual-chat-modal .chat-input input');
    const virtualChatSendBtn = document.querySelector('#virtual-chat-modal .chat-send-btn');
    const virtualChatMessages = document.querySelector('#virtual-chat-modal .chat-messages');
    
    if (virtualChatInput && virtualChatSendBtn && virtualChatMessages) {
        // Função para enviar mensagem
        const sendVirtualMessage = () => {
            const message = virtualChatInput.value.trim();
            if (message) {
                // Adicionar mensagem do usuário
                addChatMessage(virtualChatMessages, message, 'user');
                virtualChatInput.value = '';
                
                // Simular resposta do bot após 1 segundo
                setTimeout(() => {
                    const botResponses = [
                        "Entendi! Vou verificar essa informação para você.",
                        "Claro, posso ajudar com isso. Você poderia fornecer mais detalhes?",
                        "Essa é uma ótima pergunta. A resposta é que depende da sua situação específica.",
                        "Vou encaminhar sua solicitação para o departamento responsável.",
                        "Para esse serviço, você precisa comparecer presencialmente na prefeitura."
                    ];
                    
                    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                    addChatMessage(virtualChatMessages, randomResponse, 'bot');
                }, 1000);
            }
        };
        
        // Evento de clique no botão de enviar
        virtualChatSendBtn.addEventListener('click', sendVirtualMessage);
        
        // Evento de tecla Enter no input
        virtualChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendVirtualMessage();
            }
        });
    }
    
    // Adicionar evento para enviar mensagem no chat humano
    const humanChatInput = document.querySelector('#human-chat-modal .chat-input input');
    const humanChatSendBtn = document.querySelector('#human-chat-modal .chat-send-btn');
    const humanChatMessages = document.querySelector('#human-chat-modal .chat-messages');
    
    if (humanChatInput && humanChatSendBtn && humanChatMessages) {
        // Função para enviar mensagem
        const sendHumanMessage = () => {
            const message = humanChatInput.value.trim();
            if (message) {
                // Adicionar mensagem do usuário
                addChatMessage(humanChatMessages, message, 'user');
                humanChatInput.value = '';
                
                // Simular resposta do atendente após 2 segundos
                setTimeout(() => {
                    const attendantResponses = [
                        "Estou verificando essa informação no sistema, um momento por favor.",
                        "Entendi sua solicitação. Vou precisar de algumas informações adicionais.",
                        "Obrigado por aguardar. De acordo com nossos registros, sua solicitação já está em andamento.",
                        "Posso ajudar com mais alguma coisa?",
                        "Vou transferir seu caso para um especialista, ele entrará em contato em breve."
                    ];
                    
                    const randomResponse = attendantResponses[Math.floor(Math.random() * attendantResponses.length)];
                    addChatMessage(humanChatMessages, randomResponse, 'bot');
                }, 2000);
            }
        };
        
        // Evento de clique no botão de enviar
        humanChatSendBtn.addEventListener('click', sendHumanMessage);
        
        // Evento de tecla Enter no input
        humanChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendHumanMessage();
            }
        });
    }
}

// Função para adicionar mensagem ao chat
function addChatMessage(container, message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.textContent = message;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = 'Agora';
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    container.appendChild(messageDiv);
    
    // Rolar para o final da conversa
    container.scrollTop = container.scrollHeight;
}
