const MsRest = require('ms-rest-azure');
const webSiteManagementClient = require('azure-arm-website');
const config = require('../config');

let client;

let instance;

exports.getInstance = () => (
  instance ?
  Promise.resolve(instance) :
  new Promise((resolve, reject) => {
  MsRest.loginWithServicePrincipalSecret(config.azure.appId, config.azure.secret, config.azure.domain, (err, credentials) => {
    if (err) {
      reject(err);
    } else {
      client = new webSiteManagementClient(credentials, config.azure.subscriptionId);
      instance = {
        createWebSite(appname, planId) {
          return new Promise((resolve, reject) => {
            client.webApps.createOrUpdate(config.webapp.resourceGroup, appname, {
              location: config.webapp.location,
              serverFarmId: planId
            }, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
        },
        createHostingPlan(name) {
          return new Promise((resolve, reject) => {
            client.appServicePlans.createOrUpdateServerFarm(config.webapp.resourceGroup, name, {
              serverFarmWithRichSkuName: name,
              location: config.webapp.location,
              sku: config.webapp.sku
            }, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
        }
      };
      resolve(instance);
    }
  });
}));
