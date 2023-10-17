async function searchCourses() {
    try {
        var result = await fetch('https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=%0A*%5B_type+%3D%3D+%22cursos%22%5D%7B%0A++nome_curso%0A%7D&perspective=published', {
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
    cursos.forEach(curso => {
        var nome = curso.nome_curso;
        
    });

}