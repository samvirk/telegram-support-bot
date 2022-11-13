$environment = $args[0]
$resourceGroup = 'rg-samvirk-' + $environment
$tag = (Get-Date).ToString("yyyy-MM-dd-HHmmss")
Set-Location ..
docker build . -t samvirk.azurecr.io/app-telegram-bot:$tag -f ./Dockerfile && docker push samvirk.azurecr.io/app-telegram-bot:$tag

az group create -n $resourceGroup -l westeurope

az deployment group create -g $resourceGroup -f ./deployment/main-bot.bicep -p environmentName=$environment -p containerImage=app-telegram-bot:$tag