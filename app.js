document.getElementById('error-message').style.display = 'none';
const searchBook=()=>{
    const searchField=document.getElementById('search-input');
    const searchValue=searchField.value;
    // empty feild 
    searchField.value='';
    document.getElementById('search-result').innerHTML='';
    
    document.getElementById('error-message').style.display = 'none';
    // error handing 
    if (searchValue===''){
        document.getElementById('error-message').style.display = 'block';
    }
    else{
        const url=`https://openlibrary.org/search.json?q=${searchValue}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>searchBookList(data.docs)) 
        .catch(error => displayError(error));

    }
    
}
// error handing 
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
// show output 
const searchBookList=(dataList)=>{
    const outputDiv= document.getElementById('search-result');
    if(dataList.length===0){
        document.getElementById('error-message').style.display = 'block';
    }
    dataList.forEach(data =>{
    const div=document.createElement('div');
    div.classList.add('col');
    div.innerHTML=`
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${data.cover_i}.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${data.title}</h5>
                  <p class="card-text">Author: ${data.author_name}</p>
                  <p class="card-text">First Published:  ${data.first_publish_year}</p>
                </div>
              </div>
    `
    outputDiv.appendChild(div);
   })
}

