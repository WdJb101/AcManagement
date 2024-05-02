const express = require("express");

const appStatus = (code, message, data, res) => {
  let responseData = {};

  if (data !== undefined) {
    responseData.data = data;
  }

  if (code >= 200 && code < 300) {
    responseData.message = `${message} `;
  } else if (code === 201) {
    responseData.message = `${message} `;
  } else if (code === 204) {
    responseData.message = `${message} `;
  }

  return res.status(code).json(responseData);
};

module.exports = appStatus;
