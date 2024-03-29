const headerCarrinho = document.querySelector("#headerCarrinho")

const cafesSelecionados = document.querySelector("#selecionados")

const finalizacao = document.querySelector("#finalizacao")

const pedido = []

const pedidoConcluido = []

const cafes = [
    document.getElementsByTagName('p')[5],
    document.getElementsByTagName('p')[6],
    document.getElementsByTagName('p')[7],
    document.getElementsByTagName('p')[8],
    document.getElementsByTagName('p')[9],
    document.getElementsByTagName('p')[10],
    document.getElementsByTagName('p')[11],
    document.getElementsByTagName('p')[12],
    document.getElementsByTagName('p')[13],
    document.getElementsByTagName('p')[14],
    document.getElementsByTagName('p')[15],
    document.getElementsByTagName('p')[16],
    document.getElementsByTagName('p')[17],
    document.getElementsByTagName('p')[18] 
]

cafes.forEach(cafe => {

    const preco = cafe.querySelector("#coffeePrice")
    const tipo = cafe.querySelector("#tipo")
    const menos = cafe.querySelector("#menos")
    const qtd = cafe.querySelector("#qtd")
    const mais = cafe.querySelector("#mais")
    const carrinho = cafe.querySelector("#carrinho")

    mais.addEventListener("click", () => {

        qtd.innerHTML ++

    })

    menos.addEventListener("click", () => {

        if (qtd.innerHTML <=0) {
            return
        }
        qtd.innerHTML --
    
    })

    carrinho.addEventListener("click", () => {

        if (qtd.innerHTML == 0) {
            return
        }

        if(pedido.some(p => p.tipo == tipo.innerHTML)) {

            let index = pedido.findIndex(p => p.tipo == tipo.innerHTML)

            let qtdAtual = ((Number.parseFloat(pedido[index].qtd) + Number.parseFloat(qtd.innerHTML)))
            let precoAtual = ((Number.parseFloat(pedido[index].preco) + Number.parseFloat(preco.innerHTML*qtd.innerHTML)).toFixed(2))
            
            pedido[index] = {
                'qtd' : qtdAtual,
                'tipo' : tipo.innerHTML,
                'preco' : precoAtual
            }

            qtd.innerHTML = 0
            notificacaoCarrinho()
            selecionados()
            end()
            return
        }

        pedido.push({
            'qtd' : qtd.innerHTML,
            'tipo' : tipo.innerHTML,
            'preco' : (preco.innerHTML*qtd.innerHTML).toFixed(2)
        })

        qtd.innerHTML = 0
        notificacaoCarrinho()
        selecionados()
        end()

    })

})

function selecionados() {

    cafesSelecionados.innerHTML = ""

    pedido.forEach(item => {

        let p = document.createElement("p")

        p.classList.add("selecionados")
        
        p.innerHTML = `<span class='qtdTipo'> ${item.qtd} - ${item.tipo} </span>
        <button class='selecionadosMenosBtn'> - </button> <button class='selecionadosMaisBtn'> + </button>
        <span class='selecionadosPrice'> R$ ${item.preco} </span>`

        let indexOfItem = pedido.indexOf(item)
        let btnMenos = p.querySelector(".selecionadosMenosBtn")
        let btnMais = p.querySelector(".selecionadosMaisBtn")

        let precoDoCafe

        switch(item.tipo) {
            case ' Tradicional Expresso ':
                precoDoCafe = parseFloat(7.00).toFixed(2)
                break;

            case ' Expresso Americano ':
                precoDoCafe = parseFloat(7.50).toFixed(2)
                break;

            case ' Expresso Americano ':
                precoDoCafe = parseFloat(7.50).toFixed(2)
                break;

            case ' Expresso Cremoso ':
                    precoDoCafe = parseFloat(7.80).toFixed(2)
                    break;

            case ' Expresso Gelado ':
                precoDoCafe = parseFloat(7.50).toFixed(2)
                break;

            case ' Café com Leite ':
                precoDoCafe = parseFloat(7.80).toFixed(2)
                break;

            case ' Latte ':
                precoDoCafe = parseFloat(8.00).toFixed(2)
                break;

            case ' Capuccino ':
                precoDoCafe = parseFloat(8.50).toFixed(2)
                break;

            case ' Macchiato ':
                precoDoCafe = parseFloat(8.50).toFixed(2)
                break;

            case ' Mocaccino ':
                precoDoCafe = parseFloat(9.00).toFixed(2)
                break;

            case ' Chocolate Quente ':
                precoDoCafe = parseFloat(9.00).toFixed(2)
                break;

            case ' Cubano ':
                precoDoCafe = parseFloat(11.00).toFixed(2)
                break;
    
            case ' Havaiano ':
                precoDoCafe = parseFloat(10.00).toFixed(2)
                break;

            case ' Árabe ':
                precoDoCafe = parseFloat(9.90).toFixed(2)
                break;
            
            case ' Irlandês ':
                precoDoCafe = parseFloat(12.00).toFixed(2)
                break
        }

        btnMenos.addEventListener("click", () => {
            
            if (item.qtd == 1) {
                pedido.splice(indexOfItem, 1)
                notificacaoCarrinho()
                selecionados()
                end()
                return
            }

            item.qtd --
            item.preco = (parseFloat(item.preco) - parseFloat(precoDoCafe)).toFixed(2)
            selecionados()
            end()
        })

        btnMais.addEventListener("click", () => {
            item.qtd ++
            item.preco = (parseFloat(item.preco) + parseFloat(precoDoCafe)).toFixed(2)
            selecionados()
            end()
        })

        cafesSelecionados.appendChild(p)

    })

}

function end() {

    let tot = 0

    pedido.forEach(item => {
        tot += parseFloat(item.preco)
    })

    finalizacao.innerHTML = "<p id='totalPrice'>" + "Total " + "<span class='totalPrice'>" + "R$ " + tot.toFixed(2) + "</span>" + "</p>"
    pedidoConcluido[5] = ({'valorTotal' : tot.toFixed(2)})
}

/* HEADER CARRINHO */
headerCarrinho.addEventListener("click", () => {
    window.scrollTo(0, 1700)
})

/* Endereço */

const form = document.querySelector("#form")
const inputCep = document.querySelector("#cep")
const inputRua = document.querySelector("#rua")
const inputBairro = document.querySelector("#bairro")
const inputCidade = document.querySelector("#cidade")
const inputNumero = document.querySelector("#numero")
const inputComplemento = document.querySelector("#complemento")
const inputUF = document.querySelector("#uf")
const formInputs = document.querySelectorAll("[data-input]")

const allInputs = [inputCep, inputRua, inputBairro, inputCidade, inputNumero, inputUF]

// Validação de Cep

inputCep.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode)

    // Permitir apenas números

    if (!onlyNumbers.test(key)) {
        e.preventDefault()
        return
    }
})

const inputsClass = [inputRua, inputBairro, inputNumero]

inputsClass.forEach(input => {

    input.addEventListener('keyup', () => {

        if(input.value.trim() != "" ) {
            input.classList.remove("vazio")
            input.classList.add("preenchido")
        } else {
            input.classList.remove("preenchido")
            input.classList.add("vazio")
        }

    })

})

inputCep.addEventListener("keyup", () => {

    const inputValue = inputCep.value
    inputCep.classList.remove("preenchido")
    inputCep.classList.add("vazio")

    if (inputValue.length === 8) {
        pegarEndereço(inputValue)
    }

})

const pegarEndereço = async (cep) => {
    
    let cepNumbers = inputCep.value

    inputCep.blur()

    resetForm()

    inputCep.value = cepNumbers

    const apiUrl = `https://viacep.com.br/ws/${cep}/json`

    const response = await fetch(apiUrl)

    const data = await response.json()

    // mostrar erro e resetar formulario

    if (data.erro === true) {
        form.reset()
        fillFormInputCheckError(inputRua)
        fillFormInputCheckError(inputCep)
        fillFormInputCheckError(inputCidade)
        fillFormInputCheckError(inputUF)
        fillFormInputCheckError(inputBairro)
        inputCep.classList.remove("preenchido")
        inputCep.classList.add("vazio")
        inputCep.focus()
        return
    }

    inputCep.classList.remove("vazio")
    inputCep.classList.add("preenchido")

    fillForm(data)
    
    fillFormInputCheckOk(inputCidade)
    fillFormInputCheckOk(inputUF)
    
}

function inputDisabled(input) {
    input.setAttribute("disabled","disabled")
}

function removeDisabledInput(input) {
    input.removeAttribute("disabled")
}

function fillFormInputCheckOk(input) {
    input.classList.remove("vazio")
    input.classList.add("preenchido")
}

function fillFormInputCheckError(input) {
    input.classList.remove("preenchido")
    input.classList.add("vazio")
}

function fillForm(data) {

    if(data.logradouro) {
        inputRua.value = data.logradouro
        fillFormInputCheckOk(inputRua)
    } else {
        fillFormInputCheckError(inputRua)
        removeDisabledInput(inputRua)
    }

    fillFormInputCheckError(inputNumero)
    removeDisabledInput(inputNumero)

    inputComplemento.removeAttribute("disabled")
    
    if(data.bairro) {
        inputBairro.value = data.bairro
        fillFormInputCheckOk(inputBairro)
    } else {
        fillFormInputCheckError(inputBairro)
        removeDisabledInput(inputBairro)
    }

    inputCidade.value = data.localidade
    inputUF.value = data.uf
}

function resetForm() {
    form.reset()
    inputDisabled(inputRua)
    inputDisabled(inputNumero)
    inputDisabled(inputComplemento)
    inputDisabled(inputBairro)
    inputDisabled(inputCidade)
}

const paymentForm = document.querySelectorAll("input[type=radio]")

paymentForm.forEach(p => {

    addEventListener("click", () => {

        if (p.checked == true) {

            document.querySelector(`.${p.id}`).classList.add("paymentFormChecked")
            pedidoConcluido[4] = ({'paymentFormChecked' : p.id})

        } else {
            
            document.querySelector(`.${p.id}`).classList.remove("paymentFormChecked")

        }

    })

})

document.querySelector("#finalizarPedido").addEventListener("click", () => {

    sessionStorage.clear()

    const rua = document.querySelector("#rua")
    const bairro = document.querySelector("#bairro")
    
    pedidoConcluido[0] = ({'rua' : rua.value})
    pedidoConcluido[1] = ({'uf' : inputUF.value})
    pedidoConcluido[2] = ({'cidade' : inputCidade.value})
    pedidoConcluido[6] = ({'bairro' : bairro.value})

    if (pedido.length == 0) {
        alert("Você não selecionou nenhum café")
        return
    }

    if (inputCep.value.length !== 8) {
        inputCep.focus()
        inputCep.classList.remove("preenchido")
        inputCep.classList.add("vazio")
        return
    }

    if (pedidoConcluido[0].rua == "") {
        inputRua.focus()
        return
    }
    if(pedidoConcluido[6].bairro == "") {
        inputBairro.focus()
        return
    }

    if (pedidoConcluido[1].uf == "" || pedidoConcluido[2].cidade == "") {
        inputCidade.focus()
        return
    }

    let inputNumero = document.querySelector("#numero")
    
    pedidoConcluido[3] = ({'numero' : inputNumero.value})
    
    if (pedidoConcluido[3].numero == "") {
        inputNumero.focus()
        return
    }
    if (pedidoConcluido[4] == null) {
        alert ("Escolha uma forma de pagamento")
        return
    }

    pedido.forEach(p => {
        pedidoConcluido.push(p)
    })

    pedido.splice(0, pedido.length)

    cafesSelecionados.innerHTML = ""
    finalizacao.innerHTML = ""
    form.reset()

    sessionStorage.setItem("pedidoFinal", JSON.stringify(pedidoConcluido))

    pedidoConcluido.splice(0, pedidoConcluido.length)

    paymentForm.forEach(p => {
        if(p.checked == true) {
            p.checked = false
            p.classList.remove("paymentFormChecked")
        }
    })

    allInputs.forEach(input => {
        input.classList.remove('preenchido')
        input.classList.remove('vazio')
    })

    headerCarrinho.src = "fotos/carrinho.png"
    headerCarrinho.classList.remove("headerCarrinho")

    window.location.href = "pedidoConcluido.html"

})

function notificacaoCarrinho() {

    if (pedido.length != 0) {
            headerCarrinho.src = "fotos/carrinhoN pixlrX.png"
            headerCarrinho.classList.add("headerCarrinho")
    } else {
        headerCarrinho.src = "fotos/carrinho.png"
        headerCarrinho.classList.remove("headerCarrinho")
    }

}

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY

    if (scrollY > 1250) {

        if(headerCarrinho.style.opacity < 1) return
        
        let opacityValue = 0.5;
      
        let intervalId = setInterval(fadeOutGradualmente, 100);
      
        function fadeOutGradualmente() {
          if (opacityValue > 0) {
            opacityValue -= 0.1
            headerCarrinho.style.opacity = opacityValue
          } else {
            clearInterval(intervalId)
          }
        }

    } else {
        
        if(headerCarrinho.style.opacity > 0) return
        
        let opacityValue = 0.5

        let intervalId = setInterval(fadeInGradualmente,100)

        function fadeInGradualmente() {
            if (opacityValue < 1) {
                opacityValue += 0.1
                headerCarrinho.style.opacity = opacityValue
            } else {
                clearInterval(intervalId)
            }
        }

    }
    
})