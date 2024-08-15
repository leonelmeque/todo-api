import cron from 'node-cron';
import {prismaClient} from '../utils/prismaClient';

cron.schedule('0 */12 * * *', async () => {

  const runningJobAt = Intl.DateTimeFormat('en', {dateStyle: 'medium'}).format(Date.now())

  console.log('Sniffing for data removal requests - time: ' + runningJobAt)

  const oneMinuteAgo = new Date(Date.now() - 60000)
  const usersToDelete = await prismaClient.user.findMany({
    where: {
      markedForDeletionAt: {
        not: null,
        lt: oneMinuteAgo
      }
    }
  })

  for (const user of usersToDelete) {
    await prismaClient.user.delete({
      where: {
        uuid: user.uuid
      }
    })
  }

})
