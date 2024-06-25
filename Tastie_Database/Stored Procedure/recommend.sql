USE Tastie;


# [provider]
DROP PROCEDURE IF EXISTS Get_Home_Recommend;

DELIMITER $$
CREATE PROCEDURE Get_Home_Recommend(
	user_id_ BIGINT
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- rollback any changes made in the transaction
        RESIGNAL;  -- raise again the sql exception to the caller
    END;
	START TRANSACTION;

	IF NOT EXISTS (SELECT u.user_id FROM `User` u WHERE u.user_id = user_id_)
    THEN
		SET @s = 'User does not exist';
		SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @s;
        #RETURN
	ELSE 
		SELECT u.user_id, u.recommend_product FROM `User` u WHERE u.user_id = user_id_;
	END IF;
    COMMIT;
End$$
DELIMITER ;


CALL Get_Home_Recommend(1000005);