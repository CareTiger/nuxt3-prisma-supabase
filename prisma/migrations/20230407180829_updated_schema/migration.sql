/*
  Warnings:

  - You are about to drop the column `avatar_key` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `background_key` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar_key",
DROP COLUMN "background_key",
DROP COLUMN "provider";
