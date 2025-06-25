import pool from '../index.js';
import bcrypt from 'bcrypt';

class UserModel {
  static async createUser(userData) {
    const { username, password, email } = userData;

    if (!username || !password || !email) {
      throw new Error('Username, email, and password are required for user creation');
    }
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const result = await pool.query(
        `
        INSERT INTO users (username, password_hash, email)
        VALUES ($1, $2, $3)
        RETURNING user_id, username, email
      `,
        [username, hashedPassword, email]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error in UserModel.createUser when writing to DB:', err);

      if (err.code === '23505') {
        if (err.constraint === 'users_username_key') {
          throw new Error('Username already exists');
        }
        if (err.constraint === 'users_email_key') {
          throw new Error('Email already registered.');
        }
      }
      throw new Error('Failed to create user account.');
    }
  }

  static async findUserByUsername(username) {
    try {
      const result = await pool.query(
        'SELECT user_id, username, password_hash, email FROM users WHERE username = $1',
        [username]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error in UserModel.findUserByUsername:', error);
      throw error;
    }
  }

  static async findUserByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT user_id, username, password_hash, email FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error in UserModel.findUserByEmail:', error);
      throw error;
    }
  }
}

export default UserModel;
