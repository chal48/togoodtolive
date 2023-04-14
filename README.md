# Comment lancer l'application ToGoodToLive
# Prérequis 
## Installation Docker Desktop
installer docker sur ca machine [lien d'installation](https://www.docker.com/)
## Ports
Avoir les deux ports suivant disponible sur votre poste : 8080 et 8000
> 8080 - phpmyadmin
> 8000 - application
## Etape 1
Cloner le répository
## Etape 2
à la racine du projet crée un fichier .env avec le contenue suivant :
```
APP_USER = "root"
APP_PASSWORD = "root"
APP_HOST = "db"
APP_DB = "togooddb"
```
## Etape 3
lancer docker desktop
## Etape 4
ouvrir un terminal et se possitionner dans le dossier du projet
## Etape 5
dans le terminal taper la commande : 
`docker-compose up -d`
## Etape 6
toujours dans le terminal taper la commande :
`docker exec -it svr /bin/bash`
## Etape 7
vous etes maintenant dans le terminal connecter au container srv (serveur node)
taper les commandes :
`npm i` puis `npm run start`
