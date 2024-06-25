//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//https://github.com/momo-wallet/payment/blob/master/nodejs/MoMo.js
//parameters

const {v1:uuid} = require('uuid'); 
const https = require('https');
const UserAction = require('./UserAction');
var partnerCode = "MOMO";
var accessKey = "F8BBA842ECF85";
var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var requestId = partnerCode + new Date().getTime();

var redirectUrl = "https://momo.vn/return";
var ipnUrl = "https://callback.url/notify";
// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";

var requestType = "captureWallet"
var extraData = ""; //pass empty value if your merchant does not have stores



const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment


// APP INFO
const config = {
    appid: "553",
    key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
    key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
  };
  
  const embeddata = {
    merchantinfo: "embeddata123"
  };



class PaymentModels{
    
    static async paymentWithMomo (data){
        try {
            var urlPayment = ''
            const {orderInfo, amount} = data
            var order_code = uuid()
         
            //before sign HMAC SHA256 with format
            //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
       
            var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + order_code+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
            //puts raw signature
            // console.log("--------------------RAW SIGNATURE----------------")
            // console.log(rawSignature)
            
            //signature
            const crypto = require('crypto');
            var signature = crypto.createHmac('sha256', secretkey)
                .update(rawSignature)
                .digest('hex');
            // console.log("--------------------SIGNATURE----------------")
            // console.log(signature)

            //json object send to MoMo endpoint
            const requestBody = JSON.stringify({
                partnerCode : partnerCode,
                accessKey : accessKey,
                requestId : requestId,
                amount : amount,
                orderId : order_code,
                orderInfo : orderInfo,
                redirectUrl : redirectUrl,
                ipnUrl : ipnUrl,
                extraData : extraData,
                requestType : requestType,
                signature : signature,
                lang: 'en'
            });

          
            
            //Create the HTTPS objects
            
            const options = {
                hostname: 'test-payment.momo.vn',
                port: 443,
                path: '/v2/gateway/api/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
                }


                
                let p = new Promise((resolve, reject) => {

               
                    //Send the request and get the response
                    const req =  https.request(options, res =>  {
                    console.log(`Status: ${res.statusCode}`);
                    console.log(`Headers: ${JSON.stringify(res.headers)}`);
                    res.setEncoding('utf8');
                     res.on('data', (body) => {
                        console.log('Body: ');
                        console.log(body);
                        console.log('payUrl: ');
                        console.log(JSON.parse(body).payUrl);
                        urlPayment = JSON.parse(body).payUrl ? JSON.parse(body).payUrl : ''
                       
                        
                        });
                        
                        
                        res.on('end', () => {
                            console.log('No more data in response.');
                       
                            resolve(urlPayment);
                            
                    //     console.log(urlPayment)
                        
                        });
                    })
    
                    req.on('error', (e) => {
                        console.log(`problem with request: ${e.message}`);
                        reject(e)
                    });
                    // write data to request body
                    console.log("Sending....")
                    req.write(requestBody);
                    req.end();
                });
                    
            
            
            
            return await p;            

            
            
        } catch (error) {
                return ''
                        
            }
    }

    static async paymentWithZalo(body){
        try {
            const {customer_id, customer_name, amount, description} = body

            const items = [{
                itemid: customer_id,
                itemname: customer_name,
                itemprice: 198400,
                itemquantity: 1
              }];
              
              const order = {
                appid: config.appid, 
                apptransid: `${moment().format('YYMMDD')}_${uuid()}`, // mã giao dich có định dạng yyMMdd_xxxx
                appuser: "demo", 
                apptime: Date.now(), // miliseconds
                item: JSON.stringify(items), 
                embeddata: JSON.stringify(embeddata), 
                amount, 
                description,
                bankcode: "zalopayapp", 
              };
              
              // appid|apptransid|appuser|amount|apptime|embeddata|item
              const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
              order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
              
              const b64Oder = Buffer.from(JSON.stringify(order)).toString('base64')
              
              console.log("https://sbgateway.zalopay.vn/openinapp?order=" + encodeURIComponent(b64Oder)
              )
              return  await "https://sbgateway.zalopay.vn/openinapp?order=" + encodeURIComponent(b64Oder)

        } catch (error) {
            return ''
        }
    }
    
}


module.exports = PaymentModels