window.onload = () => {
    fillClass(0)
    fillClass(1)
}

async function fillClass(n) {
    try {
        let response = await fetch('/search/class');
        let data = await response.json();

        data.forEach(elm => document.querySelectorAll('.class-list')[n].innerHTML += `<option onclick="optionSelected('${elm.label}')" name="${elm.label}">${elm.label}</option>`)
 
    } catch (e) {
        return { 'err': e }
    }
}

let registerItems = document.querySelectorAll('option')
for (let i = 0; i < registerItems.length; i++) {
    registerItems[i].addEventListener('click', () => {
        alert(registerItems[i].innerHTML)
    })
}

function optionSelected(cls) {
    let lists = document.querySelectorAll('.class-list')
    alert(cls)

    lists.forEach(l => {
        let items = l.querySelectorAll('option')
            items.forEach(i => {
                i.removeAttribute('style')

                if (i.innerHTML == cls) {
                    i.setAttribute('style', 'display:none')
                }
            })
    })
}

function mySubmitFunction(e) {
    let vals = document.querySelectorAll('.class-list');

    if (vals[0].value == vals[1].value) {
        alert('As matérias não podem ser iguais')
        e.preventDefault();
    }

}