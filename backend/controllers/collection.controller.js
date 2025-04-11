const httpStatus = require("../constants/httpStatus");
const MESSAGE = require("../constants/messages");
const CollectionServices = require("../services/collection.service");

const getAllCollections = async (req, res, next) => {
  try {
    const collections = await CollectionServices.getAllCollections();
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.COLLECTION.FETCHED_ALL,
      data: collections,
    });
  } catch (error) {
    next(error);
  }
};

const createCollection = async (req, res, next) => {
  try {
    const collection = await CollectionServices.createCollection(req.body);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: MESSAGE.COLLECTION.CREATED,
      data: collection,
    });
  } catch (error) {
    next(error);
  }
};

const getCollectionByIdOrSlug = async (req, res, next) => {
  try {
    const collection = await CollectionServices.getCollectionByIdOrSlug(
      req.params.idOrSlug
    );
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.COLLECTION.FETCHED,
      data: collection,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCollection = async (req, res, next) => {
  try {
    const collection = await CollectionServices.updateCollection(
      req.params.id,
      req.body
    );
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.COLLECTION.UPDATED,
      data: collection,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCollection = async (req, res, next) => {
  try {
    const collection = await CollectionServices.deleteCollection(req.params.id);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.COLLECTION.DELETED,
      data: collection,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteCollection,
  createCollection,
  getAllCollections,
  getCollectionByIdOrSlug,
  updateCollection,
};
