var form = document.querySelector("#form_email")

// Função para pegar os dados enviados no form de contato
form.addEventListener("submit", (e) => {
    e.preventDefault();
    var name = document.querySelector("#name")
    var email = document.querySelector("#email")
    var curso = document.querySelector("#cursos_select")
    saveEmails(name.value, email.value, curso.value);
    name.value = ""
    email.value = ""
    curso.value = "selecione"
});

// Função para fazer verificação de campos vazios e enviar email usando mailto
function saveEmails(name, email, curso) {
    if (curso === "selecione") {
        alert("Selecione um curso")
        return;
    }
    try {
        const destinatario = "centrodelinguas@bpkedu.com";
        const assunto = `Contato pelo Site`;
        const mensagem =
            `Requisitante: ${name}\nEmail: ${email}\nOlá, desejo tirar dúvidas sobre o curso de ${curso}`;
    
        window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem)}`;

    } catch (error) {
        alert("Ocorreu um erro ao salvar os dados do form.", error);
        return;
    }
}