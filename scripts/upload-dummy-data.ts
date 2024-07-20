import { PrismaClient } from '@prisma/client';
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient();

async function uploadUsers() {
  try {
    const count = await prisma.user.count()
    if(count !== 0) {
      console.log("No need to upload table data for users")
      return
    }

    const usersData = fs.readFileSync(path.join(__dirname,'..' ,'src/db/users.json'), 'utf8');
    const users = JSON.parse(usersData) ;

    for (const user of users) {
      await prisma.user.create({
        data: {
          uuid: user.uuid,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          password: ''
        },
      });
      console.log(`User ${user.username} added successfully.`);
    }

    console.log('All users have been uploaded successfully.');
  } catch (error) {
    console.error('Error uploading users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadUsers();
