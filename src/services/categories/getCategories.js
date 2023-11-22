import categoryData from "../../data/categories.json" assert { type: "json" };

const getCategories = (name) => {
    let categories = categoryData.categories;

    if (name) {
        categories = categories.filter(category => category.name === name);
    }

    return categories;
};

export default getCategories;