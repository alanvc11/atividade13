const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs')

const app = express();
const port = 3000;

const livros = [
  { id: 1, titulo: 'Interestelar', autor: 'Christopher Nolan', ano: 2016 },
  { id: 2, titulo: 'A Guerra dos Tronos', autor: 'George R. R. Martin', ano: 1996 },
  { id: 3, titulo: 'Quatro Vidas de um Cachorro', autor: 'W. Bruce Cameron', ano: 1996 },
  { id: 4, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', ano: 1943 },
  { id: 5, titulo: 'Romeu E Julieta', autor: 'William Shakespeare', ano: 1597 }
];

function buscarLivroPorTitulo(titulo) {
  return livros.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
}

function buscarLivroPorAno(ano) {
  return livros.filter(livro => livro.ano === parseInt(ano));
}

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { resultado: {} });
});

app.get('/buscar', (req, res) => {
  const { titulo, ano, tipoBusca } = req.query;
  let resultado = [];

  if (tipoBusca === 'titulo') {
    resultado = buscarLivroPorTitulo(titulo);
  } else if (tipoBusca === 'ano') {
    resultado = buscarLivroPorAno(ano);
  }

  res.render('index', { resultado });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});