
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    if (!formulario) {
        console.error("Formulário de cadastro não encontrado.");
        return;
    }

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const dadosFormulario = new FormData(formulario);

        const dados = {
            nome: dadosFormulario.get("nome")?.trim(),
            sobrenome: dadosFormulario.get("sobrenome")?.trim(),
            cpf: dadosFormulario.get("cpf")?.trim(),
            telefone: dadosFormulario.get("telefone")?.trim(),
            email: dadosFormulario.get("email")?.trim(),
            senha: dadosFormulario.get("senha"),
            rua: dadosFormulario.get("rua")?.trim(),
            cep: dadosFormulario.get("cep")?.trim(),
            cidade: dadosFormulario.get("cidade")?.trim(),
            estado: dadosFormulario.get("estado")?.trim(),
            administrador: dadosFormulario.get("administrador") || "não"
        };

        const mensagem = document.getElementById("mensagem");

        try {
            const resposta = await fetch("/pessoas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!resposta.ok) {
                throw new Error("Não foi possível realizar o cadastro.");
            }

            if (mensagem) {
                mensagem.textContent = "Cadastro realizado com sucesso!";
                mensagem.style.color = "green";
            }

            formulario.reset();

        } catch (erro) {
            console.error(erro);

            if (mensagem) {
                mensagem.textContent = "Erro ao cadastrar. Verifique o servidor.";
                mensagem.style.color = "red";
            }
        }
    });
});
