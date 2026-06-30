const URL_TAREFAS = 'http://localhost:3000/tarefas';

const inputTarefas = document.getElementById('input-tarefas');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const mensagemNenhumaTarefa = document.getElementById('mensagem-nenhuma-tarefa');
const barraProgresso = document.getElementById('barra-progresso');
const tarefasRealizadas = document.getElementById('tarefas-realizadas');

function getUsuario() {
    const u = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!u) { window.location.href = 'login.html'; }
    return u;
}

async function buscarTarefas() {
    const usuario = getUsuario();
    if (!usuario) return;

    try {
        // Busca apenas as tarefas do usuário logado
        const resposta = await fetch(`${URL_TAREFAS}?usuarioId=${usuario.id}`);
        const tarefas = await resposta.json();

        listaTarefas.innerHTML = '';
        let concluidas = 0;

        for (let i = 0; i < tarefas.length; i++) {
            if (tarefas[i].concluida) concluidas++;

            listaTarefas.innerHTML += `
            <div class="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 hover:border-zinc-600 transition">
                <div class="flex items-center gap-3">
                    <button onclick="concluirTarefa('${tarefas[i].id}', ${tarefas[i].concluida})"
                        class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition cursor-pointer
                        ${tarefas[i].concluida
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-zinc-600 hover:border-amber-400'}">
                        ${tarefas[i].concluida ? '✓' : ''}
                    </button>
                    <span class="font-medium ${tarefas[i].concluida ? 'line-through text-zinc-500' : 'text-white'}">
                        ${tarefas[i].titulo}
                    </span>
                </div>
                <button onclick="deletarTarefa('${tarefas[i].id}')"
                    class="text-zinc-600 hover:text-red-400 transition cursor-pointer text-lg leading-none px-1">
                    ✕
                </button>
            </div>`;
        }

        tarefasRealizadas.textContent = `${concluidas}/${tarefas.length}`;
        barraProgresso.style.width = tarefas.length > 0 ? `${(concluidas / tarefas.length) * 100}%` : '0%';
        mensagemNenhumaTarefa.style.display = tarefas.length === 0 ? 'flex' : 'none';

        lucide.createIcons();
    } catch (e) {
        listaTarefas.innerHTML = '<p class="text-red-400 text-sm">Erro ao carregar. Verifique se o json-server está rodando (npm run server).</p>';
    }
}

async function adicionarTarefa(event) {
    event.preventDefault();
    const usuario = getUsuario();
    if (!usuario) return;

    const titulo = inputTarefas.value.trim();
    if (!titulo) return;

    // Salva com o usuarioId e a data de criação (usada nos Relatórios)
    const hoje = new Date().toISOString().split('T')[0];
    try {
        await fetch(URL_TAREFAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, concluida: false, usuarioId: usuario.id, data: hoje })
        });
    } catch (e) {
        alert('Erro ao salvar a tarefa. Verifique se o json-server está rodando (npm run server).');
        return;
    }

    inputTarefas.value = '';
    buscarTarefas();
}

async function deletarTarefa(id) {
    await fetch(`${URL_TAREFAS}/${id}`, { method: 'DELETE' });
    buscarTarefas();
}

async function concluirTarefa(id, concluida) {
    await fetch(`${URL_TAREFAS}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluida: !concluida })
    });
    buscarTarefas();
}

btnAdicionar.addEventListener('click', adicionarTarefa);
inputTarefas.addEventListener('keydown', (e) => { if (e.key === 'Enter') adicionarTarefa(e); });

buscarTarefas();
