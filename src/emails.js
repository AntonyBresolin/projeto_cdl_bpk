var form = document.querySelector("#form_email")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    var name = document.querySelector("#name").value
    var email = document.querySelector("#email").value
    var curso = document.querySelector("#cursos_select").value
    name.value = ""
    email.value = ""
    curso.value = ""
    saveEmails(name, email, curso);
});

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




function sendMail(event){
    event.preventDefault();
    const destinatario = "centrodelinguas@bpkedu.com";
    const assunto = `Contato pelo Site`;
    const select = document.querySelector('#cursos-select');
    const option = select.options[select.selectedIndex].value;
    const mensagem =
        `Requisitante: ${document.getElementById('name').value}\nEmail: ${document.getElementById('mail').value}\nOlá, desejo tirar dúvidas sobre o curso de ${option.textContent}`;

    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem)}`;
}