async function searchNews() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=%0A%0A*%5B_type+%3D%3D+%22noticia%22%5D+%7B%0A++%22image%22%3A+imagem.asset-%3Eurl%2C+link%0A%7D%0A&perspective=published", {
            method: 'get',
        });

        var json = await result.json();
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados das noticias.", error);
        return;
    }

    var news = json.result;

    renderNews(news);
}

function renderNews(news) {
    news.forEach(news => {
        var image = news.image;
        var link = news.link;
        console.log(image, link);
    })
}
