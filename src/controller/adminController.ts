import { Request, Response } from 'express'
import adminModel from '../models/adminMdel'
import md5 from 'md5'
import { generateToken, verifyToken } from '../token'

async function register(req: Request, res: Response) {
  try {
    const data = [req.body.email, req.body.password]

    await adminModel.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
    })

    const token = await generateToken(data)

    return res.status(201).json({ msg: 'Admin cadastrado com sucesso!', token })
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

async function Login(req: Request, res: Response) {
  try {
    const user = await adminModel.findOne({
      email: req.body.email,
      password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
    })

    const data = [user.email, user.password]
    const token = await generateToken(data)

    console.log(token)

    return res.status(200).send({ user, token })
  } catch (error) {
    return res.status(400).json({ msg: 'Senha ou email invalidos!!' })
  }
}

async function isAuthorized(req: Request, res: Response, next: () => any) {
  const token = req.body.token || req.headers['x-access-token']

  if (!token) return res.status(401).send({ error: 'Not authorized' })

  const error: any = await verifyToken(token)

  if (error) return res.status(401).send({ error: 'Invalid token' })
  // req.body.currentUser = await getCurrentUser(decode.email)
  return next()
}
// async function Auth(){
//   try {

//   } catch (error) {

//   }
// }

export default { register, isAuthorized, getAll, deleteAll, Login }
