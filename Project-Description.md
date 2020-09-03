# Stock-Jobs-Management-Project

Programs used:

1. SQL tables:

•	Logins  table – used for storing the system’s operator user name and password. Also this table stores the unique login_token that is used for identifying the user while he is logged in.

•	Products table – used for storing the products that will be later linked to the offers and jobs tables via many to many connection. The connections are stored in the offerProducts and JobProducts junction tables. 

•	Offers table – used for storing the offers that the user builds with the system. Has a many to many connection with the Products table, for storing the products that the user wants to add to the offer. The connections are saved in the offerProducts table.

•	offerProducts table – used as a junction table between the offers and products tables. 

•	Jobs table - used for storing the jobs that the user builds with the system. Has a many to many connection with the Products table, for storing the products that the user wants to add to the job. The connections are saved in the jobProducts table.

•	jobProducts table – used as a junction table between the jobs and products tables. 

2. Java-Spring: 

The connections between the SQL user data storing tables, and the client side web interface are made with the Java business logic and spring repositories for all CRUD and search functions. The Facade design pattern classes receive the data from the web interface through the controller classes, and execute the necessary logic using the Spring repositories and SQL tables.  

3. Angular 9: 

The client web pages are built with Angular 9 and enhanced by the jQuery, Bootstrap 4, ngxBootstrap, Font Awesome and many more libraries. All the web pages in this project are fitted for all device types (phone, tablet, laptop or extra large screens).

Description: 
The system provides the user with stock tracking and management, and the ability to link the stock to jobs that the user might execute in the future. For example, a company that specializes in selling and installing security systems could use this system to track its products, and link those products to outgoing installing jobs. 
The system is divided into six main sections: 

1.	The products table – In this section the user can add/edit/delete products. All the products added are inserted into a table where the user could view the product characteristics that he inserted using the “Add Form” before. Later, the user could edit the product characteristics or delete the product. The table (and all the other tables in this project) also provides search, sort and pagination for easy data access and comfort of view. 

2.	Create new offer – In this section the user builds an offer that he wishes to send to a potential client. The user inputs the offer details using the “Create new offer” form, and afterwards he may also add products that exist in the products table detailing the product’s name, quantity and cost for the potential client. 

3.	The active offers table – In this section the user may view the new offers that he created, and similar to the products table he could edit and delete the offers, as well as adding/editing/deleting the products that are linked to that offer. If the potential client approved the offer the offer could be transformed into an “Active Job”. Else, it could be simply stored in the “Offers History” table. Note that all offers that are transformed into an active job are also archived in the offers history table for tracking. 

4.	The offers history table – As mentioned before, this table stores all the previous offers that were either transformed into an active job or simply moved to this table. Similarly to the offers table, the user may edit or delete the offer and the products that he linked to it if he so wishes. The option to reactivate the offer and move it back to the offers table is also provided. 

5.	The active jobs table – If the user transformed the active offer into an active job - using the details provided before - the job’s material cost and profit will be automatically calculated and presented. At this point all the jobs details may also be edited, the job may be deleted and products linked to this job could be added/edited/deleted. 

6.	The jobs history table – Once the job has been completed the user could move it to this table for record. All the adding/editing/deleting functions are available here as well. 


