# Comment lancer l'application ToGoodToLive
# Prérequis 
## Installation Docker Desktop
installer docker sur sa machine [lien d'installation](https://www.docker.com/)
## Ports
Avoir les deux ports suivant disponibles sur votre poste : 8080 et 8000
> 8080 - phpmyadmin
> 8000 - application
## Etape 1
Cloner le répository
## Etape 2
à la racine du projet créer un fichier .env avec le contenu suivant :
```
APP_USER = "root"
APP_PASSWORD = "root"
APP_HOST = "db"
APP_DB = "togooddb"
```
## Etape 3
lancer docker desktop
## Etape 4
ouvrir un terminal et se positionner dans le dossier du projet
## Etape 5
dans le terminal taper la commande : 
`docker-compose up -d`
## Etape 6
sur votre navigateur allez à l'url localhost:8080. Connectez-vous avec id : root | mdp : root  
constater la base de donnée togooddb, allez sur celle-ci et importez un fichier, sélection le fichier `togooddb.sql` présent à la racine du projet
## Etape 7
toujours dans le terminal taper la commande :
`docker exec -it svr /bin/bash`
## Etape 8
vous êtes maintenant dans le terminal connecté au container srv (serveur node)
taper les commandes :
`npm i` puis `npm run start`
