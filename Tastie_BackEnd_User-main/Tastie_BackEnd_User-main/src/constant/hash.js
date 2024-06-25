// import library crypto 

var crypto = require('crypto')
var algorithm = "aes-256-cbc"; 
// generate 16 bytes of random data
var initvector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
var securitykey = crypto.randomBytes(32);
// the cipher function

// the decipher function


const encoded_Data = content => {
    try {
        var cipher = crypto.createCipheriv(algorithm, securitykey, initvector)
        var encrypted_data = cipher.update(content, "utf-8", "hex");
        encrypted_data += cipher.final("hex");

        return encrypted_data;
    } catch (error) {
        console.log(error);
        return null;
    }
    
    
}


const decoded_Data = content => {
    try {
       
        var decipher = crypto.createDecipheriv(algorithm, securitykey, initvector);
     
        var decrypted_data = decipher.update(content, "hex", "utf-8");
        decrypted_data += decipher.final("utf8");
        
        return decrypted_data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    decoded_Data,
    encoded_Data
}