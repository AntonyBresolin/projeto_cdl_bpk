async function searchFaq() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22pergunta_frequente%22%5D%7B%0A++pergunta%2C+resposta%0A%7D"
            , {
                method: 'get'
            });
        var json = await result.json();
    } catch (error) {
        console.error("Ocorreu erro ao buscar dados da faq", error);
        return;
    }
    var faqs = json.result;

    renderFaqs(faqs);
}
function renderFaqs(faqs) {
    faqs.forEach(faq => {
        var pergunta = faq.pergunta;
        var resposta = faq.resposta;
        console.log(pergunta)
    });

}

