const URL_SESSOES = 'http://localhost:3000/cronometro';
const URL_TAREFAS = 'http://localhost:3000/tarefas';

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function getUltimos7Dias() {
    const dias = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dias.push(d.toISOString().split('T')[0]);
    }
    return dias;
}

function formatarHoras(totalSegundos) {
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    if (horas > 0) return `${horas}h ${minutos}m`;
    return `${horas}h`;
}

async function carregarRelatorios() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }

    const ultimos7 = getUltimos7Dias();

    let sessoes = [];
    try {
        const res = await fetch(`${URL_SESSOES}?usuarioId=${usuario.id}`);
        sessoes = await res.json();
    } catch (e) {
        console.warn('Erro ao buscar sessões (json-server está rodando?):', e);
    }

    let tarefas = [];
    try {
        const res2 = await fetch(`${URL_TAREFAS}?usuarioId=${usuario.id}`);
        tarefas = await res2.json();
    } catch (e) {
        console.warn('Erro ao buscar tarefas (json-server está rodando?):', e);
    }

    const totalSegundos = sessoes.reduce((acc, s) => acc + (s.tempo || 0), 0);
    document.getElementById('totalJogado').textContent = formatarHoras(totalSegundos);

    const segundosUltimos7 = sessoes
        .filter(s => ultimos7.includes(s.data))
        .reduce((acc, s) => acc + (s.tempo || 0), 0);
    const mediaMinutos = Math.round((segundosUltimos7 / 7) / 60);
    document.getElementById('mediaDiaria').textContent = `${mediaMinutos}min`;

    const concluidas = tarefas.filter(t => t.concluida).length;
    document.getElementById('tarefasFeitas').textContent = concluidas;

    const excessos = sessoes.filter(s => (s.tempoExcedido || 0) > 0).length;
    document.getElementById('excessosTotal').textContent = excessos;

    const labelsSemana = ultimos7.map(data => {
        const diaSemana = new Date(data + 'T00:00:00').getDay();
        return DIAS_SEMANA[diaSemana];
    });

    const tempoPorDia = ultimos7.map(data => {
        const segundosDia = sessoes
            .filter(s => s.data === data)
            .reduce((acc, s) => acc + (s.tempo || 0), 0);
        return +(segundosDia / 3600).toFixed(2);
    });

    renderizarGraficoBarras('graficoTempoJogo', labelsSemana, tempoPorDia, '#f59e0b', 'Horas jogadas');

    const tarefasPorDia = ultimos7.map(data => {
        return tarefas.filter(t => t.data === data && t.concluida).length;
    });

    renderizarGraficoLinha('graficoTarefas', labelsSemana, tarefasPorDia, '#f59e0b', 'Tarefas concluídas');

    renderizarJogosMaisJogados(sessoes);
}

function renderizarGraficoBarras(canvasId, labels, dados, cor, labelDataset) {
    const ctx = document.getElementById(canvasId);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: labelDataset,
                data: dados,
                backgroundColor: cor,
                borderRadius: 4,
                maxBarThickness: 36
            }]
        },
        options: chartOptionsBase()
    });
}

function renderizarGraficoLinha(canvasId, labels, dados, cor, labelDataset) {
    const ctx = document.getElementById(canvasId);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: labelDataset,
                data: dados,
                borderColor: cor,
                backgroundColor: cor,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: cor
            }]
        },
        options: chartOptionsBase()
    });
}

function chartOptionsBase() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                ticks: { color: '#71717a', font: { size: 11 } },
                grid: { color: 'rgba(255,255,255,0.05)' }
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#71717a', font: { size: 11 }, stepSize: 1 },
                grid: { color: 'rgba(255,255,255,0.05)' }
            }
        }
    };
}

function renderizarJogosMaisJogados(sessoes) {
    const container = document.getElementById('jogosMaisJogados');

    if (sessoes.length === 0) {
        container.innerHTML = `<p class="text-zinc-500">Sem dados ainda</p>`;
        return;
    }

    const totaisPorJogo = {};
    sessoes.forEach(s => {
        const nome = s.jogo || 'Sem nome';
        totaisPorJogo[nome] = (totaisPorJogo[nome] || 0) + (s.tempo || 0);
    });

    const ranking = Object.entries(totaisPorJogo)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const maiorTempo = ranking[0][1] || 1;

    container.classList.remove('flex', 'flex-col', 'items-center', 'justify-center');
    container.classList.add('flex', 'flex-col', 'justify-center', 'gap-4', 'px-2');

    container.innerHTML = ranking.map(([nome, tempo]) => {
        const porcentagem = Math.max(6, Math.round((tempo / maiorTempo) * 100));
        return `
        <div>
            <div class="flex items-center justify-between mb-1">
                <span class="text-white text-sm font-medium">${nome}</span>
                <span class="text-zinc-500 text-xs">${formatarHoras(tempo)}</span>
            </div>
            <div class="w-full bg-zinc-900 rounded-full h-2">
                <div class="barra-jogo bg-orange-400 h-2 rounded-full" style="width: ${porcentagem}%"></div>
            </div>
        </div>`;
    }).join('');
}

document.addEventListener('DOMContentLoaded', carregarRelatorios);
