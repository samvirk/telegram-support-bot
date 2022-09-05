param location string 
param dbName string
param adminLogin string
@secure()
param adminPassword string

resource postgresql 'Microsoft.DBforPostgreSQL/servers@2017-12-01' = {
  name: dbName
  location: location
  sku: {
    capacity: 1
    family: 'Gen5'
    name: 'B_Gen5_1'
    tier: 'Basic'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: { 
    infrastructureEncryption: 'Disabled'
    minimalTlsVersion: 'TLSEnforcementDisabled'
    publicNetworkAccess: 'Enabled'
    sslEnforcement: 'Disabled'
    storageProfile: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
      storageAutogrow: 'Enabled'
      storageMB: 10240
    }
    version: '11' 
    createMode: 'Default'
    administratorLogin: adminLogin
    administratorLoginPassword: adminPassword
  }
}

resource firewallRule 'Microsoft.DBforPostgreSQL/servers/firewallRules@2017-12-01' = {
  name: '${dbName}AllowAllWindowsAzureIps'
  parent: postgresql
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

output dbHost string = postgresql.properties.fullyQualifiedDomainName
