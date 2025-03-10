const city = [
    {
        "name": "An Giang",
        "slug": "an-giang",
        "type": "tinh",
        "name_with_type": "Tỉnh An Giang",
        "code": "89"
    },
    {
        "name": "Bà Rịa - Vũng Tàu",
        "slug": "ba-ria-vung-tau",
        "type": "tinh",
        "name_with_type": "Tỉnh Bà Rịa - Vũng Tàu",
        "code": "77"
    },
    {
        "name": "Bình Dương",
        "slug": "binh-duong",
        "type": "tinh",
        "name_with_type": "Tỉnh Bình Dương",
        "code": "74"
    },
    {
        "name": "Bình Phước",
        "slug": "binh-phuoc",
        "type": "tinh",
        "name_with_type": "Tỉnh Bình Phước",
        "code": "70"
    },
    {
        "name": "Bình Thuận",
        "slug": "binh-thuan",
        "type": "tinh",
        "name_with_type": "Tỉnh Bình Thuận",
        "code": "60"
    },
    {
        "name": "Bình Định",
        "slug": "binh-dinh",
        "type": "tinh",
        "name_with_type": "Tỉnh Bình Định",
        "code": "52"
    },
    {
        "name": "Bạc Liêu",
        "slug": "bac-lieu",
        "type": "tinh",
        "name_with_type": "Tỉnh Bạc Liêu",
        "code": "95"
    },
    {
        "name": "Bắc Giang",
        "slug": "bac-giang",
        "type": "tinh",
        "name_with_type": "Tỉnh Bắc Giang",
        "code": "24"
    },
    {
        "name": "Bắc Kạn",
        "slug": "bac-kan",
        "type": "tinh",
        "name_with_type": "Tỉnh Bắc Kạn",
        "code": "06"
    },
    {
        "name": "Bắc Ninh",
        "slug": "bac-ninh",
        "type": "tinh",
        "name_with_type": "Tỉnh Bắc Ninh",
        "code": "27"
    },
    {
        "name": "Bến Tre",
        "slug": "ben-tre",
        "type": "tinh",
        "name_with_type": "Tỉnh Bến Tre",
        "code": "83"
    },
    {
        "name": "Cao Bằng",
        "slug": "cao-bang",
        "type": "tinh",
        "name_with_type": "Tỉnh Cao Bằng",
        "code": "04"
    },
    {
        "name": "Cà Mau",
        "slug": "ca-mau",
        "type": "tinh",
        "name_with_type": "Tỉnh Cà Mau",
        "code": "96"
    },
    {
        "name": "Cần Thơ",
        "slug": "can-tho",
        "type": "thanh-pho",
        "name_with_type": "Thành phố Cần Thơ",
        "code": "92"
    },
    {
        "name": "Gia Lai",
        "slug": "gia-lai",
        "type": "tinh",
        "name_with_type": "Tỉnh Gia Lai",
        "code": "64"
    },
    {
        "name": "Hoà Bình",
        "slug": "hoa-binh",
        "type": "tinh",
        "name_with_type": "Tỉnh Hoà Bình",
        "code": "17"
    },
    {
        "name": "Hà Giang",
        "slug": "ha-giang",
        "type": "tinh",
        "name_with_type": "Tỉnh Hà Giang",
        "code": "02"
    },
    {
        "name": "Hà Nam",
        "slug": "ha-nam",
        "type": "tinh",
        "name_with_type": "Tỉnh Hà Nam",
        "code": "35"
    },
    {
        "name": "Hà Nội",
        "slug": "ha-noi",
        "type": "thanh-pho",
        "name_with_type": "Thành phố Hà Nội",
        "code": "01"
    },
    {
        "name": "Hà Tĩnh",
        "slug": "ha-tinh",
        "type": "tinh",
        "name_with_type": "Tỉnh Hà Tĩnh",
        "code": "42"
    },
    {
        "name": "Hưng Yên",
        "slug": "hung-yen",
        "type": "tinh",
        "name_with_type": "Tỉnh Hưng Yên",
        "code": "33"
    },
    {
        "name": "Hải Dương",
        "slug": "hai-duong",
        "type": "tinh",
        "name_with_type": "Tỉnh Hải Dương",
        "code": "30"
    },
    {
        "name": "Hải Phòng",
        "slug": "hai-phong",
        "type": "thanh-pho",
        "name_with_type": "Thành phố Hải Phòng",
        "code": "31"
    },
    {
        "name": "Hậu Giang",
        "slug": "hau-giang",
        "type": "tinh",
        "name_with_type": "Tỉnh Hậu Giang",
        "code": "93"
    },
    {
        "name": "Hồ Chí Minh",
        "slug": "ho-chi-minh",
        "type": "thanh-pho",
        "name_with_type": "Thành phố Hồ Chí Minh",
        "code": "79"
    },
    {
        "name": "Khánh Hòa",
        "slug": "khanh-hoa",
        "type": "tinh",
        "name_with_type": "Tỉnh Khánh Hòa",
        "code": "56"
    },
    {
        "name": "Kiên Giang",
        "slug": "kien-giang",
        "type": "tinh",
        "name_with_type": "Tỉnh Kiên Giang",
        "code": "91"
    },
    {
        "name": "Kon Tum",
        "slug": "kon-tum",
        "type": "tinh",
        "name_with_type": "Tỉnh Kon Tum",
        "code": "62"
    },
    {
        "name": "Lai Châu",
        "slug": "lai-chau",
        "type": "tinh",
        "name_with_type": "Tỉnh Lai Châu",
        "code": "12"
    },
    {
        "name": "Long An",
        "slug": "long-an",
        "type": "tinh",
        "name_with_type": "Tỉnh Long An",
        "code": "80"
    },
    {
        "name": "Lào Cai",
        "slug": "lao-cai",
        "type": "tinh",
        "name_with_type": "Tỉnh Lào Cai",
        "code": "10"
    },
    {
        "name": "Lâm Đồng",
        "slug": "lam-dong",
        "type": "tinh",
        "name_with_type": "Tỉnh Lâm Đồng",
        "code": "68"
    },
    {
        "name": "Lạng Sơn",
        "slug": "lang-son",
        "type": "tinh",
        "name_with_type": "Tỉnh Lạng Sơn",
        "code": "20"
    },
    {
        "name": "Nam Định",
        "slug": "nam-dinh",
        "type": "tinh",
        "name_with_type": "Tỉnh Nam Định",
        "code": "36"
    },
    {
        "name": "Nghệ An",
        "slug": "nghe-an",
        "type": "tinh",
        "name_with_type": "Tỉnh Nghệ An",
        "code": "40"
    },
    {
        "name": "Ninh Bình",
        "slug": "ninh-binh",
        "type": "tinh",
        "name_with_type": "Tỉnh Ninh Bình",
        "code": "37"
    },
    {
        "name": "Ninh Thuận",
        "slug": "ninh-thuan",
        "type": "tinh",
        "name_with_type": "Tỉnh Ninh Thuận",
        "code": "58"
    },
    {
        "name": "Phú Thọ",
        "slug": "phu-tho",
        "type": "tinh",
        "name_with_type": "Tỉnh Phú Thọ",
        "code": "25"
    },
    {
        "name": "Phú Yên",
        "slug": "phu-yen",
        "type": "tinh",
        "name_with_type": "Tỉnh Phú Yên",
        "code": "54"
    },
    {
        "name": "Quảng Bình",
        "slug": "quang-binh",
        "type": "tinh",
        "name_with_type": "Tỉnh Quảng Bình",
        "code": "44"
    },
    {
        "name": "Quảng Nam",
        "slug": "quang-nam",
        "type": "tinh",
        "name_with_type": "Tỉnh Quảng Nam",
        "code": "49"
    },
    {
        "name": "Quảng Ngãi",
        "slug": "quang-ngai",
        "type": "tinh",
        "name_with_type": "Tỉnh Quảng Ngãi",
        "code": "51"
    },
    {
        "name": "Quảng Ninh",
        "slug": "quang-ninh",
        "type": "tinh",
        "name_with_type": "Tỉnh Quảng Ninh",
        "code": "22"
    },
    {
        "name": "Quảng Trị",
        "slug": "quang-tri",
        "type": "tinh",
        "name_with_type": "Tỉnh Quảng Trị",
        "code": "45"
    },
    {
        "name": "Sóc Trăng",
        "slug": "soc-trang",
        "type": "tinh",
        "name_with_type": "Tỉnh Sóc Trăng",
        "code": "94"
    },
    {
        "name": "Sơn La",
        "slug": "son-la",
        "type": "tinh",
        "name_with_type": "Tỉnh Sơn La",
        "code": "14"
    },
    {
        "name": "Thanh Hóa",
        "slug": "thanh-hoa",
        "type": "tinh",
        "name_with_type": "Tỉnh Thanh Hóa",
        "code": "38"
    },
    {
        "name": "Thái Bình",
        "slug": "thai-binh",
        "type": "tinh",
        "name_with_type": "Tỉnh Thái Bình",
        "code": "34"
    },
    {
        "name": "Thái Nguyên",
        "slug": "thai-nguyen",
        "type": "tinh",
        "name_with_type": "Tỉnh Thái Nguyên",
        "code": "19"
    },
    {
        "name": "Thừa Thiên Huế",
        "slug": "thua-thien-hue",
        "type": "tinh",
        "name_with_type": "Tỉnh Thừa Thiên Huế",
        "code": "46"
    },
    {
        "name": "Tiền Giang",
        "slug": "tien-giang",
        "type": "tinh",
        "name_with_type": "Tỉnh Tiền Giang",
        "code": "82"
    },
    {
        "name": "Trà Vinh",
        "slug": "tra-vinh",
        "type": "tinh",
        "name_with_type": "Tỉnh Trà Vinh",
        "code": "84"
    },
    {
        "name": "Tuyên Quang",
        "slug": "tuyen-quang",
        "type": "tinh",
        "name_with_type": "Tỉnh Tuyên Quang",
        "code": "08"
    },
    {
        "name": "Tây Ninh",
        "slug": "tay-ninh",
        "type": "tinh",
        "name_with_type": "Tỉnh Tây Ninh",
        "code": "72"
    },
    {
        "name": "Vĩnh Long",
        "slug": "vinh-long",
        "type": "tinh",
        "name_with_type": "Tỉnh Vĩnh Long",
        "code": "86"
    },
    {
        "name": "Vĩnh Phúc",
        "slug": "vinh-phuc",
        "type": "tinh",
        "name_with_type": "Tỉnh Vĩnh Phúc",
        "code": "26"
    },
    {
        "name": "Yên Bái",
        "slug": "yen-bai",
        "type": "tinh",
        "name_with_type": "Tỉnh Yên Bái",
        "code": "15"
    },
    {
        "name": "Điện Biên",
        "slug": "dien-bien",
        "type": "tinh",
        "name_with_type": "Tỉnh Điện Biên",
        "code": "11"
    },
    {
        "name": "Đà Nẵng",
        "slug": "da-nang",
        "type": "thanh-pho",
        "name_with_type": "Thành phố Đà Nẵng",
        "code": "48"
    },
    {
        "name": "Đắk Lắk",
        "slug": "dak-lak",
        "type": "tinh",
        "name_with_type": "Tỉnh Đắk Lắk",
        "code": "66"
    },
    {
        "name": "Đắk Nông",
        "slug": "dak-nong",
        "type": "tinh",
        "name_with_type": "Tỉnh Đắk Nông",
        "code": "67"
    },
    {
        "name": "Đồng Nai",
        "slug": "dong-nai",
        "type": "tinh",
        "name_with_type": "Tỉnh Đồng Nai",
        "code": "75"
    },
    {
        "name": "Đồng Tháp",
        "slug": "dong-thap",
        "type": "tinh",
        "name_with_type": "Tỉnh Đồng Tháp",
        "code": "87"
    }
]
export default city;