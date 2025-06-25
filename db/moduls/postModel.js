import pool from '../index.js';

class PostModel {
  static async create(postData) {
    const { name_post, text_post, is_public, user_id } = postData;
    try {
      const result = await pool.query(
        `INSERT INTO data_post (name_post, text_post, is_public, data_create, user_id)
         VALUES ($1, $2, $3, NOW(), $4)
         RETURNING *`,
        [name_post, text_post, is_public, user_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Ошибка в PostModel.create при записи в БД:', error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const result = await pool.query(`
SELECT p.*, u.username AS author_name
FROM data_post p
LEFT JOIN users u ON p.user_id = u.user_id
WHERE p.is_public = true
ORDER BY p.data_create DESC
    `);
      return result.rows;
    } catch (error) {
      console.error('Ошибка в PostModel.findAll при чтении из БД:', error);
      throw error;
    }
  }

  static async findAllWithPrivate() {
    try {
      const result = await pool.query(
        `SELECT * FROM data_post ORDER BY data_create DESC`
      );
      return result.rows;
    } catch (error) {
      console.error('Ошибка в PostModel.findAllWithPrivate:', error);
      throw error;
    }
  }

  static async update(id, updateData) {
    const { name_post, text_post, is_public } = updateData;
    const result = await pool.query(
      `UPDATE data_post
     SET name_post = $1,
         text_post = $2,
         is_public = $3,
         data_update = NOW()
     WHERE id = $4
     RETURNING *`,
      [name_post, text_post, is_public, id]
    );
    return result.rows[0];
  }

  static async findByPk(id) {
    try {
      const result = await pool.query(
        `
      SELECT 
        p.*, 
        u.username
      FROM data_post p
      LEFT JOIN users u ON p.user_id = u.user_id
      WHERE p.id = $1
      `,
        [id]
      );

      return result.rows[0];
    } catch (error) {
      console.error('❌ Error in PostModel.findByPk:', error);
      throw error;
    }
  }

  static async findAllByUserId(user_id) {
    try {
      const result = await pool.query(
        `SELECT p.*, u.username
       FROM data_post p
       LEFT JOIN users u ON p.user_id = u.user_id
       WHERE p.user_id = $1
       ORDER BY p.data_create DESC`,
        [user_id]
      );
      return result.rows;
    } catch (error) {
      console.error('Ошибка в PostModel.findAllByUserId:', error);
      throw error;
    }
  }

  static async findNextPostId(currentId) {
    const result = await pool.query(
      `SELECT id FROM data_post WHERE id > $1 AND is_public = true ORDER BY id ASC LIMIT 1`,
      [currentId]
    );
    return result.rows[0]?.id || null;
  }

  static async findPrevPostId(currentId) {
    const result = await pool.query(
      `SELECT id FROM data_post WHERE id < $1 AND is_public = true ORDER BY id DESC LIMIT 1`,
      [currentId]
    );
    return result.rows[0]?.id || null;
  }

  static async deleteById(id, user_id) {
    try {
      const result = await pool.query(
        `DELETE FROM data_post WHERE id = $1 AND user_id = $2 RETURNING *`,
        [id, user_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Ошибка в PostModel.deleteById:', error);
      throw error;
    }
  }
}

export default PostModel;
