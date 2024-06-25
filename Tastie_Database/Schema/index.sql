USE Tastie;

# login
-- DROP INDEX user_idx ON `User`;
CREATE INDEX user_idx ON `User`(email, phone, `password`);
-- CALL Login('1231231231', '$2b$10$8Y3a99B3gvjnP0dvg9hDt.Nu2D.Q/IBwi3Wyk6zjw1cT8aydjpVC6', '');
SHOW STATUS LIKE 'Last_query_cost';

CREATE INDEX payment_idx ON PaymentStatus(update_at, `status`);

CREATE INDEX OrderCustomer ON `Order`(customer_id);
CREATE INDEX order_update_at_idx ON OrderStatus(update_at);

CREATE INDEX product_status_idx ON Product(product_status);


-- CALL Get_Num_Order_By_Provider(1000000, '2020-09-15');


-- CALL Get_Num_Order_By_Provider(1000000, '2020-09-15');

-- CALL Get_Num_Orders_Inclu_Vouchers_By_Provider(1000000, '2020-09-15');

-- CALL Get_Order_History_By_Customer(1000161);

-- CALL Get_Order_Summary('102875CF9222E1CF4C11499994');

-- CALL Get_Provider_Num_Orders_By_Time(1000000, 1, 11, 2021);

-- CALL Get_Total_Revenue_By_Time(1, 2, 2021);

-- CALL Get_Voucher_Claims(1000000, '2019-01-1')



# -------------------------------------------------------------------------------------------------
Use Tastie;
SET @ORIG_SQL_REQUIRE_PRIMARY_KEY = @@SQL_REQUIRE_PRIMARY_KEY;
SET SQL_REQUIRE_PRIMARY_KEY = 0;

DROP TABLE IF EXISTS Get_Total_Revenue_By_Time_Table;
CREATE TABLE Get_Total_Revenue_By_Time_Table(
	`month` TINYINT,
	`year` INT,
	`total_revenue` DOUBLE
);
DROP PROCEDURE IF EXISTS Revenue_By_Time_Operation;
DELIMITER $$
CREATE PROCEDURE Revenue_By_Time_Operation(year_ INT, num_month_ INT)
	Begin
	DECLARE i INT DEFAULT 1;
	WHILE (i <= num_month_) DO
		INSERT INTO Get_Total_Revenue_By_Time_Table(`month`, `total_revenue`, `year`) 
		VALUES(i, Get_Total_Revenue_By_Time_Func(i, i, year_), year_);
		set i=i+1;
	END WHILE;
End$$
DELIMITER ;
CALL Revenue_By_Time_Operation(2022, MONTH(NOW())); 

SELECT * FROM Get_Total_Revenue_By_Time_Table;

-- DROP VIEW IF EXISTS Get_Total_Revenue_By_Time_View;
-- CREATE VIEW Get_Total_Revenue_By_Time_View AS SELECT * FROM Get_Total_Revenue_By_Time_Table;
-- SELECT * FROM Get_Total_Revenue_By_Time_View;




DROP TABLE IF EXISTS Get_Num_Orders_By_Time_Table;
CREATE TABLE Get_Num_Orders_By_Time_Table(
	`month` TINYINT,
	`year` INT,
	`total_num_orders` INT
);
DROP PROCEDURE IF EXISTS Num_Orders_By_Time_Operation;
DELIMITER $$
CREATE PROCEDURE Num_Orders_By_Time_Operation(year_ INT, num_month_ INT)
	Begin
	DECLARE i INT DEFAULT 1;
	WHILE (i <= num_month_) DO
		INSERT INTO Get_Num_Orders_By_Time_Table(`month`, `total_num_orders`, `year`) 
		VALUES(i, Get_Num_Orders_By_Time_Func(i, i, year_), year_);
		set i=i+1;
	END WHILE;
End$$
DELIMITER ;
CALL Num_Orders_By_Time_Operation(2021, 12);

CALL Num_Orders_By_Time_Operation(2022, MONTH(NOW())); 


SELECT * FROM Get_Num_Orders_By_Time_Table;




# view of Get_Top_Providers_By_Revenue
CALL Get_Top_Providers_By_Revenue(2, 5, 2021, 20);


