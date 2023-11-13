document.addEventListener("DOMContentLoaded", function () {
    searchCourses();
});

async function searchCourses() {
    try {
        var result = await fetch('https://8lq8do82.api.sanity.io/v2021-10-21/data/query/production?query=%0A*%5B_type+%3D%3D+%22cursos%22%5D%7C+order%28_createdAt+desc%29%7B%0A++nome_curso%0A%7D&perspective=published', {
            method: 'get',
        })
        var json = await result.json();
    } catch (error) {
        console.error("Ocorrou erro ao achar dados sobre curso")
    }
    var cursos = json.result;

    renderCourses(cursos);
}
function renderCourses(cursos) {
    const coursesAvaliable = document.querySelector('#cursos_select');
    const optionsCourses = document.querySelector('#courses_avaliable');
    const footerCourses = document.querySelector('#footer_courses');
    for (let i = 0; i < 8; i++) {
        var nome = cursos[i].nome_curso;
        const option = document.createElement('option');
        const course = document.createElement('li');
        const footerLi = document.createElement('li');
        const footerA = document.createElement('a');

        //footerA.href = `./pages/${nome}.html`;
        footerA.href = `#`;
        footerA.textContent = nome;
        footerLi.appendChild(footerA);
        footerCourses.appendChild(footerLi);

        course.value = nome;
        course.textContent = nome;
        option.value = nome;
        option.textContent = nome;

        if (optionsCourses) {
            optionsCourses.appendChild(course);
        }
        if (coursesAvaliable) {
            coursesAvaliable.appendChild(option);
        }
        
    };
}