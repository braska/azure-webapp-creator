const MsRest = require('ms-rest-azure');
const ResourceManagementClient = require('azure-arm-resource').ResourceManagementClient;
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
      client = new ResourceManagementClient(credentials, config.azure.subscriptionId);
      instance = {
        loadTemplateAndDeploy(appname) {
          return new Promise((resolve, reject) => {
            try {
              const templateFilePath = path.join(__dirname, "..", "deployment_template.json");
              const template = JSON.parse(fs.readFileSync(templateFilePath, 'utf8'));
            } catch (ex) {
              reject(ex);
              return;
            }

            const parameters = {
              "siteName": {
                "value": appname
              }
            };

            const deploymentParameters = {
              "properties": {
                "parameters": parameters,
                "template": template,
                "mode": "Incremental"
              }
            };

            resourceClient.deployments.createOrUpdate(config.webapp.resourceGroup, appname, deploymentParameters, (err, result) => {
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
