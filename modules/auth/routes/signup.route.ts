import route from '../../../lib/route';
import { Request, Response } from 'express';


const signUpHandler = async (req: Request, res: Response) => {

    return res.json({"data": "Hello World"});
  };


module.exports =  route.get('/auth/signup', signUpHandler, {isPublic: true});