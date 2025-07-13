# Backend
Great question! Understanding how a PATCH request works is essential for building RESTful applications.

🧩 What is a PATCH Request?
A PATCH request is an HTTP method used to partially update a resource on the server.

Unlike PUT, which replaces the entire resource, PATCH only updates specific fields.

Commonly used when editing a user profile, updating settings, or changing one or two fields of a database record.

🧱 Example Flow of a PATCH Request in a Web App
Let’s go through the flow with your app example (editing a user profile):

🔁 1. Client (Browser) Sends Form via POST + Method Override
HTML forms do not support PATCH or PUT directly.

So we use this trick:

html
Copy code
<form method="POST" action="/user/123?_method=PATCH">
  <input name="username" value="newname">
  <input name="email" value="newemail@example.com">
  <button type="submit">Update</button>
</form>
The ?_method=PATCH part tells Express (with the help of method-override) to treat the POST as a PATCH.

🧠 2. Express Uses Method Override Middleware
You have this in your code:

js
Copy code
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
This allows Express to detect _method=PATCH in the query string and convert the POST into a PATCH request internally.

📥 3. Express Handles the PATCH Route
Your route looks like this:

js
Copy code
app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    const updateQuery = "UPDATE profile SET username = ?, email = ? WHERE id = ?";
    connection.query(updateQuery, [username, email, id], (err, result) => {
        if (err) return res.send("Error updating user.");
        res.redirect("/allusers");
    });
});
Here's what happens:

id comes from the URL (e.g., /user/123)

username and email come from the form body

The SQL query updates only those fields (not the whole record)

⚡ Final Result:
You visit /user/123/edit

Submit the form

The server processes the PATCH request

Database gets updated (e.g., new username & email)

You get redirected to the user list

✅ Benefits of PATCH:
Efficient: Only updates what's needed

Standardized: Follows REST conventions

Flexible: Allows partial updates