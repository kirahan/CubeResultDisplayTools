module.exports = (phone) =>{
  return async(req,res,next) =>{
    // 存在参数
    let userphone
    if(phone){
       userphone = phone
    }else{
       userphone = req.body.phone
    }

    const Core = require('@alicloud/pop-core');
    const assert = require('http-assert')
    var client = new Core({
          accessKeyId: 'LTAI4FtxxBqFcRVDQ85TgbTV',
          accessKeySecret: 'WtYcNJKwLOuQbN8orKDYRNAIFc3ZY4',
          endpoint: 'https://dysmsapi.aliyuncs.com',
          apiVersion: '2017-05-25',
        });
    //  生成一个随机验证码code  
    String.prototype.times = function(n) { return (new Array(n+1)).join(this)}
    let code = Math.floor(Math.random()*1000000)  
    code = '0'.times(6-String(code).length) + String(code)
    var params = {
      "RegionId": "cn-hangzhou",
      "PhoneNumbers": userphone,
      "SignName": "CubeNode",
      "TemplateCode": "SMS_175051014",
      "TemplateParam": `{"code":${code}}`
    }
        
    var requestOption = {
      method: 'POST'
    };

        
    client.request('SendSms', params, requestOption).then((result) => {
        // console.log(JSON.stringify(result));
        // result数据格式
        // {"Message":"OK","RequestId":"81E8736D-3B03-49BA-878E-4E510F0C385A","BizId":"496112870375361879^0","Code":"OK"}
        req.smsali = JSON.stringify(result)
        req.smscode = code
        req.smsphone = userphone
        next()
      }, (ex) => {
        console.log(ex.data.Message);
        assert(ex.data.Code === 'isv.MOBILE_NUMBER_ILLEGAL',401,'无效号码')
        assert(ex.data.Code != 'isv.MOBILE_NUMBER_ILLEGAL',401,ex.data.Message)
        next()
      })
    
      
      }
    

    
      
      

}