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
  
  /* STEP 1: Web Storage */
  
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes).filter(q => q.text && q.category);
    }
  }
  
  loadQuotes();
  
  /* STEP 2: Display Quotes */
  
  function displayQuotes(quotesToDisplay) {
    quoteDisplay.innerHTML = "";
  
    if (quotesToDisplay.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes found.</p>";
      return;
    }
  
    quotesToDisplay.forEach(q => {
      const p = document.createElement("p");
      p.innerHTML = `"${q.text}" <br><small>Category: ${q.category}</small>`;
      quoteDisplay.appendChild(p);
    });
  }
  
  /* STEP 0: Random Quote */
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    displayQuotes([quote]);
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  }
  
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  /* STEP 2: Category Filtering */
  
  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  
    const categories = [...new Set(quotes.map(q => q.category))];
  
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  
    const savedFilter = localStorage.getItem("selectedCategory");
    if (savedFilter) {
      categoryFilter.value = savedFilter;
      filterQuotes();
    }
  }
  
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);
  
    if (selectedCategory === "all") {
      displayQuotes(quotes);
    } else {
      displayQuotes(quotes.filter(q => q.category === selectedCategory));
    }
  }
  
  /* STEP 0: Dynamic Add Quote Form */
  
  function createAddQuoteForm() {
    const formDiv = document.createElement("div");
  
    const textInput = document.createElement("input");
    textInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.placeholder = "Enter quote category";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
  
    addButton.addEventListener("click", () => {
      const text = textInput.value.trim();
      const category = categoryInput.value.trim();
  
      if (text && category) {
        quotes.push({ text, category });
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quote added!");
        textInput.value = "";
        categoryInput.value = "";
      }
    });
  
    formDiv.append(textInput, categoryInput, addButton);
    document.body.appendChild(formDiv);
  }
  
  createAddQuoteForm();
  
  /* STEP 0: Static Add Quote */
  
  function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert("Quote added!");
    }
  }
  
  /* STEP 1: Export */
  
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
  
  /* STEP 1: Import */
  
  function importFromJsonFile(event) {
    const reader = new FileReader();
    reader.onload = e => {
      const imported = JSON.parse(e.target.result).filter(q => q.text && q.category);
      quotes.push(...imported);
      saveQuotes();
      populateCategories();
      filterQuotes();
    };
    reader.readAsText(event.target.files[0]);
  }
  
  // Initialize UI
  populateCategories();
  filterQuotes();

  const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

/* STEP 3: Fetch quotes from server (ALX-required name) */
async function fetchQuotesFromServer() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();

  // Convert posts to quotes format
  return data.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));
}

/* STEP 3: Sync and resolve conflicts */
async function syncWithServer() {
  const status = document.getElementById("syncStatus");
  status.textContent = "Syncing with server...";

  try {
    const serverQuotes = await fetchQuotesFromServer();

    // Conflict resolution: server takes precedence
    quotes = serverQuotes;

    saveQuotes();
    populateCategories();
    filterQuotes();

    status.textContent = "✅ Synced successfully. Server data applied.";
  } catch (error) {
    status.textContent = "❌ Sync failed. Please try again.";
    console.error(error);
  }
}

/* Manual sync option */
function manualSync() {
  syncWithServer();
}

/* Auto-sync every 30 seconds */
setInterval(syncWithServer, 30000);
