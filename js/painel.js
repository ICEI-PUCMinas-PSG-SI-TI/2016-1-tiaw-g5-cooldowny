function atualizarData() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    document.getElementById('dataAtual').textContent = `data: ${dia}/${mes}/${ano}`;
}

// Carregar dados do painel
function carregarDadosPainel() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('tempoJogo').textContent = '0h 0m';
    document.getElementById('tarefasCount').textContent = '0/0';
    document.getElementById('sessoesCount').textContent = '0';
    document.getElementById('excessosCount').textContent = '0';
}

function iniciarSessao() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuario) {
        alert('Você precisa estar logado para iniciar uma sessão');
        window.location.href = 'login.html';
        return;
    }

    // Criar nova sessão
    const sessao = {
        id: Date.now(),
        usuarioId: usuario.id,
        dataInicio: new Date().toLocaleString('pt-BR'),
        duracao: 0,
        ativo: true
    };

    let sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
    sessoes.push(sessao);
    localStorage.setItem('sessoes', JSON.stringify(sessoes));

    alert('Sessão iniciada! ⏱️');
    location.reload();
}

function gerenciarTarefas() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuario) {
        alert('Você precisa estar logado para gerenciar tarefas');
        window.location.href = 'login.html';
        return;
    }

    alert('Página de tarefas em desenvolvimento 📝');
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarData();
    carregarDadosPainel();
});
