

document.addEventListener("DOMContentLoaded", () => {
    const formBuscar = document.getElementById("formBuscar");
    const formEditar = document.getElementById("formEditar");
    const mensagem = document.getElementById("mensagem");

    let pessoaAtual = null;

    formBuscar.addEventListener("submit", async (event) => {
        event.preventDefault();

        const cpf = document.getElementById("cpfBusca").value.trim();

        try {
            const resposta = await fetch(
                `/pessoas?cpf=${encodeURIComponent(cpf)}`
            );

            if (!resposta.ok) {
                throw new Error("Erro ao buscar cliente.");
            }

            const pessoas = await resposta.json();

            if (pessoas.length === 0) {
                throw new Error("Cliente não encontrado.");
            }

            pessoaAtual = pessoas[0];

            ["nome", "sobrenome", "cpf", "telefone", "email",
             "rua", "cep", "cidade", "estado"].forEach(campo => {
                document.getElementById(campo).value = pessoaAtual[campo] || "";
            });

            document.getElementById("senha").value = "";

            formEditar.style.display = "block";
            mensagem.textContent = "Cliente encontrado!";

        } catch (erro) {
            mensagem.textContent = erro.message;
            formEditar.style.display = "none";
        }
    });

    formEditar.addEventListener("submit", async (event) => {
        event.preventDefault();

        const dados = {};

        ["nome", "sobrenome", "cpf", "telefone", "email",
         "rua", "cep", "cidade", "estado"].forEach(campo => {
            dados[campo] = document.getElementById(campo).value.trim();
        });

        const novaSenha = document.getElementById("senha").value;

        dados.senha = novaSenha || pessoaAtual.senha;

        try {
            const resposta = await fetch(
                `/pessoas/${pessoaAtual.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                }
            );

            if (!resposta.ok) {
                throw new Error("Erro ao atualizar cadastro.");
            }

            mensagem.textContent = "Cadastro atualizado com sucesso!";
            pessoaAtual = { ...pessoaAtual, ...dados };

        } catch (erro) {
            mensagem.textContent = erro.message;
        }
    });
});
