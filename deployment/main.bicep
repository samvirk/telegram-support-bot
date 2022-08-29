param location string = resourceGroup().location
param environmentName string
param containerRegistry string = 'samvirk'
param containerImage string

var containerAppEnvironmentName = 'env-samvirk-${environmentName}'
var appServiceName = 'app-telegram-bot-${environmentName}'

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
  }
}


