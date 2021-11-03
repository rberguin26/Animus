window.addEventListener('load', function(){
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: '.dots',
        rewind: true,
        scrollLockDelay: 150,
        resizeLock: true,
        scrollLock: true,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    }) 
});

(async () => {
    try {
        console.log('teste')
        let data = await dataRequest()
        console.log(data)

        data.forEach(elm => {
            let newResult = document.createElement('a')
                newResult.classList.add('teacher')
                newResult.innerHTML = `
                      <img src="${elm.photo}">
                      <div class="teacher-sub">
                        <h2 class="tittle">${elm.username}</h2>
                        <p>${elm.secondClass}, focado em ${elm.mainClass}</p>
                      </div>
                    `

                newResult.setAttribute('href', '/user?user=' + elm['_id'])

            document.querySelector('.teacher-holder').append(newResult)
        })
    } catch (err) {
        console.log(err)
        throw err
    }
})()



/*Getting Data From Request*/
async function dataRequest() {
    let dados = await fetch('/list?limit=4');
    return dados.json()
}