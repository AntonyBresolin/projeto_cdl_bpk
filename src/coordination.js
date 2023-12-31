// Função padrão para carregar o script apenas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
    searchCoordination();
});

// Função para buscar os dados dos professores dentro do Sanity
async function searchCoordination() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22coordenacao%22%5D%7C+order%28_updatedAt+desc%29%7B%0A++nome%2C+genero+%2C%22image%22%3A+imagem.asset-%3Eurl%0A%7D", {
            method: 'get',
        });

        var json = await result.json();
    } catch (error) {
        console.error("Erro ao fazer o fetch", error);
        return;
    }

    var coordination = json.result;
    renderCoordination(coordination);
}

// Função para renderizar os dados dos professores na página pegando apenas o primeiro coordenador ou seja, o último criado
function renderCoordination(coordination) {
    var coordinationImg = document.querySelector("#coordination_img")
    var coordinationName = document.querySelector("#coordination_name")
    try {
        var image = coordination[0].image
        var name = coordination[0].nome
        var genero = coordination[0].genero
        coordinationImg.style = "width: 85%; height: 85%;"
        coordinationImg.src = image
        if (genero == "feminino") {
            coordinationName.innerHTML = "Profa. Dra. " + name
        } else {
            coordinationName.innerHTML = "Prof. Dr. " + name
        }
    } catch (error) {
        coordinationName.innerHTML = "Erro ao carregar os dados do coordenador."
        return;
    }
}
