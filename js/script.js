const pokemoName = document.querySelector('.pokemon_Name')
const pokemonNuber = document.querySelector('.pokemon_Number')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const imput = document.querySelector('.imputSearch')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  pokemoName.innerHTML = 'carregando...'
  pokemonNuber.innerHTML = ''
  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'
    pokemoName.innerHTML = data.name
    pokemonNuber.innerHTML = data.id
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    imput.value = ''
    searchPokemon = data.id
  } else {
    pokemonImage.style.display = 'none'
    pokemoName.innerHTML = 'não encontrado :c'
    pokemonNuber.innerHTML = ''
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()
  renderPokemon(imput.value.toLowerCase())
})

btnPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})
btnNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})
renderPokemon(searchPokemon)
