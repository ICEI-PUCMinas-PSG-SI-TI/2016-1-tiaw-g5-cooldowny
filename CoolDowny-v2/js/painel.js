const URL_SESSOES = 'http://localhost:3000/cronometro';
const URL_TAREFAS = 'http://localhost:3000/tarefas';

function atualizarData() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    document.getElementById('dataAtual').textContent = `data: ${dia}/${mes}/${ano}`;
}

async function carregarDadosPainel() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }

    const hoje = new Date().toISOString().split('T')[0];

    // --- Sessões do usuário logado, de hoje ---
    let sessoesHoje = [];
    try {
        const res = await fetch(`${URL_SESSOES}?usuarioId=${usuario.id}`);
        const minhas = await res.json();
        sessoesHoje = minhas.filter(s => s.data === hoje);
    } catch (e) {
        console.warn('Erro ao buscar sessões:', e);
    }

    const totalSegundos = sessoesHoje.reduce((acc, s) => acc + (s.tempo || 0), 0);
    const totalExcessos = sessoesHoje.filter(s => s.tempoExcedido > 0).length;
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);

    document.getElementById('tempoJogo').textContent = `${horas}h ${minutos}m`;
    document.getElementById('sessoesCount').textContent = sessoesHoje.length;
    document.getElementById('excessosCount').textContent = totalExcessos;

    // --- Tarefas do usuário logado ---
    let tarefas = [];
    try {
        const res2 = await fetch(`${URL_TAREFAS}?usuarioId=${usuario.id}`);
        tarefas = await res2.json();
    } catch (e) {
        console.warn('Erro ao buscar tarefas:', e);
    }

    const concluidas = tarefas.filter(t => t.concluida).length;
    document.getElementById('tarefasCount').textContent = `${concluidas}/${tarefas.length}`;

    renderizarSessoes(sessoesHoje);
}

function renderizarSessoes(sessoes) {
    const container = document.getElementById('sessoesList');

    if (sessoes.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-64 text-center">
                <i data-lucide="gamepad-2" class="w-16 h-16 text-zinc-700 mb-4"></i>
                <p class="text-zinc-500">Nenhuma sessão registrada hoje</p>
                <p class="text-zinc-600 text-sm mt-1">Clique em "Iniciar Sessão" para começar</p>
            </div>`;
        lucide.createIcons();
        return;
    }

    const humorCores = {
        'Feliz': 'text-green-400',
        'Ansioso': 'text-yellow-400',
        'Cansado': 'text-blue-400',
        'Estressado': 'text-red-400'
    };

    container.innerHTML = sessoes.map(s => {
        const h = Math.floor(s.tempo / 3600);
        const m = Math.floor((s.tempo % 3600) / 60);
        const excedeu = s.tempoExcedido > 0;
        const minutosExtra = Math.floor((s.tempoExcedido || 0) / 60);
        const corHumor = humorCores[s.humor] || 'text-zinc-400';

        return `
        <div class="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-600 transition">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center shrink-0">
                    <i data-lucide="gamepad-2" class="w-5 h-5 text-purple-400"></i>
                </div>
                <div>
                    <p class="text-white font-semibold">${s.jogo}</p>
                    <p class="text-xs ${corHumor}">Humor: ${s.humor}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="font-bold text-lg ${excedeu ? 'text-red-400' : 'text-amber-400'}">${h}h ${m}m</p>
                ${excedeu
                    ? `<p class="text-red-500 text-xs">+${minutosExtra}min excedido</p>`
                    : `<p class="text-green-500 text-xs">Dentro do limite</p>`}
            </div>
        </div>`;
    }).join('');

    lucide.createIcons();
}

function iniciarSessao() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario) {
        alert('Você precisa estar logado para iniciar uma sessão');
        window.location.href = 'login.html';
        return;
    }
    window.location.href = 'cronometro.html';
}

function gerenciarTarefas() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario) {
        alert('Você precisa estar logado para gerenciar tarefas');
        window.location.href = 'login.html';
        return;
    }
    window.location.href = 'tarefas.html';
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarData();
    carregarDadosPainel();
});
