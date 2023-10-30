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

async function saveEmails(name, email, curso) {
    if (curso === "selecione") {
        alert("Selecione um curso")
        return;
    }
    try {
    var result = await fetch("https://660q5f5r.api.sanity.io/v2023-10-30/data/mutate/production", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer skq9dvuHQxxIazqpZcPXDEzDBxN9f3ubdDgp1mP2TxE0g21GUL9Ydv1SS5lx9gptn26HxvUPMJ5ZxbUqBf7EXbWJLTGx2T8aASqdjtJWR7VEiVOf2cjeoGhG1xFqoi7GiMTs39C8onrnZPTZhoNoQ5RETUn9s6BrzS3WaZPviXGm1XtIkQI4'
            },
            body: JSON.stringify({
                "mutations": [
                    {
                        "create": {
                            "_type": "emails",
                            "nome": name,
                            "email": email,
                            "curso": curso
                        }
                    }
                ]
            })
            }
        ,);
            console.log(result)

    } catch (error) {
        alert("Ocorreu um erro ao salvar os dados do form.", error);
        return;
    }





}



