import route from '../../../lib/route';
import { Request, Response } from 'express';


const loginHandler = async (req: Request, res: Response) => {

    return res.json({"data": "Hello World"});
  };


module.exports =  route.get('/auth/login', loginHandler, {isPublic: true});