import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const host = "0.0.0.0";
const port = 3000;

// permite processar formulários HTML
app.use(express.urlencoded({ extended: true }));

// servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// rota inicio
app.get("/", (req, res) => {
  res.send(`
    <body style="font-family:Arial; text-align:center; margin:40px;">
      <h1>Farmácia - Cadastro de Produto</h1>
      <p>Acesse o formulário em <a href="/form.html">/form.html</a></p>
    </body>
  `);
});

// rota do formulario
app.post("/cadastrarProduto", (req, res) => {
  const { nome, categoria, preco, fabricante } = req.body;

  // validação
  if (!nome || !categoria || !preco || !fabricante) {
    return res.send(`
      <body style="font-family:Arial; text-align:center; color:red;">
        <h1>Campos obrigatórios não preenchidos</h1>
        <p>Volte e preencha todos os campos do formulário.</p>
        <a href="/form.html">Voltar</a>
      </body>
    `);
  }

  // exibe o cadastrados
  res.send(`
    <body style="font-family:Arial; margin:40px;">
      <h1>Produto Cadastrado com Sucesso</h1>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; margin:auto;">
        <tr><th>Nome</th><td>${nome}</td></tr>
        <tr><th>Categoria</th><td>${categoria}</td></tr>
        <tr><th>Preço</th><td>R$ ${parseFloat(preco).toFixed(2)}</td></tr>
        <tr><th>Fabricante</th><td>${fabricante}</td></tr>
      </table>
      <p style="text-align:center; margin-top:20px;">
        <a href="/form.html">⬅Novo Cadastro</a>
      </p>
    </body>
  `);
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
