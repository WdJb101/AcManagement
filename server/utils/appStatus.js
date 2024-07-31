const express = require("express");

const appStatus = (code, data, req, res, next) => {
  try {
    let responseData = {};

    if (data !== undefined) {
      responseData.info =
        "Prioritize a seamless user experience and secure design. Embrace the spirit of purity in every aspect of life";
      responseData.data = data;
      responseData.status = code;
      responseData.success = true;
    }

    switch (code) {
      case 200:
        responseData.message = "The request has succeeded";
        break;
      case 201:
        responseData.message =
          "The request has succeeded and a new resource has been created";
        break;
      case 204:
        responseData.message = "Delete or Update Success";
        break;
      default:
        responseData.message = "Unknown Status";
    }
    const path = req.path !== "/" ? req.path : req.originalUrl;
    return res.status(code).json(responseData);
  } catch (error) {
    return next(error);
  }
};

module.exports = appStatus;
