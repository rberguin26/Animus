window.onload = () => {
    fillClass()
}

async function fillClass() {
    try {
        let response = await fetch('/search/class');
        let data = await response.json();

        document.querySelector('.class-container').setAttribute('style', `grid-template-columns: repeat(${Math.ceil(data.length/2)}, 1fr);`)

        data.forEach(elm => document.querySelector('.class-container').innerHTML += `<a class="class" style="opacity: 0" href="/class/teachers?chose=${elm.label}"><h2>${elm.label}</h2></a>`)

        let classToShow = document.querySelectorAll('.class-container > .class')
        for (let i = 0; i < classToShow.length; i++) setTimeout(()=>{ classToShow[i].removeAttribute('style') }, i*150)
 
    } catch (e) {
        return { 'err': e }
    }
}