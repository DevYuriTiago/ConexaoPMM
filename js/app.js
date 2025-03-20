document.addEventListener('DOMContentLoaded', function() {
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

    // Inicializar carrossel de notícias
    initNewsCarousel();

    // Inicializar eventos para os novos modais
    initModalEvents();
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
        
        // Atualizar navegação
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            item.classList.remove('active');
            const itemScreenId = item.getAttribute('onclick').match(/'([^']+)'/);
            if (itemScreenId && itemScreenId[1] === screenId) {
                item.classList.add('active');
            }
        });
    }
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
                    description: 'Solicitação encaminhada para a equipe de manutenção.'
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
    
    let currentIndex = 0;
    const newsCards = carousel.querySelectorAll('.news-card');
    const totalCards = newsCards.length;
    
    // Configurar posição inicial
    updateCarouselPosition();
    
    // Configurar intervalo para rotação automática
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarouselPosition();
    }, 5000);
    
    function updateCarouselPosition() {
        const cardWidth = newsCards[0].offsetWidth;
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Atualizar indicadores se existirem
        const indicators = document.querySelectorAll('.carousel-indicator');
        if (indicators.length > 0) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }
    }
}
