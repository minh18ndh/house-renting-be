BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CommentForm] DROP CONSTRAINT [CommentForm_postId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FeedbackForm] DROP CONSTRAINT [FeedbackForm_userId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[CommentForm] ADD CONSTRAINT [CommentForm_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Post]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FeedbackForm] ADD CONSTRAINT [FeedbackForm_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
