import express from 'express'
import path from 'path';
import routes from './routes';
import cors from 'cors';
import { errors } from 'celebrate';


const app = express(); // criando a aplicação express

app.use(cors());
app.use(express.json()); // avisando para o express que estamos usando JSON para nosso REST.
app.use(routes); // avisando para o express que estamos usando as rotas.
app.use(errors()); // avisando para o express que estamos usando cas validações do delebrate.

// Servindo os arquivos estáticos da aplicação.
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333, () => {
  console.log('Online');
});