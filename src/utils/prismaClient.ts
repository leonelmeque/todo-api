import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient()

export const extractPrismaErrorMessage = (e: unknown) =>{
  if(typeof e === 'object' && e !== null && 'meta' in e) {
    const {meta: {cause}} = e as {meta: {cause?: string}}
    return cause
  }

  return undefined
}
