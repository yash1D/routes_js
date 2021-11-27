
const fs = require("fs");

const requesthandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>New Massage</title><head>");
    res.write('<body><form action="/message" method="POST"><input type="text" name="message" placeholder ="Your massage"><button type="submit">Send</button></form></body>');
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (Code) => {
      console.log(Code);
      body.push(Code);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody)
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      // res.setHeader("/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Welcome</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requesthandler;

module.exports ={
  handler : requesthandler,
  someText :'Some Text'
};


module.exports.handler = requesthandler;
module.exports.someText = "HELLO WORLD";
