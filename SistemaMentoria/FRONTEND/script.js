document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica do Tema (Dark Mode)
    const themeBtn = document.querySelectorAll('#themeToggle'); // Seleciona em ambas as páginas
    const body = document.body;
    
    // Verifica preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark');
        updateIcons(true);
    }

    themeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcons(isDark);
        });
    });

    function updateIcons(isDark) {
        themeBtn.forEach(btn => {
            btn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // 2. Simulação de Envio de Formulário e Toast
    const forms = document.querySelectorAll('form');
    const toast = document.getElementById('toast');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento real da página
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Estado de "Carregando"
            btn.textContent = 'Processando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simula delay de rede (1.5 segundos)
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                
                // Mensagem de sucesso baseada no ID do form
                const msg = form.id === 'loginForm' 
                    ? 'Login realizado com sucesso!' 
                    : 'Conta criada! Redirecionando...';
                
                showToast(msg);

                // Opcional: Redirecionar visualmente após sucesso
                if(form.id === 'signupForm') {
                    setTimeout(() => window.location.href = 'index.html', 1500);
                }
            }, 1500);
        });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});