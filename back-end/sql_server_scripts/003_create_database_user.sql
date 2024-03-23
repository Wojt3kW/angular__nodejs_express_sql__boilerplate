USE [MyBase]
GO

-- create user if not exist
IF NOT EXISTS(SELECT * FROM [MyBase].[sys].[database_principals] 
				WHERE [name] = N'UserApp' AND [type] IN ('C','E', 'G', 'K', 'S', 'U'))
	BEGIN
		CREATE USER [UserApp] FOR LOGIN [UserApp];

		EXEC sp_addrolemember N'db_owner', N'UserApp';
	END
GO