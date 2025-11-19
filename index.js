require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "TechSavvyNerd",
        content: "How I learned JavaScript in 30 days — my full roadmap!"
    },
    {
        id: uuidv4(),
        username: "CuriousMind101",
        content: "Why do people say consistency beats talent? Here's my experience."
    },
    {
        id: uuidv4(),
        username: "RandomCoderGirl",
        content: "Just built my first MERN project today! Feeling proud :)"
    },
    {
        id: uuidv4(),
        username: "WandererSoul",
        content: "Traveling solo taught me more than any book ever could."
    },
    {
        id: uuidv4(),
        username: "DailyDoseOfLogic",
        content: "Here’s the trick I used to finally understand recursion."
    },
    {
        id: uuidv4(),
        username: "Mindful_Student",
        content: "The secret to staying productive? 15-minute deep focus bursts."
    },
    {
        id: uuidv4(),
        username: "ByteByByte",
        content: "Cracked my first DSA problem without hints today!"
    },
    {
        id: uuidv4(),
        username: "TheQuietThinker",
        content: "Not everything needs an opinion. Sometimes silence is power."
    }
];

//Index route
app.get("/post", (req, res) => {
    res.render("index.ejs", {posts});
});

//New route
app.get("/post/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/post", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/post");
});

// Show route
app.get("/post/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

// Update route
app.patch("/post/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    post.content = req.body.content;
    res.redirect("/post");
});

// Edit route
app.get("/post/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

// Distory route
app.delete("/post/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/post");
});

app.listen(port, (req, res) => {
    console.log(`Listen on port ${port}`);
});