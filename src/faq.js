// Função padrão para carregar o script apenas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
    searchFaq();
});

// Função para buscar os dados do FAQ dentro do Sanity
async function searchFaq() {

    try {
        var result = await fetch("https://660q5f5r.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22pergunta_frequente%22%5D%7C+order%28_updatedAt+desc%29%7B%0A++pergunta%2C+resposta%0A%7D", {
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

// Função para renderizar os dados do FAQ na página com verificação de dados e criação de todas as perguntas e respostas do FAQ
function renderFaqs(faqs) {
    if (faqs.length < 1) {
        const title = document.querySelector("#layout")
        const p = document.createElement("h2")
        p.innerHTML = 'Sem perguntas frequentes no momento'
        title.appendChild(p)
        return
    }
    
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

// Função para criar o evento de clique nos botões de pergunta e resposta do FAQ
function accordionEvent() {
    const answers = document.querySelectorAll(".accordion");

    answers.forEach((event) => {
        event.addEventListener("click", () => {
            event.classList.toggle("active");
        });
    });
}

