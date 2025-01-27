param location string = resourceGroup().location
param environmentName string
param containerRegistry string = 'samvirk'
param containerImage string
@secure()
param dbPassword string

var containerAppEnvironmentName = 'env-samvirk-${environmentName}'
var appServiceName = 'app-telegram-bot-${environmentName}'
var dbName = contains(environmentName, 'prod') ? 'db-telegram-bot-production' : 'db-telegram-bot-testing'
var dbLogin = 'samvirkadmin'

module db 'postgresql.bicep' = {
  name: dbName
  params: {
    dbName: dbName
    location: 'northeurope'
    adminLogin: dbLogin
    adminPassword: dbPassword
  }
}

module appService 'container-http.bicep' = {
  name: appServiceName
  params: {
    enableIngress: false
    isExternalIngress: false
    location: location
    environmentName: containerAppEnvironmentName
    containerImage: '${containerRegistry}.azurecr.io/${containerImage}'
    containerAppName: appServiceName
    enableDapr: false
    containerPort: 6006
    minReplicas: 1
    maxReplicas: 1
    containerRegistry: containerRegistry
    env: [
      { name: 'PGHOST', value: db.outputs.dbHost }
      { name: 'PGPORT', value: '5432' }
      { name: 'PGUSER', value: '${dbLogin}@${dbName}' }
      { name: 'PGPASSWORD', value: dbPassword }
      { name: 'PGDATABASE', value: 'postgres' }
    ]
  }
}
