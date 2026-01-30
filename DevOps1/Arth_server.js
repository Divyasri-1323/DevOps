const http = require('node:http');
const url = require('node:url');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;

  const a = Number(query.a);
  const b = Number(query.b);
  const op = query.op;

  let result;

  if (op === 'add') result = a + b;
  else if (op === 'sub') result = a - b;
  else if (op === 'mul') result = a * b;
  else if (op === 'div') result = b !== 0 ? a / b : 'Cannot divide by zero';
  else result = 'Invalid operation';

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Result: ${result}`);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
