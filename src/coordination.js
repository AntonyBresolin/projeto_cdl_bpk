document.addEventListener("DOMContentLoaded", function () {
    searchCoordination();
});

async function searchCoordination() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22coordenacao%22%5D%7B%0A++nome%2C+genero+%2C%22image%22%3A+imagem.asset-%3Eurl%0A%7D", {
            method: 'get',
        });

        var json = await result.json();
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados da coordenação.", error);
        return;
    }

    var coordination = json.result;
    renderCoordination(coordination);
}

function renderCoordination(coordination) {
        
        var image = coordination.at(-1).image
        var name = coordination.at(-1).nome
        var genero = coordination.at(-1).genero
        var coordinationImg = document.querySelector("#coordination_img")
        var coordinationName = document.querySelector("#coordination_name")
        coordinationImg.style = "width: 85%; height: 85%;"
        coordinationImg.src = image
        if (genero == "feminino") {
            coordinationName.innerHTML = "Profa. Dra. " + name
        } else {
            coordinationName.innerHTML = "Prof. Dr. " + name
        }
}
