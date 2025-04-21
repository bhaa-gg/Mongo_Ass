import { config } from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { ErrorApp, errorHandler } from './src/utils';
import { AuthRoutes, CategoryRoutes, ProductRoutes, UserRoutes } from './src/module';
import cors from 'cors';
import { dbConnection } from './Db/dbConnection';
import { FindEmailExist } from './src/middleware';
import { errorCatcher, validationMiddleware } from './src/middleware';
import { loginSchema, registerSchema } from './src/module/auth/auth.schema';
import User from './Db/Models/user';
import { register, login } from './src/module/auth/auth.controller';

// Load environment variables in development
  config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Initialize database connection
dbConnection().catch((err) => console.error('DB connection failed:', err));

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());


app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    res.json({ message: 'Hello World!s' });
});
app.get('/data', (req: Request, res: Response, next: NextFunction): void => {
    res.json({ message: 'Hello Data' });
});

// Auth routes
app.post('/auth/register', 
  errorCatcher(validationMiddleware(registerSchema)),
  errorCatcher(FindEmailExist(User)),
  errorCatcher(register)
);
app.post('/auth/login',
  errorCatcher(validationMiddleware(loginSchema)),
  errorCatcher(login)
);

// Module routes
app.use('/user', UserRoutes);
app.use('/category', CategoryRoutes);
app.use('/product', ProductRoutes);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => 
  next(new ErrorApp('Page not found', 404))
);

// Error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));