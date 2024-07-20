import data from './data-sql.js';

class UserService {
    async create(body) {
        const { name, age } = body;

        if (name && age) {
            const createdUser = await data.addUser({ name, age: parseInt(age) });
            return createdUser;
        } else {
            return { error: 'Name and age are required' };
        }
    }

    async getAll() {
        const users = await data.getUsers();
        return users;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id не указан');
        };
        const user = await data.getUserById(id);
        return user;
    }

    async update(id, user) {
        if (!id) {
            throw new Error('Id не указан');
        };
        const updatedUser = await data.updateUser(id, user);
        return updatedUser;
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id не указан');
        };
        const isDeleted = await data.deleteUser(id);
        return isDeleted;
    }
}

export default new UserService();