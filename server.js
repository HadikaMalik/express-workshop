import express from "express";
import formidable from "express-formidable";
import { promises as fs } from "fs";

const app = express();

app.use(express.static("public"));
app.use(formidable());

app.post("/create-post", (req, res) => {

    fs.readFile("./data/posts.json")
        .then(file => {
            const parsedFile = JSON.parse(file.toString());
            parsedFile[Date.now()] = req.fields.blogpost;
            return parsedFile;
        })
        .then((file) => {
            fs.writeFile("./data/posts.json", JSON.stringify(file));
            res.send(file)
        })
})

app.get("/get-posts", (req, res) => {
    res.sendFile("./data/posts.json")
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000. Ready to accept requests!");
}); 