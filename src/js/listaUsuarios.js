fetch('https://reqres.in/api/users?page=1', {
    method: 'GET',
    headers : {
        'content-type': 'aplication/json;charset=utf-8'
    }
})    
  .then(response => {
     const contentType = response.headers.get('content-type');
     if (!contentType || !contentType.includes('application/json')) {
       throw new TypeError("Oops, we haven't got JSON!");
     } 
     return response.json();
     
  })
  .then(data => {    
    let users = data.data;    
    let showing = data.per_page;
    let total = data.total;
    let displayInfoString = 'Mostrando ' + showing + ' de ' + total + '';
    let userCard = '';        
    for (let i = 0; i < users.length; i++) {
    userCard +=
        '<div class="user__item user">' +
        '<img class="user__img" src=' +
        users[i].avatar +
        '>' +
        '<p class="user__name">' +
        users[i].first_name +
        ' ' +
        users[i].last_name +
        '</p>' +
        '<p class="user__email">' +
        users[i].email +
        '</p>' +
        '<img class="user__edit-icon" src="./assets/icon-edit.svg">' +
        '</div>';
    }
    const container = document.querySelector('#list__container');
    container.insertAdjacentHTML('beforeend', userCard);
    const displayInfo = document.querySelector('#list__info');
    displayInfo.insertAdjacentHTML('beforeend', displayInfoString);    
  })
  .catch(error => console.error(error))