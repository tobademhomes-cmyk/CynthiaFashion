document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("fashion-grid");

  // Helper function to clean and fix image paths
  function fixImagePath(path) {
    if (!path) return "./placeholder.jpg"; // Default fallback if image is missing
    
    // Remove any leading slash (e.g., "/uploads/wk.png" -> "uploads/wk.png")
    let clean = path.replace(/^\//, "");
    
    // Ensure it starts with "./" for static relative loading
    if (!clean.startsWith("./") && !clean.startsWith("http")) {
      clean = "./" + clean;
    }
    
    return clean;
  }

  try {
    const response = await fetch("./products.json");
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      grid.innerHTML = "<p>No clothing items in the catalog yet.</p>";
      return;
    }

    grid.innerHTML = data.items
      .map(
        (item) => `
      <div class="card">
        <img src="${fixImagePath(item.image)}" alt="${item.title}" />
        <div class="card-details">
          <span class="badge">${item.category || "General"}</span>
          <h3>${item.title}</h3>
          <p class="price">${item.price}</p>
          <p class="description">${item.description}</p>
        </div>
      </div>
    `,
      )
      .join("");
  } catch (error) {
    console.error("Error loading clothing catalog:", error);
    grid.innerHTML = "<p>Unable to load products right now.</p>";
  }
});
