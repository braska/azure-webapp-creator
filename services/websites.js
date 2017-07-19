const MsRest = require('ms-rest-azure');
const webSiteManagement = require('azure-asm-website');
const config = require('../config');

let instance;

exports.getInstance = () => (
  instance ?
  Promise.resolve(instance) :
  new Promise((resolve, reject) => {
  MsRest.loginWithUsernamePassword(config.azure.user, config.azure.password, (err, credentials) => {
    if (err) {
      reject(err);
    } else {
      instance = webSiteManagement.createWebSiteManagementClient(credentials, config.azure.subscriptionId);
      resolve(instance);
    }
  });
}));
