//

document.addEventListener("DOMContentLoaded", function () {
    searchTeachers();
});


async function searchTeachers() {
    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22professor%22%5D%7B%0A++nome%2C+%22image%22%3A+imagem.asset-%3Eurl%2C+disciplina%0A%7D", {
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

// Path: src/teachers.js

function renderTeachers(professores) {
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
        if (currentSlide < professores.length - 4) {
            currentSlide += 4;
        } else {
            currentSlide = 0; // Volta para o início
        }
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide >= 4) {
            currentSlide -= 4;
        } else {
            currentSlide = professores.length - 4; // Vai para o último slide válido
            if (professores.length % 4 !== 0) { // Se não houver um múltiplo exato de 4 professores
                currentSlide = professores.length - (professores.length % 4);
            }
        }
        updateCarousel();
    });

    function updateCarousel() {
        const offset = currentSlide * (250 + (2 * 16)); // Largura do box + gap (2rem convertido em pixels)
        carousel.style.transform = `translateX(-${offset}px)`;
    }

}
