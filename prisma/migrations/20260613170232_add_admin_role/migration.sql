-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'WAITER', 'CASHIER', 'CHEF');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" "AdminRole" NOT NULL DEFAULT 'ADMIN';
