import { Request, Response } from "express";
import db from "../database/db";

/**
 * GET /users
 * Récupère tous les utilisateurs depuis SQLite
 */
export const getUsers = (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json({ users });
};

/**
 * POST /users
 * Ajoute un utilisateur dans SQLite
 */
export const addUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  // Vérifier que les données sont présentes
  if (!name || !email) {
    return res.status(400).json({ message: "Nom et email requis" });
  }

/************************************************************************************/

  // BONUS : vérifier la validité de l'email
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email invalide" });
  }

  //BONUS : vérifier les doublons 
  const exists = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (exists) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }

/************************************************************************************/
  
  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  const result = stmt.run(name, email);

  res.json({
    message: "Utilisateur ajouté avec succès !",
    user: { id: result.lastInsertRowid, name, email },
  });
};

/**
 * DELETE /users/:id
 * Supprime un utilisateur depuis SQLite
 */
export const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Utilisateur introuvable" });
  }

  res.json({ message: "Utilisateur supprimé avec succès" });
};

/**
 * PUT /users/:id
 * Met à jour un utilisateur dans SQLite
 */
export const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;


  const stmt = db.prepare(
    "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?"
  );
  const result = stmt.run(name, email, id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Utilisateur introuvable" });
  }

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  res.json({
    message: "Utilisateur mis à jour",
    user,
  });
};

/**
 * Récupérer un utilisateur par ID
 */
export const getUserById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const user = stmt.get(id);

  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable" });
  }

  res.json({ user });
};

