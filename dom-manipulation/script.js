// Quotes array (each quote is an object)
let quotes = [
    { text: "Talk is cheap. Show me the code.", category: "Programming" },
    { text: "Stay hungry, stay foolish.", category: "Motivation" },
    { text: "First, solve the problem. Then, write the code.", category: "Programming" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  }
  
  // Add event listener to button
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  // Create Add Quote Form dynamically (advanced DOM)
  function createAddQuoteForm() {
    const formDiv = document.createElement("div");
  
    const textInput = document.createElement("input");
    textInput.placeholder = "Enter a new quote";
    textInput.id = "dynamicQuoteText";
  
    const categoryInput = document.createElement("input");
    categoryInput.placeholder = "Enter quote category";
    categoryInput.id = "dynamicQuoteCategory";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
  
    addButton.addEventListener("click", function () {
      const text = textInput.value.trim();
      const category = categoryInput.value.trim();
  
      if (text && category) {
        quotes.push({ text, category });
        alert("Quote added successfully!");
        textInput.value = "";
        categoryInput.value = "";
      } else {
        alert("Please fill in both fields.");
      }
    });
  
    formDiv.appendChild(textInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);
  
    document.body.appendChild(formDiv);
  }
  
  // Call it once
  createAddQuoteForm();
  
  // Add quote from static HTML form
  function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      alert("Quote added!");
    } else {
      alert("Both fields are required!");
    }
  }
  