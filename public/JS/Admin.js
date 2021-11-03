window.onload = () => {
    fillUsers()
    fillClass()
}

async function fillUsers() {
    document.querySelector('.teacher-container').innerHTML = ''
    let url = `/search/query/?text=`
    let response = await fetch(url);

    let data = await response.json();

    data.forEach((elm, i) => {
        let newUser = document.createElement('div')

        newUser.innerHTML = `
            <div>
                <div class="img-holder"><img src="${elm['photo']}"></div>
                <a href="/user?user=${elm['_id']}"><h1>${elm.username}</h1></a>
            </div>
            <div>
                <span class="delete-button" onclick="deleteVal('teacher', '${elm['_id']}', '${i}')">X</span>
            </div>
        `            
        
        document.querySelector('.teacher-container').append(newUser)
    });
}

async function fillClass() {
    document.querySelector('.class-container').innerHTML = ''

    let url = `/search/class`
    let response = await fetch(url);

    let data = await response.json();

    data.forEach((elm, i) => {
        let newClass = document.createElement('div')

        newClass.innerHTML = `
            <div>
                <h1>${elm.label}</h1>
            </div>
            <div>
                <span class="delete-button" onclick="deleteVal('class', '${elm['_id']}', '${i}')">X</span>
            </div>
        `            
        
        document.querySelector('.class-container').append(newClass)
    });

    let inputDiv = document.createElement('div')

        inputDiv.innerHTML = `
            <div>
                <input type='text' id='addNewClass' placeholder='Nova Matéra'>
            </div>
            <div>
                <span class="add-button" onclick="addClass(document.querySelector('#addNewClass').value)">+</span>
            </div>
        `            
        
        document.querySelector('.class-container').append(inputDiv)
}

async function deleteVal(type, str, index) {
    let url = `/delete?type=${type}&val=${str}`
    let response = await fetch(url);

    let data = await response.json();

    if (data.success) {
        if (type == 'teacher') {
            fillUsers()
        } else if (type == 'class') {
            fillClass()
        }
    }
}

async function addClass(str) {
    let url = `/add?val=${str}`
    let response = await fetch(url);

    let data = await response.json();

    if (data.success) {
        fillClass()
    }
}