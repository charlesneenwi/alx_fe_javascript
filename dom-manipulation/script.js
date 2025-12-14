/* STEP 0: Dynamic Quote Generator */

// Initial quotes
let quotes = [
    { text: "Talk is cheap. Show me the code.", category: "Programming" },
    { text: "Stay hungry, stay foolish.", category: "Motivation" },
    { text: "First, solve the problem. Then, write the code.", category: "Programming" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  /* STEP 1: Local Storage Handling */
  
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      // Keep only valid objects
      const parsed = JSON.parse(storedQuotes);
      quotes = parsed.filter(q => q.text && q.category);
    }
  }
  
  // Load stored quotes first
  loadQuotes();
  
  /* STEP 0: Show Random Quote */
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;
  
    // Save last viewed quote (session storage)
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  }
  
  // Button event listener
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  /* STEP 0: Dynamic Add Quote Form */
  
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
        saveQuotes();
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
  
  // Create dynamic form once
  createAddQuoteForm();
  
  /* STEP 0: Static HTML Add Quote */
  
  function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      alert("Quote added!");
    } else {
      alert("Both fields are required!");
    }
  }
  
  /* STEP 1: Export Quotes (JSON) */
  
  function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json"
    });
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  /* STEP 1: Import Quotes (JSON) */
  
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
  
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      // Keep only valid objects
      const valid = importedQuotes.filter(q => q.text && q.category);
      quotes.push(...valid);
      saveQuotes();
      alert("Quotes imported successfully!");
    };
  
    fileReader.readAsText(event.target.files[0]);
  }
  