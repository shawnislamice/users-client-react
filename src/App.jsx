import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      });
  };

  return (
    <div>
      <h1>User Management</h1>
      <h3>Number of user: {users.length}</h3>
      <form action="" onSubmit={handleForm}>
        <input type="text" placeholder="name" name="name" /> <br />
        <input type="email" placeholder="email" name="email" /> <br />
        <input type="submit" value="Add User" /> <br />
      </form>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id} {user.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;

/**
 * Steps
 *
 * 1. Create a post API obn the server side
 * 2. Send data from client side via post
 * 3. Set fetch method options
 * 4. Set body
 * 5. Set in the server side express middleware
 *
 */
