const Category = require('../model/categoryModel');
const MyError = require('../utils/myError')


exports.createCategory = async (req, res, next) => {
    const name = req.body.category;
    const isAdminUser = req.isAdmin;
    try {
        if (isAdminUser) {
            const newCategory = await Category.create({ category: name });

            res.status(200).json({
                success: true,
                newCategory: newCategory
            })
        }else{
            return res.status(403).json({ error: 'Unauthorized: Only admins can create this category.' });
        }
    } catch {
        throw new MyError(` is wrong, cannot create new category`, 403)
    }
};

exports.getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.status(200).json({
            success: true,
            categories
        })
    } catch (error) {
        throw MyError('cannot get all category', 403)
    }
}