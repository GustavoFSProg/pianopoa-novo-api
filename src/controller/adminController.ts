import { Request, Response } from 'express'
import adminModel from '../models/adminMdel'
import md5 from 'md5'

async function register(req: Request, res: Response) {
  try {
    await adminModel.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
    })

    return res.status(201).json({ msg: 'Admin cadastrado com sucesso!' })
  } catch (error) {
    return res.status(201).json({ msg: 'ERRO!!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await adminModel.find()

    return res.status(201).json(data)
  } catch (error) {
    return res.status(400).json({ msg: 'ERRO!!!', error })
  }
}

async function deleteAll(req: Request, res: Response) {
  try {
    await adminModel.deleteMany()

    return res.status(201).json({ msg: 'Ales deletado' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERRO!!!', error })
  }
}

export default { register, getAll, deleteAll }
