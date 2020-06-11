const ufSelect = document
    .querySelector('select[name=uf]')


function fetchAPI(url, object) {
    fetch(url)
        .then(response => response.json())
        .then(items => {
            for (const item of items) {
                object.innerHTML += `<option value="${item.id}">${item.nome}</option>`
            }
        })
}

function populateUFs() {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

    fetchAPI(url, ufSelect)

}

populateUFs()


function getCities(event) {
    // nome dos estados na url
    const stateInput = document
        .querySelector('input[name=state]')

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    // ==================

    const citySelect = document
        .querySelector('select[name=city]')

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ''
    citySelect.disabled = true

    fetchAPI(url, citySelect)

    citySelect.disabled = false
}

ufSelect.addEventListener('change', getCities)




// toggle de item de coleta SELECIONADO
const itemsToCollect = document
    .querySelectorAll('.itens-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

// pegando os dados de cada item selecionado
let selectedItems = []

const collectedItems = document.querySelector('input[name=items]')

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    //verificar se já foi selecionado e pegalos
    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    //se já estiver no selectedItems, tirar
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId)

        selectedItems = filteredItems
    }// se não estiver selecionado, adicionar
    else {
        selectedItems.push(itemId)
    }// pegar os dados e por no input vazio
    collectedItems.value = selectedItems
}