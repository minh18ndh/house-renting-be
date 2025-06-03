BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [fullName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] NVARCHAR(1000) NOT NULL,
    [categoryId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [uploadDate] DATETIME2 NOT NULL CONSTRAINT [Post_uploadDate_df] DEFAULT CURRENT_TIMESTAMP,
    [price] INT NOT NULL,
    [area] INT NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [bedroom] INT NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [isApproved] BIT NOT NULL CONSTRAINT [Post_isApproved_df] DEFAULT 0,
    [isRented] BIT NOT NULL CONSTRAINT [Post_isRented_df] DEFAULT 0,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Category_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Image] (
    [id] NVARCHAR(1000) NOT NULL,
    [baseUrl] NVARCHAR(1000) NOT NULL,
    [postId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Image_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CommentForm] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [postId] NVARCHAR(1000) NOT NULL,
    [submitDate] DATETIME2 NOT NULL CONSTRAINT [CommentForm_submitDate_df] DEFAULT CURRENT_TIMESTAMP,
    [content] NVARCHAR(1000) NOT NULL,
    [rating] INT NOT NULL,
    CONSTRAINT [CommentForm_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FeedbackForm] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [submitDate] DATETIME2 NOT NULL CONSTRAINT [FeedbackForm_submitDate_df] DEFAULT CURRENT_TIMESTAMP,
    [content] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [FeedbackForm_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TotalViews] (
    [id] NVARCHAR(1000) NOT NULL,
    [trackDate] DATETIME2 NOT NULL,
    [total] INT NOT NULL,
    CONSTRAINT [TotalViews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_userId_idx] ON [dbo].[Post]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_categoryId_idx] ON [dbo].[Post]([categoryId]);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Image] ADD CONSTRAINT [Image_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Post]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CommentForm] ADD CONSTRAINT [CommentForm_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CommentForm] ADD CONSTRAINT [CommentForm_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Post]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FeedbackForm] ADD CONSTRAINT [FeedbackForm_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
