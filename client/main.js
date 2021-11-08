const baseURL = `http://localhost:4000/api/compliment`;
const complimentButton = document.querySelector("#complimentButton");
let complimentsContainer = document.querySelector(".compliments-container");
let quoteInput = document.querySelector(".quote-input");
let form = document.querySelector("form");
let compliments = [];
const errCallback = err => console.log(err);

// functions
let callForCompliments = () => {
  axios
    .get(baseURL)
    .then(res => {
      displayCompliments(res.data);
      compliments = res.data;
    })
    .catch(() => errCallback());
};
callForCompliments();

let deletecompliment = id => {
  axios
    .delete(`${baseURL}/${id}`)
    .then(res => {
      displayCompliments(res.data);
      compliments = res.data;
    })
    .catch(() => errCallback());
};

let postQuote = () => {
  let quoteObj = {
    id: compliments.length + 1,
    quote: quoteInput.value,
    favorite: true
  };

  if (quoteInput.value.length > 0) {
    axios
      .post(baseURL, quoteObj)
      .then(res => {
        displayCompliments(res.data);
        compliments = res.data;
      })
      .catch(() => errCallback());
  }
  quoteInput.value = "";
};

// change quote/compliment to favorite or not favorite
let changeFavorite = id => {
  axios.put(`${baseURL}/${id}`).then(res => {
    displayCompliments(res.data);
    compliments = res.data;
  });
};

// only get back favorite quotes/compliments
let getCompliment = () => {
  let favoriteComplimets = [];
  for (var i = 0; i < compliments.length; i++) {
    if (compliments[i].favorite === true) {
      favoriteComplimets.push(compliments[i]);
    }
  }
  let randomIndex = Math.floor(Math.random() * favoriteComplimets.length);
  if (favoriteComplimets.length > 0) {
    alert(favoriteComplimets[randomIndex].quote);
  }
};

// Display
function createComplimentsCard(comp) {
  const compCard = document.createElement("div");
  compCard.innerHTML = `<div><h1 class="h2">${
    comp.quote
  }</h1> <button onclick="deletecompliment(${
    comp.id
  })">delete</button><button onclick="changeFavorite(${comp.id})">${
    comp.favorite ? "favorite" : "not favorite"
  }</button></div>`;

  complimentsContainer.appendChild(compCard);
}

function displayCompliments(compliments) {
  complimentsContainer.innerHTML = "";
  for (var i = 0; i < compliments.length; i++) {
    createComplimentsCard(compliments[i]);
  }
}

// Controllers

complimentButton.addEventListener("click", getCompliment);
form.addEventListener("submit", function(e) {
  e.preventDefault();
  postQuote();
});
