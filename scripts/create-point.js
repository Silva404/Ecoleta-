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
const itemsToCollect = document.querySelectorAll('.itens-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

function handleSelectedItem(event) {
    const itemId = event.target.dataset.id
    itemId.classList.add('selected')
}