# mdd

## Description
Ce projet est une application utilisant **Angular** pour son frontend et **Spring** pour le backend. Les utilisateurs peuvent consulter, créer et commenter des articles, modifier les informations concernant leur profil, et aussi gérer leurs abonnements à des thèmes.

## Prérequis
- Java 22.0.2
- Maven 3.9.9
- Node.js 18.20.4
- npm 10.7.0
- Angular CLI 14.1.3

## Installation
### Cloner le dépôt
```
git clone https://github.com/msjemenblc/mdd.git
cd mdd
```

### Configurer la base de données
Générez une nouvelle base de données, puis ajoutez le script présent dans le projet ```resources/sql/script.sql``` pour la création des tables.

### Installer les dépendances
- Installez celles du frontend avec ```npm install```
- Pour le backend, uilisez la commande ```mvn clean install```

### Lancer le projet
- Pour lancer le frontend : ```ng serve```
- Pour le backend : ```mvn spring-boot:run```

### Naviguer sur l'application
On utilisera le port 4200 pour le frontend, et 3001 pour le backend

Créez un identifiant à partir de la page register pour ensuite naviguer librement sur toute l'application