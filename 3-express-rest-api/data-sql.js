import db from './database.js';

export default {
    async getUsers() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM users", (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    },
    
    async addUser(user) {
        const { name, age } = user;
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ id: this.lastID, name, age });
            });
        });
    },
    
    async updateUser(id, updatedData) {
        const { name, age } = updatedData;
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE users SET name = ?, age = ? WHERE id = ?",
                [name, age, id],
                function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ id, name, age });
                }
            );
        });
    },
    
    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    },
    
    async getUserById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    },
}
