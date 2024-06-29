/*
  Warnings:

  - You are about to drop the column `name` on the `SubTask` table. All the data in the column will be lost.
  - Added the required column `subTaskName` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SubTask` DROP COLUMN `name`,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `subTaskName` VARCHAR(100) NOT NULL;
