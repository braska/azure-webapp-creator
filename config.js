module.exports = {
  azure: {
    appId: process.env.AZURE_APP_ID,
    secret: process.env.AZURE_SECRET,
    domain: process.env.AZURE_DIRECTORY_ID,
    subscriptionId: process.env.AZURE_SUBSCRIPTION_ID
  },
  webapp: {
    resourceGroup: process.env.RESOURCE_GROUP,
    sku: {
      name: 'S1',
      capacity: 1,
      tier: 'Standard'
    },
    planId: process.env.PLAN_ID,
    repoURL: process.env.REPO_URL,
    zoneName: process.env.ZONE_NAME
  }
};
