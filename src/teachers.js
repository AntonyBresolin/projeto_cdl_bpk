//
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

    professores.forEach(professor => {
        var nome = professor.nome;
        var image = professor.image;
        var disciplina = professor.disciplina;            
    });
}