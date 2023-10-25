document.addEventListener("DOMContentLoaded", function () {
    searchFaq();
});

async function searchFaq() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22pergunta_frequente%22%5D%7B%0A++pergunta%2C+resposta%0A%7D", {
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
        
        var layout = document.getElementById("layout");
        var pPergunta = document.createElement("p");
        var pResposta = document.createElement("p");
        var faq = document.createElement("div");
        var faqPergunta = document.createElement("div");
        var faqResposta = document.createElement("div");

        faq.classList.add("accordion");
        faqPergunta.classList.add("accordion__question");
        faqResposta.classList.add("accordion__answer");
        pPergunta.innerHTML = "+ " + pergunta;
        pResposta.innerHTML = resposta;

        faqPergunta.appendChild(pPergunta);
        faqResposta.appendChild(pResposta);
        faq.appendChild(faqPergunta);
        faq.appendChild(faqResposta);
        layout.appendChild(faq);
    });

    accordionEvent();
}

function accordionEvent() {
    const answers = document.querySelectorAll(".accordion");

    answers.forEach((event) => {
        event.addEventListener("click", () => {
            event.classList.toggle("active");
        });
    });
}

