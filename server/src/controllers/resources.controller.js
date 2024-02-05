import { resourceModel } from "../models/resource.model.js";

export const getResources = async (req, res) => {
  try {
    const resources = await resourceModel.find();
    res.status(200).json({ status: "success", data: resources });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.name });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await resourceModel.findById(resourceId);
    if (!resource) {
      return res
        .status(404)
        .json({ status: "error", error: "Resource not found" });
    }
    return res.status(200).json({ status: "success", data: resource });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.name });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = req.body;
    const newResource = new resourceModel(resource);
    const savedResource = await newResource.save();
    res.status(201).json({ status: "success", data: savedResource });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", error: "Could not create resource" });
  }
};

export const updateResource = async (req, res) => {
  const resourceId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedResource = await resourceModel.findByIdAndUpdate(
      resourceId,
      updatedData,
      { new: true }
    );

    if (!updatedResource) {
      return res
        .status(404)
        .json({ status: "error", error: "Resource not found" });
    }

    res.status(200).json({ status: "success", data: updatedResource });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to update resource" });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const deletedResource = await resourceModel.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      return res
        .status(404)
        .json({ status: "error", error: "Resource not found" });
    }

    res.status(200).json({ status: "success", data: deletedResource });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to delete resource" });
  }
};
