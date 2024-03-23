const queries = {
  students: {
    getAll: `SELECT 
                   s.[Id] as id
                  ,s.[FullName] as fullName
                  ,s.[MathMark] as math
                  ,s.[HistoryMark] as history
                  ,s.[PhysicalEduMark] as physicalEdu
                  FROM [dbo].[vStudents] s`,
    exists: `SELECT CAST(CASE WHEN EXISTS (SELECT NULL
                  FROM [dbo].[Students] s
                  WHERE s.[Id] = @studentId) 
                  THEN 1 ELSE 0 END
                  AS BIT) AS [Exists]`,
    getById: `SELECT 
                  s.[Id] as id
                  ,s.[FullName] as fullName
                  ,s.[MathMark] as math
                  ,s.[HistoryMark] as history
                  ,s.[PhysicalEduMark] as physicalEdu
                  FROM [dbo].[vStudents] s
                  WHERE s.[Id] = @studentId`,
    deleteById: `BEGIN TRANSACTION;
                  DELETE FROM HistoryMarks WHERE [StudentId] = @studentId;
                  DELETE FROM MathMarks WHERE [StudentId] = @studentId;
                  DELETE FROM PhysicalEduMarks WHERE [StudentId] = @studentId;
                  DELETE FROM Students WHERE [Id] = @studentId;    
                  COMMIT;`,
    createOrUpdateHistoryMark: `
                  IF (@mark IS NOT NULL)
                  BEGIN
                        IF NOT EXISTS
                              (SELECT NULL
                              FROM [dbo].[HistoryMarks]
                              WHERE StudentId = @studentId)
                        INSERT INTO [dbo].[HistoryMarks]([StudentId], [Mark]) VALUES (@studentId, @mark)
                        ELSE
                        UPDATE [dbo].[HistoryMarks] SET Mark = @mark WHERE [StudentId] = @studentId
                  END
                  ELSE
                  BEGIN
                        IF EXISTS
                              (SELECT NULL
                              FROM [dbo].[HistoryMarks]
                              WHERE StudentId = @studentId)
                        DELETE FROM [dbo].[HistoryMarks] WHERE [StudentId] = @studentId
                  END`,
      createOrUpdateMathMark: `
                  IF (@mark IS NOT NULL)
                  BEGIN
                        IF NOT EXISTS
                              (SELECT NULL
                              FROM [dbo].[MathMarks]
                              WHERE StudentId = @studentId)
                        INSERT INTO [dbo].[MathMarks]([StudentId], [Mark]) VALUES (@studentId, @mark)
                        ELSE
                        UPDATE [dbo].[MathMarks] SET Mark = @mark WHERE [StudentId] = @studentId
                  END
                  ELSE
                  BEGIN
                        IF EXISTS
                              (SELECT NULL
                              FROM [dbo].[MathMarks]
                              WHERE StudentId = @studentId)
                        DELETE FROM [dbo].[MathMarks] WHERE [StudentId] = @studentId
                  END`,
      createOrupdatePhysicalEduMark: `
                  IF (@mark IS NOT NULL)
                  BEGIN
                        IF NOT EXISTS
                              (SELECT NULL
                              FROM [dbo].[PhysicalEduMarks]
                              WHERE StudentId = @studentId)
                        INSERT INTO [dbo].[PhysicalEduMarks]([StudentId], [Mark]) VALUES (@studentId, @mark)
                        ELSE
                        UPDATE [dbo].[PhysicalEduMarks] SET Mark = @mark WHERE [StudentId] = @studentId
                  END
                  ELSE
                  BEGIN
                        IF EXISTS
                              (SELECT NULL
                              FROM [dbo].[PhysicalEduMarks]
                              WHERE StudentId = @studentId)
                        DELETE FROM [dbo].[PhysicalEduMarks] WHERE [StudentId] = @studentId
                  END`,
      addStudent: `BEGIN TRANSACTION;
                  INSERT INTO Students (FirstName, LastName) VALUES (@firstName, @lastName);
                  DECLARE @studentId INT = SCOPE_IDENTITY();
                  IF (@historyMark IS NOT NULL)
                        INSERT INTO HistoryMarks (StudentId, Mark) VALUES (@studentId, @historyMark);
                  IF (@mathMark IS NOT NULL)
                        INSERT INTO MathMarks (StudentId, Mark) VALUES (@studentId, @mathMark);
                  IF (@physicalEduMark IS NOT NULL)
                        INSERT INTO PhysicalEduMarks (StudentId, Mark) VALUES (@studentId, @physicalEduMark);
                  COMMIT;
                  SELECT @studentId as [StudentId];`,
  },
};

module.exports = queries;
