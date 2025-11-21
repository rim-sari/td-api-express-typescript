import { Router } from 'express';
import { getUsers, addUser, deleteUser, updateUser, getUserById } from '../controllers/user.controller';

const router = Router();

/**
 * Route GET /users
 * Récupère la liste des utilisateurs
 */
router.get('/', getUsers);

/**
 * Route POST /users
 * Ajoute un nouvel utilisateur
 */
router.post('/', addUser);

/**
 * Bonus
 * Supression d'un utilisateur
 */
router.delete('/:id', deleteUser);

/**
 * Bonus
 * mise à jour d'un utilisateur
 */
router.put('/:id', updateUser);

/**
 * Bonus
 * Récupère un utilisateur par ID
 */
router.get('/:id', getUserById);

export default router;
