const http = require('node:http');
const url = require('node:url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // If home page, show form
  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>Arithmetic Operations</h2>
      <form method="GET" action="/calculate">
        Number 1: <input type="number" name="a" required><br><br>
        Number 2: <input type="number" name="b" required><br><br>

        Operation:
        <select name="op">
          <option value="add">Addition</option>
          <option value="sub">Subtraction</option>
          <option value="mul">Multiplication</option>
          <option value="div">Division</option>
        </select><br><br>

        <button type="submit">Calculate</button>
      </form>
    `);
  }

  // Calculation logic
  else if (parsedUrl.pathname === '/calculate') {
    const a = Number(query.a);
    const b = Number(query.b);
    const op = query.op;

    let result;

    if (isNaN(a) || isNaN(b)) {
      result = 'Invalid input';
    } else {
      switch (op) {
        case 'add': result = a + b; break;
        case 'sub': result = a - b; break;
        case 'mul': result = a * b; break;
        case 'div': result = b !== 0 ? a / b : 'Cannot divide by zero'; break;
        default: result = 'Invalid operation';
      }
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h2>Result</h2>
      <p>${a} ${op} ${b} = <b>${result}</b></p>
      <a href="/">Go Back</a>
    `);
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
