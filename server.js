const express = require('express')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const compression = require('compression')
const helmet = require('helmet')
const port = process.env.PORT || 8080

const app = express()

// Adiciona segurança básica com Helmet
app.use(helmet())

// Comprime as respostas HTTP
app.use(compression())

// Habilita o middleware que permite SPA funcionar com modo history
// O 'index' define a página para redirecionamento de fallback
app.use(history({
  verbose: true,
  index: '/' // Redireciona para a raiz onde sua SPA é carregada
}))

// Serve arquivos estáticos
app.use(serveStatic('./dist/pwa', {
  setHeaders: (res, path) => {
    // Força todos os arquivos a não serem cacheados pelo navegador
    res.setHeader('Cache-Control', 'no-store')
  }
}))

// Middleware para lidar com erros gerais
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Algo deu errado!')
})

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
