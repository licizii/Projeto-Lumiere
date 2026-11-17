
document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaPessoas");
    const pesquisa = document.getElementById("pesquisa");
    const mensagem = document.getElementById("mensagem");

    let pessoas = [];

    async function carregarPessoas() {
        try {
            const resposta = await fetch("/pessoas");

            if (!resposta.ok) {
                throw new Error("Erro ao buscar clientes.");
            }

            pessoas = await resposta.json();
            mostrarPessoas(pessoas);

        } catch (erro) {
            console.error(erro);
            mensagem.textContent = "Não foi possível carregar os clientes.";
        }
    }

    function mostrarPessoas(dados) {
        lista.innerHTML = "";

        if (dados.length === 0) {
            lista.textContent = "Nenhum cliente encontrado.";
            return;
        }

        dados.forEach(pessoa => {
            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${pessoa.nome || ""} ${pessoa.sobrenome || ""}</h3>
                <p><strong>CPF:</strong> ${pessoa.cpf || ""}</p>
                <p><strong>Telefone:</strong> ${pessoa.telefone || ""}</p>
                <p><strong>E-mail:</strong> ${pessoa.email || ""}</p>
                <p><strong>Cidade:</strong> ${pessoa.cidade || ""}</p>
                <p><strong>Estado:</strong> ${pessoa.estado || ""}</p>
                <hr>
            `;

            lista.appendChild(card);
        });
    }

    pesquisa.addEventListener("input", () => {
        const termo = pesquisa.value.toLowerCase();

        const filtrados = pessoas.filter(pessoa =>
            (pessoa.nome || "").toLowerCase().includes(termo) ||
            (pessoa.cpf || "").includes(termo)
        );

        mostrarPessoas(filtrados);
    });

    carregarPessoas();
});
