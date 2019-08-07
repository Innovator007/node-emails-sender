module.exports = {
    generate: function(user){
        return `
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>  
            </head>
            <body>
              <div>
                <p>Hi ${user.name},</p>
                <p>This is regarding your registration in our hacakthon with email : ${user.email}.</p>
                <p>We are pleased to inform you that you have been registered succesfully!</p>
                <p>The timings of the hackathon are as given below:-</p>
              </div>
            </body>
            </html>
        `
    }
}