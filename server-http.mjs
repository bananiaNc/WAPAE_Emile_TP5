import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
    response.setHeader("Content-Type", "text/html");
    try {
        const contents = await fs.readFile("index.html", "utf8");
        const url_split = request.url.split(":");
        let nb = parseInt(url_split[1], 10);
        if (!isNaN(nb)) {
            let chaine = ``;
            for (let i = 0; i < nb; i++) {
                chaine += `<p>${Math.floor(100 * Math.random())}</p>`
            }
            response.writeHead(200);
            return response.end(`<html>${chaine}</html>`);
        }
        switch (request.url) {
            case "/":
            case "/index.html":
                response.writeHead(200);
                return response.end(contents);
            case "/random.html":
                response.writeHead(200);
                return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
            default:
                response.writeHead(404);
                return response.end(`<html><p>404: NOT FOUND</p></html>`);
        }
    } catch (error) {
        console.error(error);
        response.writeHead(500);
        return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
}

console.log("NODE_ENV =", process.env.NODE_ENV);

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});