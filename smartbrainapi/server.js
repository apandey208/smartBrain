import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//creating variable database for user

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@facebook.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },

    {
      id: "124",
      name: "Sally",
      email: "sally@facebook.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send("this is working");
});
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Success");
  } else {
    res.status(400).json("error logging in");
  }
});

//Register
app.post("/register", (res, req) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1]);
})


//Profile
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
        found = true;
      return res.json(user);
    }
  })
  if (!found) {
      res.status(400).json('not found');
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
        found = true;
        user.entries++
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('not found');
}
})


app.listen(3000, () => {
  console.log("app is running on port 3000 ");
});

