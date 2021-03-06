/****** Object:  Database [ProjectManagement]    Script Date: 23/02/2016 12:56:03 ******/
CREATE DATABASE [ProjectManagement]
 GO
USE [ProjectManagement]
GO
/****** Object:  Table [dbo].[Career]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Career](
	[CareerId] [nvarchar](128) NOT NULL,
	[CareerName] [nvarchar](500) NULL,
	[Note] [ntext] NULL,
PRIMARY KEY CLUSTERED 
(
	[CareerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Department]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentId] [nvarchar](128) NOT NULL,
	[DepartmentName] [nvarchar](300) NOT NULL,
	[Note] [ntext] NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HistoryLogs]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoryLogs](
	[LogId] [nvarchar](128) NOT NULL,
	[LogContent] [ntext] NOT NULL,
	[DateLog] [datetime] NOT NULL,
	[UserLog] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Period]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Period](
	[PeriodId] [nvarchar](128) NOT NULL,
	[Year] [int] NULL,
	[Amount] [decimal](18, 0) NULL,
	[AmountReutrn] [decimal](18, 0) NULL,
	[AmountForward] [decimal](18, 0) NULL,
	[BalanceForward] [decimal](18, 0) NULL,
	[ProjectId] [nvarchar](128) NULL,
	[Note] [ntext] NULL,
PRIMARY KEY CLUSTERED 
(
	[PeriodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PeriodDetails]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PeriodDetails](
	[PeriodDetailId] [nvarchar](128) NOT NULL,
	[Type] [int] NULL,
	[Amount] [decimal](18, 0) NULL,
	[AmountDate] [datetime] NULL,
	[AdvanceAmount] [decimal](18, 0) NULL,
	[AdvanceDate] [datetime] NULL,
	[Payment] [decimal](18, 0) NULL,
	[PaymentDate] [datetime] NULL,
	[Note] [ntext] NULL,
	[ProjectId] [nvarchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[PeriodDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Permission]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[PermissionId] [nvarchar](128) NOT NULL,
	[ProjectId] [nvarchar](128) NULL,
	[UserId] [nvarchar](128) NULL,
	[Role] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Profile]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[ProfileId] [nvarchar](128) NOT NULL,
	[ProfileName] [nvarchar](500) NULL,
	[Description] [ntext] NULL,
	[FileName] [nvarchar](500) NULL,
	[ProjectId] [nvarchar](128) NULL,
	[PathFile] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ProfileId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Project]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[ProjectId] [nvarchar](128) NOT NULL,
	[ProjectName] [nvarchar](2000) NULL,
	[ProjectType] [int] NULL,
	[Agency] [nvarchar](500) NULL,
	[FundsFor] [decimal](18, 4) NULL,
	[MonthFrom] [int] NULL,
	[MonthTo] [int] NULL,
	[YearFrom] [int] NULL,
	[YearTo] [int] NULL,
	[PlanYear] [int] NULL,
	[ProjectContent] [ntext] NULL,
	[Target] [ntext] NULL,
	[Necessary] [ntext] NULL,
	[Product] [ntext] NULL,
	[AcceptDate] [datetime] NULL,
	[Result] [int] NULL,
	[Lock] [bit] NULL,
	[UserMain] [nvarchar](500) NULL,
	[Note] [ntext] NULL,
	[Gender] [int] NULL,
	[Degree] [nvarchar](500) NULL,
	[AcademicTitles] [nvarchar](500) NULL,
	[Position] [nvarchar](300) NULL,
	[PhoneNumber] [nvarchar](100) NULL,
	[Fax] [nvarchar](100) NULL,
	[Email] [nvarchar](300) NULL,
	[UsersJoin] [nvarchar](2000) NULL,
	[EconomyTarget] [ntext] NULL,
	[Slogan] [ntext] NULL,
	[Size] [ntext] NULL,
	[ApproveNumber] [nvarchar](100) NULL,
	[ContractNumber] [nvarchar](100) NULL,
	[TargetExpected] [ntext] NULL,
	[ContentExpected] [ntext] NULL,
	[ProductExpected] [ntext] NULL,
	[FundsForExpected] [decimal](18, 4) NULL,
	[ProjectNameExpected] [nvarchar](2000) NULL,
	[UserCreateId] [nvarchar](128) NULL,
	[CreateDate] [datetime] NULL,
	[UserUpdateId] [nvarchar](128) NULL,
	[UpdateDate] [datetime] NULL,
	[DepartmentId] [nvarchar](128) NULL,
	[CareerId] [nvarchar](128) NULL,
	[Status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Schedule]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule](
	[ScheduleId] [nvarchar](128) NOT NULL,
	[ScheduleName] [nvarchar](500) NULL,
	[Content] [ntext] NULL,
	[MonthFrom] [int] NULL,
	[YearFrom] [int] NULL,
	[MonthTo] [int] NULL,
	[YearTo] [int] NULL,
	[IsComplete] [bit] NULL,
	[Note] [ntext] NULL,
	[ProjectId] [nvarchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[ScheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 23/02/2016 12:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [nvarchar](128) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
	[DepartmentId] [nvarchar](128) NOT NULL,
	[FullName] [nvarchar](256) NOT NULL,
	[Address] [nvarchar](500) NULL,
	[Birthday] [datetime] NULL,
	[RoleAdmin] [bit] NOT NULL,
	[Position] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[Career] ([CareerId], [CareerName], [Note]) VALUES (N'24ec7c0d-de70-4aea-b87a-c384a7e64913', N'Giáo dục', N'Giáo dục')
INSERT [dbo].[Career] ([CareerId], [CareerName], [Note]) VALUES (N'4916f829-0117-41e3-beba-833973e1bd0f', N'Công nghệ thông tin', N'Công nghệ thông tin')
INSERT [dbo].[Career] ([CareerId], [CareerName], [Note]) VALUES (N'6747022d-77c1-4d1e-84d2-e19f6a9bd585', N'Chính trị - tư tưởng', N'Chính trị - tư tưởng')
INSERT [dbo].[Career] ([CareerId], [CareerName], [Note]) VALUES (N'7a6ff486-917d-48d2-add5-459f08c58a85', N'Kế hoạch đầu tư và thương mại, dịch vụ', N'Kế hoạch đầu tư và thương mại, dịch vụ')
INSERT [dbo].[Career] ([CareerId], [CareerName], [Note]) VALUES (N'a5a1e3fe-7ef7-431d-9ccf-f34b974f03ea', N'Giao thông', N'Giao thông')
INSERT [dbo].[Career] ([CareerId], [CareerName], [Note]) VALUES (N'd817a97f-b63e-4436-99a5-9dd223ad8782', N'Công nghiệp', N'Công nghiệp')
INSERT [dbo].[Department] ([DepartmentId], [DepartmentName], [Note]) VALUES (N'1', N'ABC', NULL)
INSERT [dbo].[Department] ([DepartmentId], [DepartmentName], [Note]) VALUES (N'73da2286-2b7f-47a0-9b82-261601aa875e', N'Kê hoạch', N'')
INSERT [dbo].[Department] ([DepartmentId], [DepartmentName], [Note]) VALUES (N'f2708b13-403b-4eaf-b77b-d1dcd470a5e5', N'Dự án', N'')
INSERT [dbo].[Department] ([DepartmentId], [DepartmentName], [Note]) VALUES (N'f9ef191c-89ca-4d88-beab-940824270c27', N'Tài chính', N'')
INSERT [dbo].[Permission] ([PermissionId], [ProjectId], [UserId], [Role]) VALUES (N'0aaba078-d30a-4000-bd8a-c4e24790bd33', N'48695cac-dd2a-4981-ad2e-e2d38b584719', N'1', 2)
INSERT [dbo].[Project] ([ProjectId], [ProjectName], [ProjectType], [Agency], [FundsFor], [MonthFrom], [MonthTo], [YearFrom], [YearTo], [PlanYear], [ProjectContent], [Target], [Necessary], [Product], [AcceptDate], [Result], [Lock], [UserMain], [Note], [Gender], [Degree], [AcademicTitles], [Position], [PhoneNumber], [Fax], [Email], [UsersJoin], [EconomyTarget], [Slogan], [Size], [ApproveNumber], [ContractNumber], [TargetExpected], [ContentExpected], [ProductExpected], [FundsForExpected], [ProjectNameExpected], [UserCreateId], [CreateDate], [UserUpdateId], [UpdateDate], [DepartmentId], [CareerId], [Status]) VALUES (N'48695cac-dd2a-4981-ad2e-e2d38b584719', N'Nhiệm vụ KHCN 2016', 1, N'UBND TP Hà Nội', CAST(20000000.0000 AS Decimal(18, 4)), NULL, NULL, NULL, NULL, 2016, N'hoàn thành', N'mục tiêu nghiên cứu', N'bình thường', N'đa', NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'mục tiêu nghiên cứu', N'hoàn thành', N'đa', CAST(20000000.0000 AS Decimal(18, 4)), N'Nhiệm vụ KHCN 2016', NULL, NULL, NULL, NULL, N'f2708b13-403b-4eaf-b77b-d1dcd470a5e5', NULL, 3)
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [SecurityStamp], [PhoneNumber], [LockoutEnabled], [UserName], [DepartmentId], [FullName], [Address], [Birthday], [RoleAdmin], [Position]) VALUES (N'1', N'admin@gmail.com', N'63827414287237553053576617211187', N'59a032e3ae142683c1fca10fb82e5efee140be827d6ce913cf78b8f780378054', NULL, 0, N'admin', N'1', N'Admin', NULL, NULL, 1, 1)
INSERT [dbo].[Users] ([UserId], [Email], [PasswordHash], [SecurityStamp], [PhoneNumber], [LockoutEnabled], [UserName], [DepartmentId], [FullName], [Address], [Birthday], [RoleAdmin], [Position]) VALUES (N'508d510b-5597-4b2c-a344-799bf66d3d1f', N'hoan.lq@nhantinsoft.vn', N'63827414287237553053576617211187', N'59a032e3ae142683c1fca10fb82e5efee140be827d6ce913cf78b8f780378054', N'0988084853', 0, N'hoanlq', N'f2708b13-403b-4eaf-b77b-d1dcd470a5e5', N'Lê Quang Hoan', N'', NULL, 1, 1)
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Department] ([DepartmentId])
GO
USE [master]
GO
ALTER DATABASE [ProjectManagement] SET  READ_WRITE 
GO
