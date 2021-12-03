let menuOpen = undefined || '.menu-list'

if (document.querySelector('#USER_ID')) {
    window.localStorage.setItem('user-id', document.querySelector('#USER_ID').value)
}

let items = document.querySelectorAll('.menu-acc > li')
    if (window.localStorage.getItem('user-id')) {
        items[0].removeAttribute('style')
        items[1].removeAttribute('style')

        document.querySelector('.menu-dash').removeAttribute('blocked')
        document.querySelector('.calendar').removeAttribute('blocked')
        
    } else {
        items[2].removeAttribute('style')
        items[3].removeAttribute('style')
    }

window.addEventListener('click', (event) => {
        if (!document.querySelector(menuOpen).contains(event.target)) verifyForMenu()
})

function newMsg() {
    let val = document.querySelector('.chat-input').value 
    if (!val || val == '') return

    let newMsg = document.createElement('div')
        newMsg.setAttribute('class', 'chat-msg')
        newMsg.innerHTML = val
    document.querySelector('.chat-holder > .chat').append(newMsg)

    document.querySelector('.chat-input').value = ''
}


function openChat(vrf) {
    let chatOptions = JSON.parse(window.localStorage.getItem('actual-chat'))
    if (vrf) {
        document.querySelector('.exit-chat').setAttribute('onclick', 'openChat(false)')
        document.querySelector('.exit-chat').innerHTML = 'X'
        document.querySelector('.chat-holder').removeAttribute('style')

        chatOptions[2] = 'close'
        window.localStorage.setItem('actual-chat', JSON.stringify(chatOptions))
        return
    }

    document.querySelector('.exit-chat').innerHTML = 'O';
    document.querySelector('.exit-chat').setAttribute('onclick', 'openChat(true)')
    document.querySelector('.chat-holder').setAttribute('style', "transform: translateY(80%);")
    
    chatOptions[2] = 'open'
    window.localStorage.setItem('actual-chat', JSON.stringify(chatOptions))
}

document.addEventListener('keyup', (e) => {
    if (e.code == 'Enter' && document.activeElement === document.querySelector('.search-holder-float > input') && document.querySelector('.search-holder-float > input').value != '') {
        redirectQuery(document.querySelector('.search-holder-float > input').value)
    }
})

function redirectQuery(search) {
    if (search != null && search != undefined && search != '') {
        window.location.href = '/search?search=' + search
    }
}

function exitAcc() {
    let vrf = confirm('Tem Certeza Que Deseja Sair?')
    if (!vrf) return

    window.localStorage.removeItem('user-id')
    window.location.href = '/'
}

function openAWindow(el) {
    let mainEl = document.querySelector(el)

    if (mainEl.getAttribute('blocked')) {
        alert('Faça Login Para Usar Essa Função!')
        return
    }

        menuOpen = el

    verifyForMenu(mainEl)

    if (!mainEl.getAttribute('style')) {
        mainEl.setAttribute('style', 'opacity: 0;')
        setTimeout(() => {
            mainEl.setAttribute('style', 'opacity: 0;display:none;')
        }, 250);
        return
    }

    mainEl.setAttribute('style', 'opacity: 0;')
    setTimeout(() => {
        mainEl.removeAttribute('style')
    }, 10);
}

function verifyForMenu(el) {
    let items = document.querySelectorAll('.menu-list')
    for (let i = 0; i < items.length; i++) {
        if (!items[i].getAttribute('style') && items[i] != el) {
            items[i].setAttribute('style', 'opacity: 0;')
            setTimeout(() => {
                items[i].setAttribute('style', 'opacity: 0;display:none;')
            }, 250);
        return
        }
    }
}

var fechar = document.querySelector('div#fechar-chat')
function fecharChat() {
    console.log('funcionou')
    document.querySelector(".chat-holder").style.display = "none"
}
