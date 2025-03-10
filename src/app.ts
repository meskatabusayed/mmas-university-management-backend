import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//perser
app.use(express.json());
app.use(cors());

//application route;
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from  MMAS -- U!');
});

//not found route
app.use(notFound);

//global error handler
app.use(globalErrorHandler);

export default app;
