const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const formatPieChartData = require('../helper/helper')
const {transaction,statistics, barchart, piechart, combinedData}  = require('../controller/product')

router.route("/transactions").get(transaction);

router.route("/statistics").get(statistics);

router.route("/barchart").get(barchart);

router.route("/piechart").get(piechart);

router.route("").get(combinedData)

module.exports = router;
