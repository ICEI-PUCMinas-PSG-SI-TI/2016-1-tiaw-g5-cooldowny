let inputTarefas = document.getElementById("input-tarefas");
let btnAdicionar = document.getElementById("btn-adicionar");
let listaTarefas = document.getElementById("lista-tarefas");
let mensagemNenhumaTarefa = document.getElementById("mensagem-nenhuma-tarefa")
let barraProgresso = document.getElementById("barra-progresso")
let tarefasRealizadas = document.getElementById("tarefas-realizadas")

async function buscarTarefas() {
    let resposta = await fetch("http://localhost:3000/tarefas");

    let tarefas = await resposta.json();
    console.log(tarefas);
    console.log(tarefas[0]);

    listaTarefas.innerHTML = "";

    let tarefasConcluidas = 0;

    for (let i = 0; i < tarefas.length; i++) {

        if (tarefas[i].concluida === true) {
            tarefasConcluidas++;
        }

        listaTarefas.innerHTML += `
        <div class="tarefa">
            <h3 class="${tarefas[i].concluida ? "concluida" : ""}">${tarefas[i].titulo}</h3>
            <div class="botoesEA">
                <button class="btn-concluir" onclick="concluirTarefa('${tarefas[i].id}', ${tarefas[i].concluida})">Concluir</button>
                <button class="btn-excluir" onclick="deletarTarefa('${tarefas[i].id}')">Excluir</button>
            </div>
        </div>
        `;
    }

    tarefasRealizadas.innerHTML = `${tarefasConcluidas}/${tarefas.length}`;

    if (tarefas.length > 0) {
        let porcentagem = (tarefasConcluidas / tarefas.length) * 100;

        barraProgresso.style.width = `${porcentagem}%`;
    } else {
        barraProgresso.style.width = "0%";
    }

    if (tarefas.length === 0) {
        mensagemNenhumaTarefa.style.display = "flex";
    } else {
        mensagemNenhumaTarefa.style.display = "none";
    }
}

buscarTarefas();

async function adicionarTarefa(event) {
    event.preventDefault();
    
    let novaTarefa = {
        titulo: inputTarefas.value,
        concluida: false
    };

    await fetch("http://localhost:3000/tarefas", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(novaTarefa)
    });

    inputTarefas.value = "";

    buscarTarefas();
}

btnAdicionar.addEventListener("click", adicionarTarefa);

async function deletarTarefa(id) {

    await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
    });

    buscarTarefas();
}

async function concluirTarefa(id, concluida) {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            concluida: !concluida
        })
    });

    buscarTarefas();
}