const a = {
  service_provider: {
    name: "Domino Pizza",
    phone: "0337907047",
    address: {
      country_id: 0,
      city_id: 43,
      district_id: 13,
      address_line: "412, Hoàng Diệu, P3",
      sub_address_line: "31, Lê Trung Sơn, P1",
    },
    company_name: "AtlanticDT",
    company_address: "",
    representative: {
      name: "Nguyen Hai Son",
      email: "haison_ba@gmail.com",
      phone: "0941447621",
      sub_phone: "",
      id_card: {
        id_card_number: "4234189051201",
        date_of_issued: "2014-02-14",
        id_card_front: "mat_truoc.png",
        id_card_back: "mat_sau.png",
      },
      tax_code: "",
    },
    operating: [
      {
        open_time: "8:30",
        close_time: "20:45:59",
      },
      {
        open_time: "7:30",
        close_time: "12:00:59",
      },
    ],
    keyword: ["abc", "sieu ngon", "ga ran"],
    merchant_description: "Mon an sieu re chat luong",
    photo: {
      business_unit: { url: "hinh_chup_shop.jpeg" },
      cover: { url: "hinh_banner.jpeg" },
      facade: { url: "hinh_chup.png" },
    },
    category_id: ["C021414", "C214142"],
    menu_photo: "hinh_menu.jpg",
    bank_account: {},
  },
};

const b = {
  reply: {
    status: 1,
    update_time: 0,
    welcome_package: { payment_method: 3, fee: 1000000.0, type: 2 },
    restaurant_id: 983716,
    has_delivery: false,
    has_contract: false,
    restaurant_basic_info: {
      hotline: "0337907047",
      geo_address: "46/21 Lưu Quý Kỳ, Phường 10, Quận 8, TP. HCM",
      name: "King Kong - Lưu Qúy Kỳ",
      city_id: 217,
      district_id: 10,
      full_address: null,
      ward_id: 190,
      longitude: 106.6666274,
      street_id: 18095,
      address: "46/21",
      latitude: 10.7465459,
    },
    create_time: 1637368650,
    is_owned_delivery: false,
    has_nm_app: false,
    has_manager: false,
    id: 58110,
    is_agreed_tnc: true,
    registration_type: 3,
  },
  result: "success",
};

/*
Frontend:
url: tastie.vn/merchant-registration/service-info

tastie.vn/merchant-registration/58110/representative


- Fill up Form 1
- Right after Form 1 is submitted, Frontend calls api: 
'v1/api/registration/submit'
api returns a JSON object: 
{
	reply: {registration_id: 58110}
	result: "success"}
}


Form 1 - submit 
*/
