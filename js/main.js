const form = document.getElementById("novoItem");
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento)=>{
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) =>{
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.nome === nome.value)
    //const criada para não sobrepor os dados salvo no Local Storage
        const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value
        }
    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual);
        itens[existe.id] = itemAtual
    }else{
        itemAtual.id = itens.length
        criaElemento(itemAtual);  
        itens.push(itemAtual);
    }

    nome.value = ""
    quantidade.value = ""
})
function criaElemento(item){
    
    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');

    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    const lista = document.getElementById("lista");
    lista.appendChild(novoItem);

    //array para inserir os itens e esses ficam salvos sem se sobrepor
    
    localStorage.setItem("item", JSON.stringify(item));

}

function atualizaElemento(item){
    documento.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}