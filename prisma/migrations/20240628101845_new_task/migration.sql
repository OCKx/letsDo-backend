/*
  Warnings:

  - You are about to drop the column `reminderID` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Reminder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reminderDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_reminderID_fkey`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `reminderID`,
    ADD COLUMN `reminderDate` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `Reminder`;
