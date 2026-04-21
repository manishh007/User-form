const form = document.getElementById("form");
const output = document.getElementById("output");

// Load users in table
async function loadUsers() {
    try {
        const res = await fetch("http://localhost:3000/api/users");
        const users = await res.json();

        if (users.length === 0) {
            output.innerHTML = ""; // no table if no data
            return;
        }

        // reverse for latest on top
        const reversed = [...users].reverse();

        output.innerHTML = `
            <table class="user-table">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    ${reversed.map((user, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>New</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } catch (err) {
        console.error(err);
    }
}

// Submit form
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
        await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email })
        });

        form.reset();
        loadUsers(); // refresh table
    } catch (error) {
        console.error(error);
    }
});

// Initial load
loadUsers();