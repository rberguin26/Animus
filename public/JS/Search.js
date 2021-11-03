document.querySelector('.search-holder-float').remove()
function autoQuery() {
    let search = new URLSearchParams(window.location.search).get('search') || ''
    document.querySelector('#main-search').value = search
    searchQuery(search)
}

window.onload = () => {
    autoQuery()

    document.addEventListener('keyup', (e) => {
        if (e.code == 'Enter' && document.activeElement === document.querySelector('#main-search')) {
            searchQuery(document.querySelector('#main-search').value)
        }
    })
}

async function searchQuery(search) {
    try {
        if (search == '' || !search) return

        document.querySelector('.loader-holder').removeAttribute('style')
        document.querySelector('.result-holder').setAttribute('style', 'display: none;')
        document.querySelector('.result-holder').innerHTML = ''

        let url = `/search/query/?text=${search}`

        let response = await fetch(url);
        let data = await response.json();

        data.forEach(elm => {
            let newResult = document.createElement('a')
                newResult.classList.add('result')
                newResult.innerHTML = `
                    <div class="img-holder">
                        <img src="${elm.photo}">
                    </div>
                    <div class="result-sub">
                        <h2 class="tittle">${elm.username}</h2>
                        <p>${elm.mainClass}, ${elm.secondClass}</p>
                    </div>
                    <div class="result-options">
                        ${elm.isTeacher ? 'Professor' : 'Aluno'}
                    </div>
                `
                newResult.setAttribute('href', '/user?user=' + elm['_id'])

            document.querySelector('.result-holder').append(newResult)
        })

        if (data.length == 0) {
            let newAlert = document.createElement('div')
                newAlert.setAttribute('class', 'result-alert')
                newAlert.setAttribute('title', 'Clique no línk em vermelho para tentar novamente')
                newAlert.innerHTML = `<span>NÃO FORAM ENCONTRADOS RESULTADOS PARA <a title="Clique Para Tentar Novamente" href="/search?search=${search}">${search}</a></span>`
                
                document.querySelector('.result-holder').append(newAlert)

            document.querySelector('.loader-holder').setAttribute('style', 'display: none;')
            document.querySelector('.result-holder').setAttribute('style', 'width: unset;max-width:unset;')
        } else {
            document.querySelector('.loader-holder').setAttribute('style', 'display: none;')
            document.querySelector('.result-holder').removeAttribute('style')
        }
    } catch (e) {
        return { 'err': e }
    }
}