document.addEventListener("DOMContentLoaded", function () {
    searchReviews();
});

async function searchReviews() {
    try {
        var result = await fetch("https://0o8j5e3g.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22avaliacao%22%5D%7C+order%28_createdAt+desc%29%7B%0A++nome%2C+nota%2C+curso%2C+%22image%22%3A+imagem.asset-%3Eurl+%2Cdescricao%0A%7D", {
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

function renderReviews(avaliacoes) {
    if (avaliacoes.length < 1) {
        const title = document.querySelector("#testimonials")
        const p = document.createElement("h2")
        p.innerHTML = 'Sem avaliações no momento'
        title.appendChild(p)
        return
    }
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

    const container = document.querySelector("#testimonials .testimonial-box-container");
    container.innerHTML = ''; // Limpar container

    avaliacoesAleatorias.forEach((avaliacao, index) => {
        let box = document.createElement('div');
        box.className = "testimonial-box";
        box.id = `review-${index + 1}`;

        let topDiv = document.createElement('div');
        topDiv.className = "box-top";

        let profileDiv = document.createElement('div');
        profileDiv.className = "profile";

        let imgDiv = document.createElement('div');
        imgDiv.className = "profile-img";

        let image = document.createElement('img');
        image.src = avaliacao.image;
        image.alt = "imagem usuário";

        imgDiv.appendChild(image);
        profileDiv.appendChild(imgDiv);

        let nameUserDiv = document.createElement('div');
        nameUserDiv.className = "name-user";

        let nomeStrong = document.createElement('strong');
        nomeStrong.textContent = avaliacao.nome;

        let cursoSpan = document.createElement('span');
        cursoSpan.textContent = `@${avaliacao.curso}`;

        nameUserDiv.appendChild(nomeStrong);
        nameUserDiv.appendChild(cursoSpan);

        profileDiv.appendChild(nameUserDiv);

        topDiv.appendChild(profileDiv);

        let reviewsDiv = document.createElement('div');
        reviewsDiv.className = "reviews";

        let boxEstrelaDiv = document.createElement('div');
        boxEstrelaDiv.className = "box-estrela";

        // Adicionar estrelas de acordo com a nota
        let nota = avaliacao.nota;
        if (nota % 2 == 0) {
            nota = nota / 2;
            for (let i = 0; i < nota; i++) {
                let star = document.createElement('i');
                star.className = "fas fa-star";
                boxEstrelaDiv.appendChild(star);
            }
        } else {
            nota = (nota - 1) / 2;
            for (let i = 0; i < nota; i++) {
                let star = document.createElement('i');
                star.className = "fas fa-star";
                boxEstrelaDiv.appendChild(star);
            }
            let halfStar = document.createElement('i');
            halfStar.className = "fas fa-star-half-stroke";
            boxEstrelaDiv.appendChild(halfStar);
            for(let i = 0; i < 4 - nota; i++){
                let emptyStar = document.createElement('i');
                emptyStar.className = "far fa-star";
                boxEstrelaDiv.appendChild(emptyStar);
            }
        }

        reviewsDiv.appendChild(boxEstrelaDiv);
        topDiv.appendChild(reviewsDiv);

        box.appendChild(topDiv);

        let clientCommentDiv = document.createElement('div');
        clientCommentDiv.className = "client-comment";

        let commentP = document.createElement('p');
        commentP.textContent = avaliacao.descricao;

        clientCommentDiv.appendChild(commentP);
        box.appendChild(clientCommentDiv);

        container.appendChild(box);
    });
}
