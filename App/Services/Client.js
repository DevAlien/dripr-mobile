'use strict';

const URL = 'https://api.dripr.io';
// const URL = 'http://localhost:3099';
class Client {
  constructor(token) {
    if (token) {
      this.token = token;
    }
  }
  
  setToken(token) {
    this.token = token;
  }
  
  postFile(file) {
    let xhr = new XMLHttpRequest();
    let headers = {};
    let path = this.token ? '/upload' : '/upload/anon';

    xhr.open('POST', URL + path)
        if (this.token) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
    }
    console.log('assssddd', file)
    var photo = {
      uri: file.path,
      type: file.mime,
      name: 'photo.jpg',
    };

    let formData = new FormData();
    formData.append('file', photo);
    formData.append('name', 'testName');
     console.log('dio cane', formData);
    console.log('dio madonan', formData.getParts())
    
    return  new Promise((res) => {
      xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        res(JSON.parse(xhr.responseText));
    }
}
    //api.post('/upload/anon', formData).then((res) => console.log(res))
    xhr.send(formData);
      
    });
    return this.request(path, 'POST', data);
  }
  
  request(path, method, data) {
    let options = {
      method: method || 'GET',
      headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'content-disposition':
'form-data; name="file"; filename="photo.jpg"',
"content-type":"image/jpeg"
      }
    };
    if (this.token) {
      options.headers.Authorization = 'Bearer ' + this.token;
    }
    if (data) {
      options.body = JSON.stringify(data);
    }
    return fetch(URL + path, options).then((response) => response.text()).then((responseText) => {
      return new Promise((res, rej) => {
        res(JSON.parse(responseText));
      })
    });
  }
}

export default Client;
