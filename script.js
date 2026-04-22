app.post("/register", (req, res) => {
    const fs = require("fs");

    let users = [];

    if (fs.existsSync("users.json")) {
        users = JSON.parse(fs.readFileSync("users.json", "utf8"));
    }

    users.push(req.body);

    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json(req.body);
});