import requests
import tensorflow as tf
import numpy as np
import os

from mysql.connector import connect
from mysql.connector import Error
from tensorflow.keras.models import load_model
from io import BytesIO
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array

import warnings
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
tf.get_logger().setLevel('INFO')
tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR) 


img_width, img_height = 299, 299

def connect_db():
    user_name = "doadmin"
    pwd = "AVNS_Fy-EpVsCb2lPBuwtaBI" 
    server = "db-mysql-sgp1-84863-do-user-12377534-0.b.db.ondigitalocean.com"

    # server = 'private-tastie-do-user-11494132-0.b.db.ondigitalocean.com'
    # pwd = 'AVNS_dIQZdxGNQnKqj_q'
    db = "Tastie"
    conn = connect(host=server, user=user_name, password=pwd, database=db, port=25060)
    cur = conn.cursor(buffered=True)
    return conn, cur

def close_connection(cur, conn):
    cur.close()
    conn.close()
    
def fetch_all_data_product():
    conn, cur = connect_db()
    sql = 'SELECT product_id, provider_id, product_image, product_status, update_at FROM Tastie.Product WHERE product_status = 1 AND update_at >= DATE_SUB(DATE(NOW()), INTERVAL 10 DAY) AND product_image IS NOT NULL'
    try:
        cur.execute(sql)
        rows = cur.fetchall()
    except Error as error:
        conn.rollback()
        print("Failed to insert into MySQL table {}".format(error))
    finally:
        cur.close()
        conn.close()
    return rows
    
    
def update_product_status(data_list):
    conn, cur = connect_db()
    sql = """UPDATE Product SET product_status = %(product_status_)s WHERE product_id = %(product_id_)s AND update_at = %(update_at_)s"""
    try:
        cur.executemany(sql, data_list)
        conn.commit()
        print('Update Successfully')
    except Error as error:
        conn.rollback()
        print("Failed to insert into MySQL table {}".format(error))
    finally:
        cur.close()
        conn.close()
        
        
def show_result(path, model, img_size):

    response = requests.get(path)
    img_bytes = BytesIO(response.content)
    test_image = Image.open(img_bytes)
    # display(test_image)

    test_image = test_image.convert('RGB')
    test_image = test_image.resize(img_size, Image.NEAREST)

    test_image = img_to_array(test_image)

    # print(test_image.shape)
    test_image = test_image/255
    test_image = np.expand_dims(test_image, axis = 0)
    # print(test_image.shape)
    result = model.predict(test_image)
    result = np.matrix.round(result, 4)
    # print(result)

    #training_set.class_indices
    if result[0][0] > result[0][1]: # 'Food'
        prediction = 1

    else: # Non Food
        prediction = 5
    return prediction
    

if __name__ == "__main__": 
    inception_model = load_model('./model/food_non_food_Inception_V3.h5')
    data = fetch_all_data_product()
    # for i in data:
    #     if i[2] == None:
    #         data.remove(i)
    result_list = []
    for i in range(len(data)):
        status = show_result(data[i][2], inception_model, (img_width, img_height))
        result_list.append({'product_status_' : status, 'product_id_' : data[i][0], 'update_at_':str(data[i][4])})

    update_product_status(result_list)