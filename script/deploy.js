const tencentcloud = require('tencentcloud-sdk-nodejs')
const config = require('../config')

const ScfClient = tencentcloud.scf.v20180416.Client
const models = tencentcloud.scf.v20180416.Models

const Credential = tencentcloud.common.Credential
const ClientProfile = tencentcloud.common.ClientProfile
const HttpProfile = tencentcloud.common.HttpProfile

const { SecretId, SecretKey, GitUrl, Region } = config
let cred = new Credential(SecretId, SecretKey)
let httpProfile = new HttpProfile()
httpProfile.endpoint = 'scf.tencentcloudapi.com'
let clientProfile = new ClientProfile()
clientProfile.httpProfile = httpProfile
let client = new ScfClient(cred, Region, clientProfile)

let req = new models.CreateFunctionRequest()

let params = JSON.stringify({
  FunctionName: 'scf-node10-test-0',
  Code: {
    GitUrl,
    GitBranch: 'master',
    GitDirectory: 'src'
  },
  Runtime: 'Nodejs10.15',
  CodeSource: 'Git',
  Handler: 'index.main_handler',
  Description: 'SCF Node 10 测试函数'
})
req.from_json_string(params)

client.CreateFunction(req, function(errMsg, response) {
  if (errMsg) {
    console.log(errMsg)
    return
  }

  console.log(response.to_json_string())
})
