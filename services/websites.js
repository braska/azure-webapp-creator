const path = require('path');
const fs = require('fs');
const MsRest = require('ms-rest-azure');
const ResourceManagementClient = require('azure-arm-resource').ResourceManagementClient;
const config = require('../config');
const template = require('../deployment_template.json');

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
      client = new ResourceManagementClient(credentials, config.azure.subscriptionId);
      instance = {
        loadTemplateAndDeploy(appname) {
          return new Promise((resolve, reject) => {
            const parameters = {
              "siteName": {
                "value": appname
              },
              "planId": {
                "value": config.webapp.planId
              },
              "repoURL": {
                "value": config.webapp.repoURL
              },
              "zoneName": {
                "value": config.webapp.zoneName
              }
            };

            const deploymentParameters = {
              "properties": {
                "parameters": parameters,
                "template": template,
                "mode": "Incremental"
              }
            };

            client.deployments.createOrUpdate(config.webapp.resourceGroup, appname, deploymentParameters, (err, result) => {
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
