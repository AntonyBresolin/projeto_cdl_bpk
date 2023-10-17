async function searchCoordination() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22coordenacao%22%5D%7B%0A++%22image%22%3A+imagem.asset-%3Eurl%2C+nome%0A%7D", {
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
    
        var image = coordination[coordination.length -1].image
        var name = coordination[coordination.length -1].nome
        console.log(image, name)
}
