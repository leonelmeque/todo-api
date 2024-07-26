-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_user_uuid_fkey";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
