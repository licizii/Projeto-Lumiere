
document.addEventListener("DOMContentLoaded", async () => {
    const totalPessoas = document.getElementById("totalPessoas");
    const mensagem = document.getElementById("mensagem");

    try {
        const resposta = await fetch("/pessoas");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar clientes.");
        }

        const pessoas = await resposta.json();

        totalPessoas.textContent = pessoas.length;

    } catch (erro) {
        console.error(erro);
        totalPessoas.textContent = "Indisponível";
        mensagem.textContent = "Não foi possível carregar os clientes.";
    }
});
