/**
 * Conexão Município - Sistema de Proteção Contra Plágio
 * Desenvolvido por: DevYuriTiago
 * Versão: 1.0.0
 * Data: 20/03/2025
 * 
 * Este arquivo contém medidas de proteção contra cópia não autorizada.
 * A remoção ou modificação deste arquivo constitui violação de direitos autorais.
 */

(function() {
    // Configuração de proteção
    const protectionConfig = {
        appName: "Conexão Município",
        owner: "DevYuriTiago",
        creationDate: "2025-03-20",
        version: "1.0.0",
        licenseType: "Proprietário - Todos os direitos reservados",
        watermarkText: "Conexão Município © 2025",
        disableRightClick: true,
        disableDevTools: true,
        disableCopy: true,
        addWatermark: true,
        checkDomain: true,
        allowedDomains: ["localhost", "127.0.0.1", "conexaomuni.netlify.app"]
    };

    // Registrar informações no console
    console.log(
        `%c${protectionConfig.appName} v${protectionConfig.version}`,
        "color: #2196F3; font-size: 20px; font-weight: bold;"
    );
    console.log(
        `%c© ${protectionConfig.owner} - ${protectionConfig.licenseType}`,
        "color: #333; font-size: 12px;"
    );

    // Verificar domínio
    if (protectionConfig.checkDomain) {
        const currentDomain = window.location.hostname;
        if (!protectionConfig.allowedDomains.includes(currentDomain)) {
            document.body.innerHTML = `
                <div style="text-align: center; padding: 50px; font-family: sans-serif;">
                    <h1 style="color: #F44336;">Acesso não autorizado</h1>
                    <p>Este aplicativo só pode ser executado em domínios autorizados.</p>
                    <p>Por favor, entre em contato com o desenvolvedor para obter uma licença.</p>
                    <p><small>© ${protectionConfig.owner} - ${protectionConfig.licenseType}</small></p>
                </div>
            `;
            throw new Error("Domínio não autorizado");
        }
    }

    // Desabilitar clique direito
    if (protectionConfig.disableRightClick) {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        });
    }

    // Desabilitar cópia
    if (protectionConfig.disableCopy) {
        document.addEventListener('copy', function(e) {
            showProtectionMessage();
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('cut', function(e) {
            showProtectionMessage();
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('selectstart', function(e) {
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return true;
            }
            e.preventDefault();
            return false;
        });
    }

    // Detectar DevTools
    if (protectionConfig.disableDevTools) {
        // Método 1: Monitorar mudanças de tamanho da janela
        let devToolsDetected = false;
        const threshold = 160;
        const checkDevTools = function() {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            if (widthThreshold || heightThreshold) {
                if (!devToolsDetected) {
                    devToolsDetected = true;
                    showProtectionMessage();
                }
            } else {
                devToolsDetected = false;
            }
        };
        
        window.addEventListener('resize', checkDevTools);
        setInterval(checkDevTools, 1000);
        
        // Método 2: Usar console.clear para detectar sobrescritas
        const originalConsole = console.log;
        console.log = function() {
            checkDevTools();
            return originalConsole.apply(this, arguments);
        };
    }

    // Adicionar marca d'água
    if (protectionConfig.addWatermark) {
        const watermark = document.createElement('div');
        watermark.className = 'app-watermark';
        watermark.textContent = protectionConfig.watermarkText;
        
        // Estilo da marca d'água
        watermark.style.position = 'fixed';
        watermark.style.bottom = '10px';
        watermark.style.right = '10px';
        watermark.style.color = 'rgba(33, 150, 243, 0.3)';
        watermark.style.fontSize = '12px';
        watermark.style.fontFamily = 'Arial, sans-serif';
        watermark.style.pointerEvents = 'none';
        watermark.style.zIndex = '9999';
        
        document.body.appendChild(watermark);
    }

    // Função para mostrar mensagem de proteção
    function showProtectionMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'protection-message';
        messageDiv.innerHTML = `
            <div class="protection-content">
                <h3>Conteúdo Protegido</h3>
                <p>Este aplicativo é propriedade de ${protectionConfig.owner}.</p>
                <p>Todos os direitos reservados.</p>
                <button id="close-protection-msg">Entendi</button>
            </div>
        `;
        
        // Estilo da mensagem
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '0';
        messageDiv.style.left = '0';
        messageDiv.style.width = '100%';
        messageDiv.style.height = '100%';
        messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        messageDiv.style.display = 'flex';
        messageDiv.style.alignItems = 'center';
        messageDiv.style.justifyContent = 'center';
        messageDiv.style.zIndex = '10000';
        
        const contentStyle = messageDiv.querySelector('.protection-content');
        if (contentStyle) {
            contentStyle.style.backgroundColor = 'white';
            contentStyle.style.padding = '20px';
            contentStyle.style.borderRadius = '10px';
            contentStyle.style.maxWidth = '400px';
            contentStyle.style.textAlign = 'center';
        }
        
        const buttonStyle = messageDiv.querySelector('button');
        if (buttonStyle) {
            buttonStyle.style.backgroundColor = '#2196F3';
            buttonStyle.style.color = 'white';
            buttonStyle.style.border = 'none';
            buttonStyle.style.padding = '10px 20px';
            buttonStyle.style.borderRadius = '5px';
            buttonStyle.style.marginTop = '15px';
            buttonStyle.style.cursor = 'pointer';
        }
        
        document.body.appendChild(messageDiv);
        
        document.getElementById('close-protection-msg').addEventListener('click', function() {
            document.body.removeChild(messageDiv);
        });
        
        // Auto-fechar após 5 segundos
        setTimeout(function() {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 5000);
    }

    // Adicionar metadata de proteção
    const metaAuthor = document.createElement('meta');
    metaAuthor.name = 'author';
    metaAuthor.content = protectionConfig.owner;
    document.head.appendChild(metaAuthor);
    
    const metaCopyright = document.createElement('meta');
    metaCopyright.name = 'copyright';
    metaCopyright.content = `© ${protectionConfig.owner} - ${protectionConfig.licenseType}`;
    document.head.appendChild(metaCopyright);

    // Adicionar hash de verificação de integridade (simulado)
    window._appIntegrityHash = btoa(JSON.stringify({
        name: protectionConfig.appName,
        version: protectionConfig.version,
        owner: protectionConfig.owner,
        timestamp: Date.now()
    }));
    
    // Verificar integridade periodicamente
    setInterval(function() {
        const currentHash = window._appIntegrityHash;
        if (!currentHash) {
            document.body.innerHTML = '<h1>Erro de integridade do aplicativo</h1>';
        }
    }, 10000);
})();
