
/* create DB */
use master 
CREATE DATABASE Shidroogim

/* create login table */
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING OFF
GO

CREATE TABLE [dbo].[logins](
	[login_id] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [varchar](max) NOT NULL DEFAULT ('default'),
	[password] [varchar](max) NOT NULL DEFAULT ('default'),
	[login_token] [varchar](max),
 CONSTRAINT [login_id_pk] PRIMARY KEY CLUSTERED 
(
	[login_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

/* create products table */ 
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING OFF
GO

CREATE TABLE [products](
	[product_id] [int] IDENTITY (1,1) NOT NULL,
	[product_category] [nvarchar](max) NOT NULL,
	[product_name] [nvarchar](max) NOT NULL,
	[product_manufacturer] [nvarchar](max) NULL DEFAULT (NULL),
	[product_catalog_num] [varchar](max) NULL DEFAULT (NULL),
	[product_quantity] [int] NOT NULL DEFAULT ((0)),
	[product_on_sale_quantity] [int] NOT NULL DEFAULT ((0)),
	[product_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[product_on_sale_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[product_total_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[product_total_on_sale_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[product_combined_total_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[product_imagefile] [nvarchar](max) NULL DEFAULT (NULL),
CONSTRAINT [product_id_pk] PRIMARY KEY CLUSTERED	
(
[product_id] ASC
) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

/* create offers table */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING OFF
GO

CREATE TABLE [offers](
	[offer_id] [int] IDENTITY (1,1) NOT NULL,
	[offer_number] [int] NOT NULL DEFAULT ((0)),
	[offer_cust_name] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_cust_address] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_desc] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_origin] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_type] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_remarks] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_cust_payment] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[date_of_offer] [datetime] DEFAULT ('2030-01-01 00:00:00'),
	[offer_stage] [varchar](2),
	[offer_received] [nvarchar](max) NULL DEFAULT (NULL),
CONSTRAINT [offer_id_pk] PRIMARY KEY CLUSTERED	
(
[offer_id] ASC
) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

/* create jobs table */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING OFF
GO

CREATE TABLE [jobs](
	[job_id] [int] IDENTITY (1,1) NOT NULL,
	[job_number] [int] NOT NULL DEFAULT ((0)),
	[cust_name] [nvarchar](max) NULL DEFAULT (NULL),
	[cust_address] [nvarchar](max) NULL DEFAULT (NULL),
	[job_desc] [nvarchar](max) NULL DEFAULT (NULL),
	[job_origin] [nvarchar](max) NULL DEFAULT (NULL),
	[job_type] [nvarchar](max) NULL DEFAULT (NULL),
	[job_remarks] [nvarchar](max) NULL DEFAULT (NULL),
	[mat_cost] [decimal](20,3) DEFAULT ((0.00)),
	[labor_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[cust_payment] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[profit] [decimal](20,3) DEFAULT ((0.00)),
	[profit_perc] [decimal](20,3) DEFAULT ((0.00)),
	[job_date_of_offer] [datetime] DEFAULT ('2030-01-01 00:00:00'),
	[date_of_install] [datetime] DEFAULT ('2030-01-01 00:00:00'),
	[date_of_compleat] [datetime] DEFAULT ('2030-01-01 00:00:00'),
	[job_stage] [varchar](2),
CONSTRAINT [job_id_pk] PRIMARY KEY CLUSTERED	
(
[job_id] ASC
) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

/* create offer_products table */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING OFF
GO

CREATE TABLE [offerproducts](
	[o_id] [int] NOT NULL CONSTRAINT [o_idc_fk] FOREIGN KEY ([o_id])
	REFERENCES [dbo].[offers] ([offer_id]),
	[offer_product_id] [int] NOT NULL CONSTRAINT [agr_product_id_fk] FOREIGN KEY ([offer_product_id]) 
	REFERENCES [dbo].[products] ([product_id]),
	[offer_product_number] [int] NOT NULL DEFAULT ((0)),
	[offer_product_name] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_product_quantity] [int] NOT NULL DEFAULT ((0)),
	[offer_product_missing] [nvarchar](max) NULL DEFAULT (NULL),
	[offer_product_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[offer_product_subtotal] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
CONSTRAINT [PK_offerproducts] PRIMARY KEY CLUSTERED 
(
	[o_id] ASC,
	[offer_product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

/* create job_products table */

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING OFF
GO

CREATE TABLE [jobproducts](
	[j_id] [int] NOT NULL CONSTRAINT [j_idc_fk] FOREIGN KEY ([j_id])
	REFERENCES [dbo].[jobs] ([job_id]),
	[job_product_id] [int] NOT NULL CONSTRAINT [bgr_product_id_fk] FOREIGN KEY ([job_product_id]) 
	REFERENCES [dbo].[products] ([product_id]),
	[job_product_number] [int] NOT NULL DEFAULT ((0)),
	[job_product_name] [nvarchar](max) NULL DEFAULT (NULL),
	[job_product_quantity] [int] NOT NULL DEFAULT ((0)),
	[job_product_missing] [nvarchar](max) NULL DEFAULT (NULL),
	[job_product_cost] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[job_product_subtotal] [decimal](20,3) NOT NULL DEFAULT ((0.00)),
	[job_product_inst] [nvarchar](max) NULL DEFAULT (NULL),
CONSTRAINT [PK_jobproducts] PRIMARY KEY CLUSTERED 
(
	[j_id] ASC,
	[job_product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO
 
 drop database Shidroogim

 drop table offers
 drop table offerproducts
 drop table jobproducts
 drop table jobs
 drop table logins

 insert into logins values ('amisa', '123', null);
 

  
