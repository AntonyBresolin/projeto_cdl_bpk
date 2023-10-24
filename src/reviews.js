document.addEventListener("DOMContentLoaded", function () {
    searchReviews();
});

async function searchReviews() {


    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22avaliacao%22%5D%7B%0A++nome%2C+nota%2C+curso%2C+%22image%22%3A+imagem.asset-%3Eurl+%2Cdescricao%0A%7D", {
            method: 'get',
        });

        var json = await result.json();
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados da avaliação.", error);
        return;
    }

    var avaliacoes = json.result;

    console.log("teste");
    renderReviews(avaliacoes);
}

// Path: src/avaliacao.js

function renderReviews(avaliacoes) {

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Embaralhar o array de avaliações
    shuffle(avaliacoes);

    // Pegar as primeiras 4 avaliações do array embaralhado
    const avaliacoesAleatorias = avaliacoes.slice(0, 4);

    avaliacoesAleatorias.forEach((avaliacao, index) => {
        var image = avaliacao.image;
        var nome = avaliacao.nome;
        var curso = avaliacao.curso;
        var nota = avaliacao.nota;
        var descricao = avaliacao.descricao;

        const imageDom = document.querySelector(`#review-${index + 1} .box-top .profile .profile-img img`);
        const nomeDom = document.querySelector(`#review-${index + 1} .box-top .profile .name-user strong`);
        const cursoDom = document.querySelector(`#review-${index + 1} .box-top .profile .name-user span`);
        const notaDom = document.querySelector(`#review-${index + 1} .box-top .reviews .box-estrela`);
        const descricaoDom = document.querySelector(`#review-${index + 1} .client-comment p`);



        if (imageDom) {
            imageDom.src = image;
        }
        if (nomeDom) {
            nomeDom.textContent = nome;
        }
        if (cursoDom) {
            cursoDom.textContent = curso;
        }
        if (descricaoDom) {
            descricaoDom.textContent = descricao;
        }
        if (notaDom) {
            notaDom.innerHTML = "";
            if (nota % 2 == 0) {
                nota = nota / 2;
                for (let i = 0; i < nota; i++) {
                    notaDom.innerHTML += `<i class="fas fa-star"></i>`;
                }
            } else {
                nota = (nota - 1) / 2;
                for (let i = 0; i < nota; i++) {
                    notaDom.innerHTML += `<i class="fas fa-star"></i>`;
                }
                notaDom.innerHTML += `<i class="fas fa-star-half-stroke"></i>`;
                for(let i = 0; i < 4 - nota; i++){
                    notaDom.innerHTML += `<i class="far fa-star"></i>`;
                } 
            }
        }
    });
}

function setStars(stars) {
    

}

