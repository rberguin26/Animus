(async () => {
    try {
        let param = window.localStorage.getItem('user-id') || ''

        if (document.querySelector('#USER_ID')) {
            param = document.querySelector('#USER_ID').value;
            document.querySelector('.chat-button-holder').remove()
        }

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('user');

        param = myParam ? myParam : param

        if (window.localStorage.getItem('user-id')) {
            if (window.localStorage.getItem('user-id') == param && !document.querySelector('#USER_ID')) {
                document.querySelector('.chat-button-holder').remove()
            }
        }

        let data = await dataRequest(param)
            
        document.querySelector('.professional-holder').innerHTML = data.isTeacher ? 'Professor' : 'Estudante'
        document.querySelector('.img-holder > img').setAttribute('src', data.photo)

        document.querySelector('.info-holder .name').innerHTML = data.username

        document.querySelector('.info-holder .email').innerHTML = data.email
        document.querySelector('.info-holder .email').setAttribute('href', 'mailto:'+data.email)
        document.querySelector('.info-holder .cell').innerHTML = data.cell
        document.querySelector('.info-holder .cell').setAttribute('href', 'https://api.whatsapp.com/send?phone=55'+data.cell)
        
        document.querySelector('.user-holder > nav').setAttribute('style', "opacity: 0;")
        document.querySelector('.loader-holder').remove()
        document.querySelector('.user-holder > nav').removeAttribute('style')
        document.querySelector('.class-user').innerHTML = `${data.mainClass}, ${data.secondClass}`
    } catch (err) {
        console.log(err)
        throw err
    }
})()

/*Getting Data From Request*/
async function dataRequest(param) {
    let dados = await fetch(`/userinfo?id=${param}`);
    return dados.json()
}

function createChat() {
    let options = [ document.querySelector('.img-holder > img').getAttribute('src'), document.querySelector('.info-holder .name').innerHTML, 'open']
    window.localStorage.setItem('actual-chat', JSON.stringify(options))
    verifyForChat()
}