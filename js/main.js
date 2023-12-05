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
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{//? : condiçãoFinal, substitui o if como operador ternário
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
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
    novoItem.appendChild(botaoDeleta(item.id));
    novoItem.innerHTML += item.nome;
   
    const lista = document.getElementById("lista");
    lista.appendChild(novoItem);

    //array para inserir os itens e esses ficam salvos sem se sobrepor
    localStorage.setItem("item", JSON.stringify(item));

}

function atualizaElemento(item){
    documento.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//função para deletar os elementos da lista quando clica-se com o mouse
function botaoDeleta(id){
    //cria o elemento botao
    const elementoBotao = document.createElement("button")
    //configura o x para excluir os elementos do botao
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao
}
//função criada para "deletar" a tag quando for clicada
function deletaElemento(tag, id){
    tag.remove();
    itens.splice(itens, findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}