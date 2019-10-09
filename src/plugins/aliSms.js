const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4FtxxBqFcRVDQ85TgbTV',
  accessKeySecret: 'WtYcNJKwLOuQbN8orKDYRNAIFc3ZY4',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

var params = {
  "RegionId": "cn-hangzhou",
  "PhoneNumbers": "18827091015",
  "SignName": "CubeNode",
  "TemplateCode": "SMS_175051014"
}

var requestOption = {
  method: 'POST'
};

client.request('SendSms', params, requestOption).then((result) => {
  console.log(JSON.stringify(result));
}, (ex) => {
  console.log(ex);
})
