import scrape_restaurants_info
import pandas as pd
import numpy as np


if __name__ == '__main__':

    num = 5 # số lượng restaurant crawled, có thể đổi thành 10, 20 để test thử
    # 5  restaurant crawled chạy trong khoảng từ 4-5 phút
    # 10 thì khoảng 9-10'
    # thời gian chạy có thể lâu hơn do tốc độ mạng và tốc độ xử lý máy nha các bạn:)

    scrape_restaurants_info.main(num)