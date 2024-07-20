import UserService from "./UserService.js";

class UserController {
    async create(req, res) {
        try {
            //console.log(`req.body is ${req.body} in UserController`);
            const user = await UserService.create(req.body);
            res.status(201).json(user);
        } catch (e) {
            res.status(500).json(e.message);
        };
    }

    async getAll(req, res) {
        try {
            const users = await UserService.getAll();
            return res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getOne(req, res) {
        try {
            const user = await UserService.getOne(req.params.id);
            return user ? res.json(user) : res.status(404).json({ message: 'User not found'});
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await UserService.update(req.params.id, req.body);
            return res.status(201).json(updatedUser);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const isDeleted = await UserService.delete(req.params.id);
            return res.status(204).json(isDeleted);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new UserController();