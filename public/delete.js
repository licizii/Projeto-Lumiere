
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formExcluir");
    const mensagem = document.getElementById("mensagem");

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const id = document.getElementById("id").value;

        if (!confirm(`Tem certeza que deseja excluir o cliente ${id}?`)) {
            return;
        }

        try {
            const resposta = await fetch(
                `/pessoas/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!resposta.ok) {
                throw new Error("Cliente não encontrado ou não foi possível excluir.");
            }

            mensagem.textContent = "Cliente excluído com sucesso!";
            mensagem.style.color = "green";

            formulario.reset();

        } catch (erro) {
            mensagem.textContent = erro.message;
            mensagem.style.color = "red";
        }
    });
});
