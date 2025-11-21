
# TP API Node.js TypeScript — Rim SARI

API REST complète avec **Express**, **TypeScript** et **SQLite**.

---

# 1. Installation du projet

### ✔️ Prérequis

* Node.js 
* npm
* VS Code
* SQLite est déjà intégré via `better-sqlite3`

### ✔️ Installation des dépendances

```bash
npm install
```

### ✔️ Démarrer l’API en mode développement

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

## ✔️ Route GET /users

Récupère la liste des utilisateurs depuis SQLite.

---

## ✔️ Route GET /users/:id

Récupère un utilisateur par son ID.

---

## ✔️ Route POST /users

Ajoute un utilisateur avec :

* Validation du nom et email
* Validation de format d'email
* Vérification des doublons

---

## ✔️ Route PUT /users/:id

Met à jour un utilisateur (partiellement ou entièrement).
Utilise `COALESCE` → garde les valeurs inchangées.

---

## ✔️ Route DELETE /users/:id

Supprime un utilisateur par ID.

---

# 5. BONUS réalisés

| Bonus                                         | 
| ----------------------------------------------| 
| Validation email                              | 
| Vérification doublons                         | 
| CRUD COMPLET                                  |
| Persistence SQLite                            | 
| Route GET /users/:id                          | 
| API testée avec Thunder Client & PowerShell   | 


---

# 6. Tests 

## 6.1 Tester que le serveur fonctionne

### PowerShell :

```powershell
curl.exe http://localhost:3000/
```

---

# 6.2 GET — Récupérer tous les utilisateurs

```powershell
curl.exe http://localhost:3000/users
```

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

---

# 6.4 GET — Récupérer un utilisateur par ID

```powershell
curl.exe http://localhost:3000/users/1
```

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

---

# 6.6 DELETE — Supprimer un utilisateur

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method DELETE
```

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

## Supprimer un utilisateur inexistant

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/9999" -Method DELETE
```

---

# 7. Auteur



---

