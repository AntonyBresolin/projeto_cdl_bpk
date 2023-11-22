// Função padrão para carregar o script apenas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
    searchTeachers();
});

// Função para buscar os dados dos professores dentro do Sanity
async function searchTeachers() {
    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22professor%22%5D%7C+order%28_updatedAt+desc%29%7B%0A++nome%2C+%22image%22%3A+imagem.asset-%3Eurl%2C+disciplina%0A%7D", {
            method: 'get',
        });

        var json = await result.json();
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados dos Professores.", error);
        return;
    }

    var professores = json.result;

    renderTeachers(professores);
}

// Função para renderizar os dados dos professores na página com verificação de dados para remover o carrossel caso não tenha professores
function renderTeachers(professores) {

    if (professores.length < 1) {
        const title = document.querySelector("#carousel")
        const p = document.createElement("h2")
        p.innerHTML = 'Sem professores no momento'
        const controls = document.querySelector("#carousel-controls")
        controls.style.cssText = 'opacity: 0;'
        title.appendChild(p)
        return
    }
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ""; // Limpa conteúdo

    professores.forEach((professor, index) => {
        var nome = professor.nome;
        var image = professor.image;
        var disciplina = professor.disciplina;

        let box = document.createElement('div');
        box.classList.add('box1');

        let img = document.createElement('img');
        img.classList.add('img-profile');
        img.src = image;

        let nomeDom = document.createElement('div');
        nomeDom.classList.add('nome-professor');
        nomeDom.textContent = nome;

        let disciplinaDom = document.createElement('div');
        disciplinaDom.classList.add('materia-professor');
        disciplinaDom.textContent = disciplina;

        box.appendChild(img);
        box.appendChild(nomeDom);
        box.appendChild(disciplinaDom);

        carousel.appendChild(box);
    });

    
    // Controle do carrossel
    let currentSlide = 0;
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');


    nextBtn.addEventListener('click', () => {
        if (currentSlide < professores.length - 1) {
            currentSlide += 1;
        } else {
            currentSlide = 0;
        }
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide == 0) {
            currentSlide = professores.length - 1; // Vai para o último slide válido
        }  else {
            currentSlide -= 1;
        }
        updateCarousel();
    });

    function updateCarousel() {
        const offset = currentSlide * (250 + (2 * 16)); // Largura do box + gap (2rem convertido em pixels)
        carousel.style.transform = `translateX(-${offset}px)`;
    }

}
