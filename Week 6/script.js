async function fetchFromAPI() {
  const container = document.getElementById("user-list");
  container.innerHTML = "Loading from API...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const users = await response.json();

    displayUsers(users.map(u => ({ name: u.name, email: u.email })));
  } catch (err) {
    container.innerHTML = `<p style="color:red;">❌ Error: ${err.message}</p>`;
  }
}

async function loadFromXML() {
  const container = document.getElementById("user-list");
  container.innerHTML = "Loading from XML...";

  try {
    const response = await fetch("users.xml");

    if (!response.ok) {
      throw new Error(`XML file not found (status: ${response.status})`);
    }

    const xmlText = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");

    const userElements = xmlDoc.getElementsByTagName("user");
    const users = Array.from(userElements).map(user => ({
      name: user.getElementsByTagName("name")[0].textContent,
      email: user.getElementsByTagName("email")[0].textContent
    }));

    displayUsers(users);
  } catch (err) {
    container.innerHTML = `<p style="color:red;">❌ Error: ${err.message}</p>`;
  }
}

function displayUsers(users) {
  const container = document.getElementById("user-list");

  container.innerHTML = "<ul>" +
    users.map(u => `<li><strong>${u.name}</strong> - ${u.email}</li>`).join("") +
    "</ul>";
}
