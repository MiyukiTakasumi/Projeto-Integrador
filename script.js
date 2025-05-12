const form = document.getElementById("formPet");
const msg = document.getElementById("mensagem");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add("validado");
        return;
    }
    const pet = {
        nomePet: document.getElementById("nomePet").value,
        nomeDono: document.getElementById("nomeDono").value,
        tipo: document.getElementById("tipo").value,
        raca: document.getElementById("raca").value,
        sexo: document.getElementById("sexo").value,
        idade: document.getElementById("idade").value
    };

    fetch('http://localhost:8080/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' };
        body: JSON.stringify(pet)
    })
    .then(response => {
       if (!response.ok) throw new Error('Erro ao cadastrar pet.');
       return response.json();
    })
    .then(data = > {
        msg.innerHTML = `<div class="alert alert-success"> Pet<strong>${data.nomePet}</strong> cadastrado com sucesso!</div>`;
        form.reset();
        form.classList.remove(`validado`);
    })
    .catch(error => {
        msg.innerHTML = `<div class="alert alert-daanger">${error.message}</div>`;
    });
});