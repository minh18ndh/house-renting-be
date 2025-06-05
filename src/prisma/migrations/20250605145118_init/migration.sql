/*
  Warnings:

  - You are about to drop the column `userId` on the `FeedbackForm` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[FeedbackForm] DROP CONSTRAINT [FeedbackForm_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[FeedbackForm] DROP COLUMN [userId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
