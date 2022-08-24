import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export default async function handler(req: Request, res: Response) {
	const posts = await prisma.post.findMany()
	res.json(posts)
}
