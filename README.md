
# TP API Node.js TypeScript — Rim SARI

Création d'une API complète avec **Express**, **TypeScript** et **SQLite**.

---
## Sommaire

1. [Installation](#1-installation-du-projet)
2. [Structure du projet](#2-structure-du-projet)
3. [Base de données SQLite](#3-base-de-données-sqlite)
4. [Fonctionnalités de lAPI](4-fonctionnalités-de-lapi)
5. [Bonus réalisés](#5-bonus-réalisés)
6. [Tests complets](#6-tests)
   - [Test du serveur](#61-tester-que-le-serveur-fonctionne)
   - [GET /users](#62-get--récupérer-tous-les-utilisateurs)
   - [GET /usersid](#63-post--ajouter-un-utilisateur)
   - [POST /users](#64-get--récupérer-un-utilisateur-par-id)
   - [PUT /usersid](#65-put--modifier-un-utilisateur)
   - [DELETE /usersid](#66-delete--supprimer-un-utilisateur)
   - [Tests derreurs](#67-tester-les-erreurs)
7. [Auteur](#7-auteur)

---

# 1. Installation du projet

###  Prérequis

* Node.js 
* npm
* VS Code
* SQLite est déjà intégré via `better-sqlite3`

###  Installation des dépendances

```bash
npm install
```

### --> Démarrer l’API en mode développement

```bash
npm run dev
```

Le serveur démarre sur :

```
http://localhost:3000
```

---

# 2. Structure du projet

```
td-api-express-typescript/
│
├── src/
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── database/
│   │   └── db.ts
│   └── index.ts
│
├── database.db
├── package.json
├── tsconfig.json
├── nodemon.json
└── .env
```

---

# 3. Base de données SQLite

Automatiquement créée au lancement :

```
database.db
```

Table générée :

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);
```

---

# 4. Fonctionnalités de l’API

##  Route GET /users

Récupère la liste des utilisateurs depuis SQLite.

---

##  Route GET /users/:id

Récupère un utilisateur par son ID.

---

##  Route POST /users

Ajoute un utilisateur avec :

* Validation du nom et email
* Validation de format d'email
* Vérification des doublons

---

##  Route PUT /users/:id

Met à jour un utilisateur (partiellement ou entièrement).
Utilise `COALESCE` → garde les valeurs inchangées.

---

##  Route DELETE /users/:id

Supprime un utilisateur par ID.

---

# 5. BONUS réalisés

| Bonus                                         | 
| ----------------------------------------------| 
| Validation email                              | 
| Vérification doublons                         | 
| CRUD COMPLET                                  |
| Persistence SQLite                            | 
| API testée avec Thunder Client & PowerShell   | 


---

# 6. Tests 

## 6.1 Tester que le serveur fonctionne

### PowerShell :

```powershell
curl.exe http://localhost:3000/
```

<img width="627" height="142" alt="image" src="https://github.com/user-attachments/assets/86df06f3-4f93-4b89-9e38-6d96dfd098f8" />

<img width="867" height="86" alt="image" src="https://github.com/user-attachments/assets/cc463b44-8c33-4cb8-b392-ba60d2ae4265" />


---

# 6.2 GET — Récupérer tous les utilisateurs

```powershell
curl.exe http://localhost:3000/users
```
avant ajout d'utilisateurs :

<img width="850" height="83" alt="image" src="https://github.com/user-attachments/assets/0055f297-2ab5-4c18-b27f-fb6b31b8b13f" />

après ajout d'utilisateurs :

<img width="866" height="223" alt="image" src="https://github.com/user-attachments/assets/318db9ab-e894-41e9-8f68-c0e3c480e73c" />

### Thunder Client:
avant ajout :

<img width="673" height="137" alt="image" src="https://github.com/user-attachments/assets/38817fd8-5620-45e0-9b06-7ad89589b5b7" />

après ajout :

<img width="1367" height="701" alt="image" src="https://github.com/user-attachments/assets/2a0c6919-6e71-4c64-8afa-4df1f0b46e06" />

---

# 6.3 POST — Ajouter un utilisateur

### PowerShell :

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" `
-Method POST `
-Headers @{ "Content-Type" = "application/json" } `
-Body (@{
    name = "Jean"
    email = "jean@email.com"
} | ConvertTo-Json)
```

<img width="971" height="417" alt="image" src="https://github.com/user-attachments/assets/72dca480-7505-42e9-84cc-5b28db3a1d14" />


### Thunder Client:

<img width="945" height="249" alt="image" src="https://github.com/user-attachments/assets/1c2370f3-fb51-4118-8a8f-dc7a539ae277" />

---

# 6.4 GET — Récupérer un utilisateur par ID

```powershell
curl.exe http://localhost:3000/users/1
```

<img width="864" height="90" alt="image" src="https://github.com/user-attachments/assets/80acc442-2ff1-4604-acd1-665b8e245fa6" />


### Thunder Client:
<img width="1407" height="368" alt="image" src="https://github.com/user-attachments/assets/9d08fb8d-9136-458e-99ae-d401c664f225" />

---

# 6.5 PUT — Modifier un utilisateur

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/1" `
-Method PUT `
-Headers @{ "Content-Type" = "application/json" } `
-Body (@{
    name = "Rim"
    email = "rim@uphf.fr"
} | ConvertTo-Json)
```
<img width="871" height="336" alt="image" src="https://github.com/user-attachments/assets/9d1297d9-aec3-40af-bcfc-b54c0c94ec58" />

### Thunder Client:

<img width="945" height="286" alt="image" src="https://github.com/user-attachments/assets/3ec11c04-0a73-40f2-b68b-30322761fead" />

---

# 6.6 DELETE — Supprimer un utilisateur

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method DELETE
```

<img width="870" height="174" alt="image" src="https://github.com/user-attachments/assets/de30a2d3-d16b-4046-9ba3-cb6ffafdca86" />

<img width="874" height="113" alt="image" src="https://github.com/user-attachments/assets/a622c8b5-49ef-4a7b-9b5a-a566dd4a0a3e" />


### Thunder Client:

<img width="945" height="162" alt="image" src="https://github.com/user-attachments/assets/b8b78c28-1eb4-428f-b948-7f7d9354e64b" />


---

# 6.7 Tester les erreurs 
# Validité de l'email et Présence de Doublons et Suppression d'utilisateur inexistant

## Erreur email invalide

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" `
-Method POST `
-Headers @{ "Content-Type" = "application/json" } `
-Body (@{
    name = "BadUser"
    email = "bademail"
} | ConvertTo-Json)
```

<img width="867" height="242" alt="image" src="https://github.com/user-attachments/assets/2a8b9042-b785-48f1-b5fe-0b001c94448f" />

### Thunder Client:

<img width="1382" height="406" alt="image" src="https://github.com/user-attachments/assets/754bb326-f93a-4937-977b-985a94191087" />


## Doublon email

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" `
-Method POST `
-Headers @{ "Content-Type" = "application/json" } `
-Body (@{
    name = "Jean"
    email = "jean@email.com"
} | ConvertTo-Json)
```

<img width="859" height="246" alt="image" src="https://github.com/user-attachments/assets/b88dbb7b-7a21-418c-acf3-72628317a0e8" />


### Thunder Client:

<img width="1396" height="387" alt="image" src="https://github.com/user-attachments/assets/699904d9-79bb-433d-9c8b-522b74be50b6" />


## Supprimer un utilisateur inexistant

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/9999" -Method DELETE
```

<img width="871" height="88" alt="image" src="https://github.com/user-attachments/assets/8a008967-6384-49fc-b3b7-930ffd282e76" />

### Thunder Client:

<img width="1396" height="222" alt="image" src="https://github.com/user-attachments/assets/def4faaa-8969-4549-81c2-0bc87072b30e" />


---

# 7. Auteur

Ce projet a été réalisé par **Rim Sari**, Étudiante en informatique.

---

