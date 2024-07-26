import { prismaClient } from '../utils/prismaClient'


type SessionMetadata = {
  token: string
  uuid: string
  deviceType: string
  deviceId: string
}

export const createSession = async (sessionMetadata: SessionMetadata) => {
  const { deviceId, deviceType, uuid, token } = sessionMetadata

  return prismaClient.session.create({
    data: {
      token,
      deviceType,
      deviceId,
      user: {
        connect: {
          uuid
        }
      }
    }
  })
}

export const findSessionByToken = async (sessionMetadata: SessionMetadata ) => {
  const { token, deviceId, deviceType } = sessionMetadata
  return prismaClient.session.findUnique({
    where: {
      token, deviceId, deviceType
    }
  })
}

export const findSessionByDeviceId = async (deviceId: string, uuid: string) => {
  return prismaClient.session.findFirst({
    where: {
      deviceId,
      userId: uuid
    }
  })
}

export const deleteSessionByToken = async (token: string) => {
  const session = await prismaClient.session.delete({
    where: {
      token
    }
  })

  return !!session
}

export const deleteSessionByUuid = async (token: string,uuid: string) => {
  return prismaClient.session.delete({
    where: {
      userId: uuid,
      token
    }
  })
}
