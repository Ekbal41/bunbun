import Bunbun from "./dist/index.js"

const app = new Bunbun();

app.get("/", (c) => {
    c.sendText("Hello World")
})

app.listen();
console.log("Listening on port 3000")