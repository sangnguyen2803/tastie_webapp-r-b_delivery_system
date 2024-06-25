USE Tastie;

#-------------------------------------------------
DROP PROCEDURE IF EXISTS Get_List_Product;

DELIMITER $$
CREATE PROCEDURE Get_List_Product(
	provider_id_ BIGINT
)
Begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Provider does not exist';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	ELSE 
-- 		SELECT  p.*, m.*
--         FROM Provider p LEFT JOIN MenuCategory m on p.provider_id = m.provider_id
--         UNION ALL
-- 		SELECT  p.*, m.*
--         FROM Provider p RIGHT JOIN MenuCategory m on p.provider_id = m.provider_id
--         WHERE p.provider_id = provider_id_;
        
			SELECT  m.*, u.*
			FROM Provider p RIGHT JOIN MenuCategory m on p.provider_id = m.provider_id 
			JOIN MenuCategoryDetail mcd ON mcd.menu_id = m.menu_id 
			RIGHT JOIN Product u ON mcd.product_id = u.product_id;
        
        
	END IF;
    COMMIT;
End$$
DELIMITER ;
CALL get_list_product(1000000);

#-----------------------------------------------------------------------------

-- # insert menu category
-- INSERT INTO MenuCategory (provider_id, `name`) VALUES (1000000, 'name category');


#Get food category
SELECT * FROM FoodCategory;

# Get menu category
DROP PROCEDURE IF EXISTS GetMenuItems;

DELIMITER $$
CREATE PROCEDURE GetMenuItems(
	provider_id_ BIGINT
)
Begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;
	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Provider does not exist';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	ELSE 
		SELECT m.*
        FROM Provider p LEFT JOIN MenuCategory m on p.provider_id = m.menu_id
        UNION ALL
		SELECT m.*
        FROM Provider p RIGHT JOIN MenuCategory m on p.provider_id = m.menu_id;
        
	END IF;
    COMMIT;
End$$
DELIMITER ;
#CALL GetMenuItems(1000000);

#-----------------------------------------------------------------------------------
#***
# add product
DROP PROCEDURE IF EXISTS AddProduct;

DELIMITER $$
CREATE PROCEDURE AddProduct(
	provider_id_ BIGINT,
	product_name_ NVARCHAR(90), 
	product_status_ TINYINT,  # 0 là lock by admin, 1 là available, 2 là sold out, 3 là lock by provider
	`description_` TEXT, 
	price_ INT, 
	quantity_ INT,
	-- menu_id_ INT,
-- 	food_category_id_ INT,
-- 	main_food_category_id_ INT,
-- 	label_ NVARCHAR(100),
-- 	value_ NVARCHAR(100),
-- 	option_price_ INT,
	create_at_ DATE,
	update_at_ DATETIME
)
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Error from provider ID';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
    ELSE
		INSERT INTO Product (product_name, product_status, `description`, price, 
							quantity, create_at, update_at, provider_id) 
		VALUES (product_name_, product_status_, `description_`, price_ , 
				quantity_, NOW(), CURDATE(), provider_id_);

-- 		INSERT ProductOption(product_id, label, `value`, price)
-- 			VALUES(product_id_, label_, value_, option_price_)
--         ON DUPLICATE KEY UPDATE
-- 			product_id = product_id_,
-- 			label = label_, 
-- 			`value` = value_,
-- 			price = option_price_;
	END IF;
    COMMIT;
    
End$$
DELIMITER ;

CALL AddProduct( 1000000, N'banh trang', 1,N'ngonn', 100, 20, NOW(), NOW());    


#------
#update product
DROP PROCEDURE IF EXISTS UpdateProduct;

DELIMITER $$
CREATE PROCEDURE UpdateProduct(
	 provider_id_ BIGINT,
	 product_id_ BIGINT, 
     product_name_ NVARCHAR(90), 
	 product_status_ TINYINT,  # 0 là lock by admin, 1 là available, 2 là sold out, 3 là lock by provider
    `description_` TEXT, 
     price_ INT, 
     product_image_ VARCHAR(150),
     quantity_ INT,
     update_at_ DATETIME
)
Begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Error from provider ID';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	END IF;
	IF NOT EXISTS (Select p.product_id FROM Product p WHERE p.product_id = product_id_)
    THEN
		SET @s1 = 'Error from product ID';
		SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = @s1;
        
	ELSE 
		UPDATE Product SET
			product_id = product_id_, 
			product_name = product_name_, 
			`description` = `description_`, 
			price = price_, 
            postion = 1,
			product_status =  product_status_,
			product_image = product_image_,
			quantity = quantity_, 
			update_at = update_at_
		WHERE product_id = product_id_;
    END IF;
    COMMIT;
    
End$$
DELIMITER ;

#CALL UpdateProduct(1000000, 1000000, N'banh trang', 1,N'ngonn', 100, product_image, 20, NOW());

#--------------------
# choose main food category (insert/update)
DROP PROCEDURE IF EXISTS Update_Product_Main_Category;
DELIMITER $$
CREATE PROCEDURE Update_Product_Main_Category(
	 provider_id_ BIGINT,
	 product_id_ BIGINT, 
     main_food_category_id_ INT
)
Begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Error from provider ID';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	END IF;
	IF NOT EXISTS (Select p.product_id FROM Product p WHERE p.product_id = product_id_)
    THEN
		SET @s1 = 'Error from product ID';
		SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = @s1;
        
	ELSE 
		IF EXISTS (SELECT * FROM MainFoodCategoryDetail WHERE main_food_category_id = main_food_category_id_ AND product_id = product_id_ )
        THEN
			DELETE FROM MainFoodCategoryDetail WHERE main_food_category_id = main_food_category_id_ AND product_id = product_id_ ;
        END IF;
    
		# choose main food category
        INSERT INTO MainFoodCategoryDetail (main_food_category_id, product_id) 
		VALUES (main_food_category_id_, product_id_)
		ON DUPLICATE KEY UPDATE
		main_food_category_id = main_food_category_id_, 
		product_id = product_id_;
	END IF;
    COMMIT;
    
End$$
DELIMITER ;
CALL Update_Product_Main_Category(1000000, 1000000, 1000000);



# --------------------------
# choose food category (insert/update)
DROP PROCEDURE IF EXISTS Update_Product_Category;
DELIMITER $$
CREATE PROCEDURE Update_Product_Category(
	 provider_id_ BIGINT,
	 product_id_ BIGINT, 
     food_category_id_ INT
)
Begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Error from provider ID';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	END IF;
	IF NOT EXISTS (Select p.product_id FROM Product p WHERE p.product_id = product_id_)
    THEN
		SET @s1 = 'Error from product ID';
		SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = @s1;
        
	ELSE 
		IF EXISTS (SELECT * FROM FoodCategoryDetail WHERE food_category_id = food_category_id_ AND product_id = product_id_ )
        THEN
			DELETE FROM FoodCategoryDetail WHERE food_category_id = food_category_id_ AND product_id = product_id_ ;
        END IF;
    
		# choose food category
        INSERT INTO FoodCategoryDetail (food_category_id, product_id) 
		VALUES (food_category_id_, product_id_)
		ON DUPLICATE KEY UPDATE
		food_category_id = food_category_id_, 
		product_id = product_id_;
	END IF;
    COMMIT;
    
End$$
DELIMITER ;
#CALL Update_Product_Category(1000000, 1000000, 1000001);

# choose menu category (insert/update)
DROP PROCEDURE IF EXISTS Update_Product_Menu_Category;
DELIMITER $$
CREATE PROCEDURE Update_Product_Menu_Category(
	 provider_id_ BIGINT,
	 product_id_ BIGINT, 
     menu_id_ INT
)
Begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Error from provider ID';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	END IF;
	IF NOT EXISTS (Select p.product_id FROM Product p WHERE p.product_id = product_id_)
    THEN
		SET @s1 = 'Error from product ID';
		SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = @s1;
        
	ELSE 
		# choose menu category
		INSERT INTO MenuCategoryDetail (menu_id, product_id) 
			VALUES (menu_id_, product_id_)
		ON DUPLICATE KEY UPDATE
			menu_id = menu_id_, 
            product_id = product_id_;
	END IF;
    COMMIT;
    
End$$
DELIMITER ;
#CALL Update_Product_Menu_Category(1000000, 1000000, 1000004);





# -------------------------------------------------------------------------------
# insert/update product option
DROP PROCEDURE IF EXISTS Add_Product_Option;
DELIMITER $$
CREATE PROCEDURE Add_Product_Option(
	 provider_id_ BIGINT,
	 product_id_ BIGINT, 
     label_ NVARCHAR(100),
     value_ NVARCHAR(100),
	 price_ INT
)
Begin
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (Select p.provider_id FROM Provider p WHERE p.provider_id = provider_id_)
    THEN
		SET @s = 'Error from provider ID';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	END IF;
	IF NOT EXISTS (Select p.product_id FROM Product p WHERE p.product_id = product_id_)
    THEN
		SET @s1 = 'Error from product ID';
		SIGNAL SQLSTATE '45002' SET MESSAGE_TEXT = @s1;
        
	ELSE 
		INSERT ProductOption(product_id, label, `value`, price)
		VALUES(product_id_, label_, value_, price_)
        ON DUPLICATE KEY UPDATE
        product_id = product_id_,
        label = label_, 
        `value` = value_,
        price = price_;
        
	END IF;
    COMMIT;
End$$
DELIMITER ;

CALL Add_Product_Option(1000000, 1000000, 'Size', 'S', 10);
CALL Add_Product_Option(1000000, 1000000, 'Size', 'S', 20);





