// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Admin } from 'db';
import jwt from 'jsonwebtoken';
import { ensureDbConnected } from '../../lib/dbConnect';

//optional that means token and message can be omitted
type Data = {
  token?: string;
  message?: string;
}

const SECRET = "SECRET";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
        await ensureDbConnected()
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username }); 
       
          if (admin) {
            res.status(403).json({message: "Admin already exists"});
          } else {
            const obj = { username: username, password: password };
            const newAdmin = new Admin(obj);
            newAdmin.save();
    
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Admin created successfully', token });
        }
      
        }








