USE [MyBase]
GO

CREATE VIEW [dbo].[vStudents] AS
SELECT 
	 s.[Id]
	,s.[FirstName]
	,s.[LastName]
	,COALESCE(s.[FirstName] + ' ' + s.[LastName], s.[LastName], s.[FirstName]) AS [FullName]
	,mm.[Mark] as [MathMark]
	,hm.[Mark] as [HistoryMark]
	,pem.[Mark] as [PhysicalEduMark]
FROM [dbo].[Students] s
LEFT OUTER JOIN [dbo].[MathMarks] mm ON s.[Id] = mm.[StudentId]
LEFT OUTER JOIN [dbo].[HistoryMarks] hm ON s.[Id] = hm.[StudentId]
LEFT OUTER JOIN [dbo].[PhysicalEduMarks] pem ON s.[Id] = pem.[StudentId]