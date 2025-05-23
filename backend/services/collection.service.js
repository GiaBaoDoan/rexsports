const httpStatus = require("../constants/httpStatus");
const Collection = require("../models/Collection.model");
const CustomError = require("../utils/customError");
const { isValidId } = require("../utils/helper");

const getAllCollections = async () => {
  const collections = await Collection.find().populate("products");
  return collections;
};

const createCollection = async (data) => {
  const newCollection = await Collection.create(data);

  return newCollection;
};

const getCollectionByIdOrSlug = async (idOrSlug) => {
  const query = isValidId(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };

  const collection = await Collection.findOne(query).populate("products");
  if (!collection) {
    throw new CustomError("Không tìm thấy collection !!", httpStatus.NOT_FOUND);
  }

  return collection;
};

const updateCollection = async (id, data) => {
  const newCollection = await Collection.findByIdAndUpdate(
    id,
    { ...data, status: data.status },
    { new: true }
  );

  return newCollection;
};

const deleteCollection = async (id) => {
  const collection = await Collection.findByIdAndDelete(id);

  if (!collection) {
    throw new CustomError("Không tìm thấy collection !!", httpStatus.NOT_FOUND);
  }

  return collection;
};

module.exports = {
  getAllCollections,
  getCollectionByIdOrSlug,
  createCollection,
  updateCollection,
  deleteCollection,
};
