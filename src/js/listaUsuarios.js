sessionStorage.getItem('token', token) ? '' : (window.location.href = '/');

async function userList() {

    await fetch('https://reqres.in/api/users?page=1', {
        method: 'GET',
        headers : {
            'content-type': 'aplication/json;charset=utf-8'
        }
    })
    .then((response) => response.json())
    console.log(response.data)
    .then((data) => {
        let users = data.data;
        let showing = data.per_page;
        let total = data.total;
        let displayInfoString = 'Mostrando ' + showing + ' de ' + total + '';
        let userCard = '';        
        for (let i = 0; i < users.length; i++) {
        userCard +=
            '<div class="user-item">' +
            '<img class="user-img" src=' +
            users[i].avatar +
            '>' +
            '<p class="user-name">' +
            users[i].first_name +
            ' ' +
            users[i].last_name +
            '</p>' +
            '<p class="user-email">' +
            users[i].email +
            '</p>' +
            '<img class="edit-icon" src="../assets/img/icon-edit.svg">' +
            '</div>';
        }
        const container = document.querySelector('#list-container');
        container.insertAdjacentHTML('beforeend', userCard);
        const displayInfo = document.querySelector('#list-info');
        displayInfo.insertAdjacentHTML('beforeend', displayInfoString);
    })
    .catch((err) => console.error(err));
    
};