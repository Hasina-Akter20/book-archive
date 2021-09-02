// error message
const errorMessage = () =>
  (document.getElementById("error-message").style.display = "block");
const counterOutput = document.getElementById("result-counter");

document.getElementById("error-message").style.display = "none";
const searchBook = () => {
  const searchField = document.getElementById("search-input");
  const searchValue = searchField.value;
  // empty feild
  searchField.value = "";
  document.getElementById("search-result").innerHTML = "";

  document.getElementById("error-message").style.display = "none";
  // error handing
  if (searchValue === "") {
    errorMessage();
    counterOutput.innerText = 0;
  } else {
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => searchBookList(data))
      .catch((error) => displayError(error));
  }
};
// error handing
const displayError = (error) => {
  // show error message
  errorMessage();
  counterOutput.innerText = 0;
};
// disply the reuslt result
const searchBookList = (dataList) => {
  const outputDiv = document.getElementById("search-result");
  //search counter
  const counterNumber = dataList.numFound;
  if (dataList.docs.length === 0) {
    errorMessage();
    // show error message
    counterOutput.innerText = 0;
  } else {
    dataList.docs.forEach((data) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
                    <div class="card h-100">
                        <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h3 class="card-title text-warning">${data.title}</h3>

<p class="card-text"><strong>Author: </strong> ${data.author_name}</p>
                          <p class="card-text"><strong>Publisher: </strong>${data.publisher}</p>
                          <p class="card-text"><strong>First Published: </strong> ${data.first_publish_year}</p>
                        </div>
                      </div>
            `;
      counterOutput.innerText = counterNumber;
      outputDiv.appendChild(div);
    });
  }
};
