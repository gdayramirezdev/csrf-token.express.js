import { Request, Response, Router } from "express";

const greet = Router();

greet.get('/hello', (req: Request,res: Response) => {
  res.send({
    message: 'Hello There!'
  }).status(200);
});

export default greet;