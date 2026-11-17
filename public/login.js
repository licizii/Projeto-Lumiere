
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formLogin");
    const mensagem = document.getElementById("mensagem");

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        try {
            const resposta = await fetch("/pessoas");

            if (!resposta.ok) {
                throw new Error("Erro ao consultar o servidor.");
            }

            const pessoas = await resposta.json();

            const usuario = pessoas.find(pessoa =>
                pessoa.email?.toLowerCase() === email.toLowerCase() &&
                pessoa.senha === senha
            );

            if (usuario) {

                sessionStorage.setItem("usuario", JSON.stringify(usuario));

                window.location.href = "bemvindo.html";

            } else {
                mensagem.textContent = "E-mail ou senha incorretos!";
                mensagem.style.color = "red";
            }

        } catch (erro) {
            console.error(erro);

            mensagem.textContent = "Erro ao conectar com o servidor.";
            mensagem.style.color = "red";
        }
    });

});
