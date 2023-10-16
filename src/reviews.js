async function searchReviews() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22avaliacao%22%5D%7B%0A++nome%2C+nota%2C+insta%2C+descricao%0A%7D", {
            method: 'get',
        });

        var json = await result.json();
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados da avaliação.", error);
        return;
    }

    var avaliacoes = json.result;

    renderReviews(avaliacoes);
}

// Path: src/avaliacao.js

function renderReviews(avaliacoes) {

    avaliacoes.forEach(avaliacao => {
        var nome = avaliacao.nome;
        var nota = avaliacao.nota;
        var insta = avaliacao.insta;
        var descricao = avaliacao.descricao;
        console.log(nome);   

    });
}