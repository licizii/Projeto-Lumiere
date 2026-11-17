
async function enviarDados() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !telefone || !cpf || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        senha: senha
    };

    try {
        const resposta = await fetch("/pessoas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert("Cliente cadastrado com sucesso!");
            document.querySelector("form").reset();
        } else {
            alert("Erro ao cadastrar cliente!");
        }

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Não foi possível conectar ao servidor!");
    }
}
