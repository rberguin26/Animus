window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('chose');
    fillTeacher(myParam)
}


async function fillTeacher(cls) {
    let url = `/teacher/class?class=${cls}`
    let response = await fetch(url);

    document.querySelector('.title-div > h1').innerHTML = cls   
    
    let data = await response.json()
    
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

        document.querySelector('.teachers-container').append(newResult)
    })

    console.log(data)
}