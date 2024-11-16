document.addEventListener("DOMContentLoaded", () => {
  const itemInput = document.getElementById("itemInput");
  const addButton = document.getElementById("addButton");
  const itemList = document.getElementById("itemList");

  let items = JSON.parse(localStorage.getItem("items")) || [];

  // Function to render items in the table
  const renderItems = () => {
    itemList.innerHTML = "";
    items.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item}</td>
        <td class="actions">
          <button onclick="editItem(${index})">Edit</button>
          <button class="delete" onclick="deleteItem(${index})">Delete</button>
        </td>
      `;
      itemList.appendChild(row);
    });
  };

  // Add item
  const addItem = () => {
    const item = itemInput.value.trim();
    if (item) {
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
      itemInput.value = "";
      renderItems();
    }
  };

  // Edit item
  window.editItem = (index) => {
    const newItem = prompt("Edit Item:", items[index]);
    if (newItem) {
      items[index] = newItem;
      localStorage.setItem("items", JSON.stringify(items));
      renderItems();
    }
  };

  // Delete item
  window.deleteItem = (index) => {
    if (confirm("Are you sure you want to delete this item?")) {
      items.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(items));
      renderItems();
    }
  };

  addButton.addEventListener("click", addItem);

  // Initial render
  renderItems();
});
