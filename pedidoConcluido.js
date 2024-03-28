window.addEventListener("load", () => {

    const enderecoEntrega = document.getElementById("enderecoEntrega")
    const pagamentoEntrega = document.getElementById("pagamentoEntrega")
    const valorTotalEntrega = document.getElementById("valorTotalEntrega")
    const cafesSelecionadosParaEntrega = document.getElementById("cafesSelecionadosParaEntrega")
    
    const sessionStorageJSONstringify = sessionStorage.getItem('pedidoFinal')

    if(!sessionStorageJSONstringify) return

    const sessionStorageJSONparse = JSON.parse(sessionStorageJSONstringify)

    console.log(sessionStorageJSONparse)

    enderecoEntrega.innerHTML += `<span id="a2"> ${sessionStorageJSONparse[0].rua}, N° ${sessionStorageJSONparse[3].numero} </span> <span id="a3"> <span class="titulo-bairro"> Bairro </span> ${sessionStorageJSONparse[6].bairro}</span> <span id="a4"> <span class="titulo-cidade"> Cidade </span> ${sessionStorageJSONparse[2].cidade} - ${sessionStorageJSONparse[1].uf} </span>`

    pagamentoEntrega.innerHTML += `<span id="b3"> ${sessionStorageJSONparse[4].paymentFormChecked} </span>`

    valorTotalEntrega.innerHTML += `<span id="c3"> R$ ${sessionStorageJSONparse[5].valorTotal} </span>`

    cafesSelecionadosParaEntrega.innerHTML = ""

    for (indexOfSessionStorage = 7 ; indexOfSessionStorage < sessionStorageJSONparse.length ; indexOfSessionStorage++) {

        let p = document.createElement("p")

        p.innerHTML = `${sessionStorageJSONparse[indexOfSessionStorage].qtd} - ${sessionStorageJSONparse[indexOfSessionStorage].tipo}`

        p.classList.add("cafesSelecionadosParaEntrega")

        cafesSelecionadosParaEntrega.appendChild(p)

        sessionStorage.clear()

    }
})