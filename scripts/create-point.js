function populateUFs() {
    const ufSelect = document
        .querySelector('select[name=uf]')


    // o fetch pega a API, e o primeiro .then que usa o .json, trasnforma em JSON e depois manipulamos cada dado adicionando um por um no HTML com um for e o innerHTML de uma objeto.
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => response.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
            }
        })
}

// Vai carregar os estados ao iniciar o site
populateUFs()


function getCities(event) {
    // constante para achar o objeto OPTION com a tag CITY
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')


    // pegando o nome do estado para colocar na URL pelo o INDEX de cada evento que for selecionado, na aba de estados
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    // const para pegar cada valor do estado selecionado, que são as IDs de cada objeto, assim pegando apenas as cidades dos seus estados
    const ufValue = event.target.value


    // usando o ${} podemos usar apenas a ID de cada estado para sua cidade, um valor dinâmico
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    //reescrever e limpar o conteudo interno das options city
    citySelect.innerHTML = ''
    citySelect.disabled = true;


    fetch(url)
        .then(response => response.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
            }
        })


    // propriedade para procurar a função disable do "input" de cidades e retira-lo para voltar a aparecer
    citySelect.disabled = false;
}


// Para executar a função de aparecer as cidades após mudar ou escolher um estado.
const stateElement = document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


// adicionar classe de selecionada, nos itens de coleta
// selecionando todos os LI da classe grid para usar cada um no meu loop
const itemsToCollect = document.querySelectorAll('.itens-grid li')

// add ouvinte em cada item com seu click e add uma função.
for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle('selected')

    //adicionando valores em cada objeto para pegalos no backend e poder usalos
    const itemId = itemLi.dataset.id


    
    // verificar se existem items selecionados, se sim,  pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemIndex = item == itemId
        return itemIndex
    })

    // se já estiver selecionado, tirar da seleção
    // tipo um toggle só que com o valor
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemFound = item != itemId
            return itemFound
        })

        selectedItems = filteredItems
    }
    // se não tiver selecionado, adicionar a seleção
    else {
        selectedItems.push(itemId)
    }

    console.log(selectedItems)



    // atualizar o campo escondido com os dados selecionados 
}