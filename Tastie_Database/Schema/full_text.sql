USE Tastie;

ALTER TABLE Product ADD FULLTEXT (product_name);
ALTER TABLE Provider ADD FULLTEXT (merchant_name);
ALTER TABLE `User` ADD FULLTEXT (first_name, last_name);
ALTER TABLE `User` ADD FULLTEXT (first_name);
ALTER TABLE `User` ADD FULLTEXT (last_name);


SELECT * FROM Product WHERE MATCH(product_name) against('pizza  chesse' IN NATURAL LANGUAGE MODE);


DROP PROCEDURE IF EXISTS Search_Product;
DELIMITER $$
CREATE PROCEDURE Search_Product(
	 search_key NVARCHAR(100)
)
Begin
	SELECT DISTINCT(pd.provider_id) 
    FROM Product pd JOIN Provider pv ON pd.provider_id = pv.provider_id
    WHERE MATCH(pd.product_name) against(search_key) OR MATCH(pv.merchant_name) against(search_key)
    OR pd.product_name LIKE CONCAT('%',search_key,'%');
    -- MATCH(pd.product_name) against(search_key IN NATURAL LANGUAGE MODE) OR MATCH(pv.merchant_name ) against(search_key IN NATURAL LANGUAGE MODE);
End$$
DELIMITER ;

# CALL Search_Product('bu');


DROP PROCEDURE IF EXISTS Filter_User_Name;
DELIMITER $$
CREATE PROCEDURE Filter_User_Name(
	 search_key NVARCHAR(100)
)
Begin
	SELECT *
    FROM `User` u
    WHERE MATCH(u.first_name) against(search_key) OR u.first_name LIKE CONCAT('%',search_key,'%')
    OR MATCH(u.last_name) against(search_key) OR u.last_name LIKE CONCAT('%',search_key,'%');
    -- MATCH(pd.product_name) against(search_key IN NATURAL LANGUAGE MODE) OR MATCH(pv.merchant_name ) against(search_key IN NATURAL LANGUAGE MODE);
End$$
DELIMITER ;




DROP PROCEDURE IF EXISTS Filter_Provider_By_Name;
DELIMITER $$
CREATE PROCEDURE Filter_Provider_By_Name(
	 search_key NVARCHAR(100)
)
Begin
	SELECT *
    FROM Provider p
    WHERE MATCH(p.merchant_name) against(search_key) OR p.merchant_name LIKE CONCAT('%',search_key,'%');
End$$
DELIMITER ;



# CALL Filter_User_Name('Rolo');
# --------------------------------------------------JUST DUMMY----------------------------

DROP PROCEDURE IF EXISTS Add_Promotion;

DELIMITER $$
CREATE PROCEDURE Add_Promotion(
	provider_id_ BIGINT,
	promotion_code_ VARCHAR(30),
    promotion_name_ NVARCHAR(50),
	promotion_value_ FLOAT,
    promotion_description_ NVARCHAR(200),
    min_order_value_ FLOAT,
    max_discount_value_ FLOAT,
	start_at_ TIMESTAMP,
    expire_at_ TIMESTAMP,
    payment_method_id_ TINYINT,
    limited_offer_ INT,
    weekly_usage_limit_per_user_ TINYINT,
    delivery_mode_ TINYINT
)
Begin
	DECLARE promotion_status_ TINYINT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the # CALLer
    END;
	START TRANSACTION;
        SET promotion_status_ = 1;
        INSERT INTO Promotion(provider_id, promotion_code, promotion_name, promotion_value, 
        promotion_description, min_order_value, max_discount_value, start_at, expire_at, 
        payment_method_id, limited_offer, weekly_usage_limit_per_user, delivery_mode, 
        promotion_status) 
        VALUES (provider_id_, promotion_code_, promotion_name_, promotion_value_, 
        promotion_description_, min_order_value_, max_discount_value_, start_at_, 
        expire_at_, payment_method_id_, limited_offer_, weekly_usage_limit_per_user_, 
        delivery_mode_, promotion_status_);
	COMMIT;
End$$
DELIMITER ;

CALL Add_Promotion(1000008, 'P_FREESHIP', 'Sale off 2 USD', 0, '2 USD off on shipping fee', 20, 2, '2022-03-31 12:00:00', '2022-12-30 12:00:00', 1, 300, 5, 1);
CALL Add_Promotion(1000011, 'P_SALEOFF10USD', 'Sale off 10 USD', 50, 'Maximum 10 USD off on total amount', 50, 10, '2022-03-31 12:00:00', '2022-12-30 12:00:00', 1, 300, 2, 1);


# [Admin] Create ecoupon
DROP PROCEDURE IF EXISTS Add_Ecoupon;

DELIMITER $$
CREATE PROCEDURE Add_Ecoupon(
	ecoupon_code_ VARCHAR(30),
    ecoupon_name_ NVARCHAR(50),
	ecoupon_value_ FLOAT,
    ecoupon_description_ NVARCHAR(200),
    min_order_value_ FLOAT,
    max_discount_value_ FLOAT,
	start_date_ TIMESTAMP,
    expire_date_ TIMESTAMP,
    payment_method_id_ TINYINT,
    limited_offer_ INT,
    weekly_usage_limit_per_user_ TINYINT,
    delivery_mode_ TINYINT
)
Begin
	DECLARE ecoupon_status_ TINYINT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the # CALLer
    END;
	START TRANSACTION;
        SET ecoupon_status_ = 1;
        INSERT INTO Ecoupon(ecoupon_code, ecoupon_name, ecoupon_value, ecoupon_description, 
        min_order_value, max_discount_value, start_date, expire_date, payment_method_id,
        limited_offer, weekly_usage_limit_per_user, delivery_mode, ecoupon_status) 
        VALUES (ecoupon_code_, ecoupon_name_, ecoupon_value_, ecoupon_description_, 
        min_order_value_, max_discount_value_, start_date_, expire_date_, payment_method_id_,
        limited_offer_, weekly_usage_limit_per_user_, delivery_mode_, ecoupon_status_);
	COMMIT;
End$$
DELIMITER ;

CALL Add_Ecoupon('E_SALEOFF10USD', 'Sale off 10 USD', 50, 'Maximum 10 USD off on total amount', 20, 10, '2022-03-31 12:00:00', '2022-12-30 12:00:00', 1, 300, 1, 1);
CALL Add_Ecoupon('E_SALEOFF20USD', 'Sale off 20 USD', 50, 'Maximum 20 USD off on total amount', 80, 20, '2022-03-31 12:00:00', '2022-12-30 12:00:00', 1, 300, 1, 1);
CALL Add_Ecoupon('E_SALEOFF25USD', 'Sale off 25 USD', 50, 'Maximum 25 USD off on total amount', 100, 25, '2022-03-31 12:00:00', '2022-12-30 12:00:00', 1, 300, 1, 1);
