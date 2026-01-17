// Micro-interactions: theme toggle, submit toast
(() => {
  const themeToggle = document.getElementById('themeToggle');
  const toast = document.getElementById('toast');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Toggle theme
  themeToggle && themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    themeToggle.textContent = dark ? '🌙' : '☀️';
  });

  // Simple toast helper
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 2800);
  }

  // Generic submit handler for both forms
  function handleSubmit(formEl){
    if(!formEl) return;
    formEl.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = formEl.querySelector('.main-button');
      if(btn){ btn.disabled = true; btn.style.transform = 'scale(0.98)'; }

      const isSignup = formEl.id === 'signupForm';
      showToast(isSignup ? 'Criando sua conta...' : 'Entrando...');

      setTimeout(()=>{
        const action = formEl.getAttribute('action') || '/';
        const formData = new FormData(formEl);
        fetch(action, { method: formEl.method || 'POST', body: formData }).then(res=>{
          showToast(isSignup ? 'Conta criada com sucesso!' : 'Login realizado!');
          setTimeout(()=>{
            try{
              if(isSignup) window.location.href = 'telaConfirmacao.html';
              else window.location.href = '/dashboard' || 'index.html';
            }catch(e){}
          },700);
        }).catch(()=>{
          showToast(isSignup ? 'Erro ao criar conta. Tente novamente' : 'Erro ao entrar. Verifique credenciais');
          if(btn) btn.disabled = false;
        });
      },700);
    });
  }

  handleSubmit(loginForm);
  handleSubmit(signupForm);
})();
