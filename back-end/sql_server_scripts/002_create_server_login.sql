USE [MyBase]
GO

-- create login if not exist
IF NOT EXISTS (SELECT * FROM [master].[sys].[server_principals]
				WHERE [name] = N'UserApp' AND [type] IN ('C','E', 'G', 'K', 'S', 'U'))
    CREATE LOGIN [UserApp]
		WITH 
			PASSWORD = N'zaq1@WSX',
			DEFAULT_DATABASE = [MyBase]
