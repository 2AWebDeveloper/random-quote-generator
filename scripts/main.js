"use strict";

// DOM Element Selection
const quote = document.querySelector(".quote");
const quoteContent = document.querySelector(".quote-content");
const quoteGenerateBtn = document.querySelector(".quote-generate");
const loader = document.querySelector(".loader");

// Variables
const errorElement = `
    <div class="error">
    <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
            <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
        </svg>
    </div>
    <h3 class="error-title">Failed to fetch</h3>
    <p class="error-message">There is a problem receiving the information, please try again later...</p>
    </div>
`;
let quoteElement = null;

// Functions
const getQuote = async function() {
    try {
        loader.classList.remove("active");
        quoteGenerateBtn.setAttribute("disabled", true);
        quote.classList.add("active");

        const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: {
                'X-Api-Key': 'rLKyBu4GL01KhD2RlDYWBg==MPFrj88aEBoeuDaP'
            },
            contentType: 'application/json',
        });

        if (response.ok) {
            const [data] = await response.json();
            generateQuote(data);
        }
    } catch (error) {
        quote.innerHTML = errorElement;
    } finally {
        loader.classList.add("active");
        quoteGenerateBtn.removeAttribute("disabled");
        quote.classList.remove("active");
    }
};

const generateQuote = function(quote) {
    quoteElement = `
        <p class="quote-text">${quote.quote}</p>
        <h3 class="quote-author">${quote.author}</h3>
        <span class="quote-date">${quote.category}</span>
    `;
    quoteContent.innerHTML = quoteElement;
};


// Generate Button Handler
quoteGenerateBtn.addEventListener("click", getQuote);

// Window Load handler
window.addEventListener("load", getQuote);
