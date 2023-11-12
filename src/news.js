document.addEventListener("DOMContentLoaded", function () {
    searchNews();
});

async function searchNews() {

    try {
        var result = await fetch("https://0o8j5e3g.api.sanity.io/v2021-10-21/data/query/production?query=%0A%0A*%5B_type+%3D%3D+%22noticia%22%5D+%7B%0A++%22image%22%3A+imagem.asset-%3Eurl%2C+link%0A%7D%0A&perspective=published", {
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
    if(news.length > 0){
        news.slice(-6).reverse()
            .forEach(function (news) {
                var image = news.image;
                var links = news.link;

                var newsImg = document.querySelector("#redes_img");
                var link = document.createElement("a");
                link.href = links;
                link.target = "_blank";

                var img = document.createElement("img");
                img.src = image;
                img.alt = "Imagem da noticia";
                link.appendChild(img);
                newsImg.appendChild(link);
            });
        }
    else{
        var news = document.getElementById("redes_img")
        news.classList.add("news-none")
        news.classList.remove("redes-img");

        var h2 = document.createElement('h2');
        h2.textContent = "Nenhuma notícia encontrada";

        news.appendChild(h2);
    }
}