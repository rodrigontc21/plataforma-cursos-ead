// diálogo de confirmação estilizado (substitui confirm() nativo)
function confirmar(mensagem, onConfirm) {
    const existente = document.getElementById('confirm-overlay');
    if (existente) existente.remove();

    const overlay = document.createElement('div');
    overlay.id = 'confirm-overlay';
    overlay.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:199999',
        'background:rgba(0,0,0,0.65)', 'backdrop-filter:blur(4px)',
        'display:flex', 'align-items:center', 'justify-content:center',
        'padding:1rem', 'animation:confirmFadeIn .18s ease'
    ].join(';');

    overlay.innerHTML = `
        <style>
            @keyframes confirmFadeIn { from{opacity:0} to{opacity:1} }
            @keyframes confirmSlideUp { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        </style>
        <div id="confirm-card" style="background:#13162a;border:1px solid rgba(255,255,255,.1);border-radius:20px;
             padding:2rem 1.75rem 1.5rem;max-width:380px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,.6);
             font-family:'Inter',sans-serif;animation:confirmSlideUp .22s cubic-bezier(.34,1.56,.64,1);
             display:flex;flex-direction:column;align-items:center;gap:1rem;">
            <div style="width:48px;height:48px;border-radius:14px;background:rgba(251,191,36,.12);
                        display:flex;align-items:center;justify-content:center;">
                <i class="bi bi-exclamation-triangle-fill" style="color:#fbbf24;font-size:1.3rem"></i>
            </div>
            <p style="color:#e2e8f0;font-size:.875rem;line-height:1.6;text-align:center;margin:0">${mensagem}</p>
            <div style="display:flex;gap:.625rem;width:100%;margin-top:.25rem">
                <button id="confirm-btn-cancelar" style="flex:1;padding:.65rem;border-radius:12px;
                    background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
                    color:#94a3b8;font-size:.83rem;font-weight:600;font-family:'Inter',sans-serif;
                    cursor:pointer;transition:background .15s,color .15s">Cancelar</button>
                <button id="confirm-btn-ok" style="flex:1;padding:.65rem;border-radius:12px;
                    background:#ef4444;border:none;color:#fff;font-size:.83rem;font-weight:600;
                    font-family:'Inter',sans-serif;cursor:pointer;transition:opacity .15s">Confirmar</button>
            </div>
        </div>`;

    document.body.appendChild(overlay);

    const fechar = () => {
        overlay.style.animation = 'confirmFadeIn .15s ease reverse forwards';
        setTimeout(() => overlay.remove(), 140);
    };

    document.getElementById('confirm-btn-ok').onclick     = () => { fechar(); onConfirm(); };
    document.getElementById('confirm-btn-cancelar').onclick = fechar;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
}

// gera o próximo ID disponível
function gerarId(lista, campoId) {
    if (!lista || lista.length === 0) return 1;
    return Math.max(...lista.map(item => item[campoId])) + 1;
}

// sistema de toast — substitui alert() nativo
(function injetarEstilosToast() {
    if (document.getElementById('toast-styles')) return;
    const s = document.createElement('style');
    s.id = 'toast-styles';
    s.textContent = `
        #toast-container { position:fixed; top:1.25rem; right:1.25rem; z-index:99999;
            display:flex; flex-direction:column; gap:0.5rem; max-width:340px; pointer-events:none; }
        .toast-item { background:#1a1a2e; border:1px solid rgba(255,255,255,0.07);
            border-radius:14px; padding:.875rem 1rem; display:flex; align-items:flex-start;
            gap:.65rem; box-shadow:0 8px 32px rgba(0,0,0,.45); pointer-events:all;
            font-family:'Inter',sans-serif; animation:toastIn .25s ease; }
        .toast-item.saindo { animation:toastOut .25s ease forwards; }
        @keyframes toastIn  { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes toastOut { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(24px); } }
        .toast-msg { font-size:.82rem; color:#e2e8f0; line-height:1.5; flex:1; }
        .toast-fechar { background:none; border:none; color:#64748b; cursor:pointer;
            padding:0; font-size:.95rem; line-height:1; flex-shrink:0; transition:color .15s; }
        .toast-fechar:hover { color:#e2e8f0; }
    `;
    document.head.appendChild(s);
})();

function mostrarToast(mensagem, tipo) {
    tipo = tipo || 'erro';
    const cfg = {
        erro:    { cor: '#ef4444', icone: 'bi-x-circle-fill' },
        sucesso: { cor: '#22c55e', icone: 'bi-check-circle-fill' },
        aviso:   { cor: '#f59e0b', icone: 'bi-exclamation-triangle-fill' },
        info:    { cor: '#6366f1', icone: 'bi-info-circle-fill' }
    };
    const c = cfg[tipo] || cfg.erro;

    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const item = document.createElement('div');
    item.className = 'toast-item';
    item.style.borderLeft = '3px solid ' + c.cor;
    item.innerHTML = `
        <i class="bi ${c.icone}" style="color:${c.cor};font-size:1rem;flex-shrink:0;margin-top:1px"></i>
        <span class="toast-msg">${mensagem}</span>
        <button class="toast-fechar" onclick="this.closest('.toast-item').remove()">
            <i class="bi bi-x"></i>
        </button>`;
    container.appendChild(item);

    setTimeout(() => {
        item.classList.add('saindo');
        setTimeout(() => item.remove(), 250);
    }, 4500);
}
