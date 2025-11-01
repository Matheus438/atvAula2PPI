import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const host = "0.0.0.0";
const port = 3000;

// permite processar dados de formulários HTML
app.use(express.urlencoded({ extended: true }));

// serve arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// "banco de dados" em memória
let produtos = [];

// rota inicial
app.get("/", (req, res) => {
  res.send(`
    <body">
      <h1>Farmácia - Cadastro de Produtos</h1>
      <p><a href="/form.html">Cadastrar novo produto</a></p>
      <p><a href="/produtos">Listar produtos cadastrados</a></p>
    </body>
  `);
});

// rota para cadastrar
app.post("/cadastrarProduto", (req, res) => {
  const { nome, categoria, preco, fabricante } = req.body;

  if (!nome || !categoria || !preco || !fabricante) {
    return res.send(`
      <body style="text-align:center; color:red;">
        <h1>Preencha todos os campos</h1>
        <a href="/form.html">Voltar</a>
      </body>
    `);
  }

  const produto = {
    id: produtos.length + 1,
    nome,
    categoria,
    preco: parseFloat(preco),
    fabricante
  };

  produtos.push(produto);

  res.send(`
    <body style="font-family:Arial; margin:40px;">
      <h1>Produto cadastrado com sucesso!</h1>
      <table border="1" cellpadding="8" cellspacing="0" style="margin:auto; border-collapse:collapse;">
        <tr><th>Nome</th><td>${produto.nome}</td></tr>
        <tr><th>Categoria</th><td>${produto.categoria}</td></tr>
        <tr><th>Preço</th><td>R$ ${produto.preco.toFixed(2)}</td></tr>
        <tr><th>Fabricante</th><td>${produto.fabricante}</td></tr>
      </table>
      <p style="text-align:center; margin-top:20px;">
        <a href="/form.html">Novo Cadastro</a> |
        <a href="/produtos">Ver Lista de Produtos</a>
      </p>
    </body>
  `);
});

// rota de listagem
app.get("/produtos", (req, res) => {
  if (produtos.length === 0) {
    return res.send(`
      <body style="font-family:Arial; text-align:center; margin:40px;">
        <h1>Nenhum produto cadastrado ainda.</h1>
        <p><a href="/form.html">Cadastrar produto</a></p>
      </body>
    `);
  }

  let tabela = `
    <table border="1" cellpadding="8" cellspacing="0" style="margin:auto; border-collapse:collapse;">
      <tr style="background:#eaeaea;">
        <th>ID</th>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Preço</th>
        <th>Fabricante</th>
      </tr>
  `;

  produtos.forEach(p => {
    tabela += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nome}</td>
        <td>${p.categoria}</td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td>${p.fabricante}</td>
      </tr>
    `;
  });

  tabela += "</table>";

  res.send(`
    <body style="font-family:Arial; margin:40px;">
      <h1>Lista de Produtos Cadastrados</h1>
      ${tabela}
      <p style="text-align:center; margin-top:20px;">
        <a href="/form.html">Cadastrar Novo</a> |
        <a href="/">Página Inicial</a>
      </p>
    </body>
  `);
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
