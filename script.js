// quote container
const quoteContainer = document.querySelector("#quote-container")
// button that generate now quote
const quoteBtn = document.querySelector(".new-quote");
// span tag that shows quote
const quote = document.querySelector("#quote");
// span tag that shows author of quote
const author = document.querySelector("#author");
// twitter button
const twitterBtn = document.querySelector("#twitter");
// loader div
const loader = document.querySelector("#loader");


// add event to button so change the quote
quoteBtn.addEventListener("click", changeQuote);
// open twitter if user wanna share the quote
twitterBtn.addEventListener("click", tweetQuote)


// data will save from api
let apiQuotes = [];


// show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


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

// tweet quote
function tweetQuote() {
    const twitterURl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterURl, "_blank");
}


// changing content
function changeQuote() {
    // loading because the data doesn't aplied yet
    loading();

    // random num as index for selecting random quote from api 
    const randomNum = Math.round(Math.random() * apiQuotes.length);
    // new quote
    const newQuote = apiQuotes[randomNum];

    // if the author name is blanked change it to unknown
    if (!newQuote.author) {
        newQuote.author = "Unknown"
    }

    // check quote length to determine the style
    if (newQuote.text.length > 100) {
        quote.classList.add("long-quote");
    } else {
        quote.classList.remove("long-quote");
    }


    // show quote, hide loader
    // change quote
    quote.innerText = newQuote["text"];
    // change author
    author.innerText = newQuote["author"];
    complete();
}

// On Load
getQuotes();
// loading();
