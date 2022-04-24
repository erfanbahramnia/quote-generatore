// button that generate now quote
const quoteButton = document.querySelector(".new-quote");
// span tag that shows quote
const quote = document.querySelector("#quote")
// span tag that shows author of quote
const author = document.querySelector("#author")

// add event to button so change the quote
quoteButton.addEventListener("click", changeQuote)

// data will save from api
let apiQuotes = [];

// get Quotes from api
async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // chnging quote
        changeQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// On Load
getQuotes();

// changing content
async function changeQuote() {
    // random num as index for selecting random quote from api 
    const randomNum = Math.round(Math.random() * apiQuotes.length);
    // new quote
    const newQuote = await apiQuotes[randomNum];

    // if the author name is blanked change it to unknown
    if (!newQuote.author) {
        newQuote.author = "Unknown"
    }

    // change quote
    quote.innerText = newQuote["text"];
    // change author
    author.innerText = newQuote["author"];
}