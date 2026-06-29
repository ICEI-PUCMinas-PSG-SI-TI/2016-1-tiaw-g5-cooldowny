let graficoSemana = document.getElementById("grafico-semana");
let filtro = document.getElementById("filtro");
let btnAtualizar = document.getElementById("btn-atualizar");

async function carregarGrafico() {
    const resposta = await fetch("http://localhost:3000/semana");

    let dados = await resposta.json();

    if (filtro.value === "comTarefas") {
        let dadosFiltrados = [];

        for (let i = 0; i < dados.length; i++) {
            if (dados[i].tarefasRealizadas > 0) {
                dadosFiltrados.push(dados[i]);
            }
        }

        dados = dadosFiltrados;
    }

    graficoSemana.innerHTML = "";

    let maiorValor = 0;

    for (let i = 0; i < dados.length; i++) {
        if (dados[i].tarefasRealizadas > maiorValor) {
            maiorValor = dados[i].tarefasRealizadas;
        }
    }

    for (let i = 0; i < dados.length; i++) {
        let alturaBarra = 0;

        if (maiorValor > 0) {
            alturaBarra = (dados[i].tarefasRealizadas / maiorValor) * 200;
        }

        graficoSemana.innerHTML += `
            <div class="coluna">
                <span class="valor">${dados[i].tarefasRealizadas}</span>

                <div class="barra" style="height: ${alturaBarra}px;"></div>

                <span class="dia">
                    ${dados[i].diaDaSemana}
                </span>
            </div>
        `;
    }
}

carregarGrafico();

btnAtualizar.addEventListener("click", carregarGrafico);

filtro.addEventListener("change", carregarGrafico);