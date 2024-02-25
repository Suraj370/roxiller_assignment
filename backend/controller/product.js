const Product = require("../models/product");
const formatPieChartData = require("../helper/helper");

const transaction = async (req, res) => {
  const search = req.query.search;
  let month = Number(req.query.month) || 3 ; // Convert to number, default to 3 if not provided or invalid
  let page = Number(req.query.page) || 1; // Convert to number, default to 1 if not provided or invalid
  let limit = Number(req.query.limit) || 10; // Convert to number, default to 10 if not provided or invalid
  let skip = (page - 1) * limit;
  // console.log('month',search);

  try {
    const matchStage = {};

    if (month) {
      matchStage.$expr = { $eq: [{ $month: "$dateOfSale" }, month] };
    }

    if (search) {
      matchStage.$text = { $search: search };
    }
    const transactions = await Product.aggregate([
      {
        $match: matchStage,
      },
     
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const totalResults = await Product.countDocuments();

    res.json({
      transaction: {
        pageInfo: {
          totalResults: totalResults,
          resultsPerPage: limit,
        },
        data: transactions,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const statistics = async (req, res) => {
  let month = Number(req.query.month) || 3;
  try {
    const stats = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
          soldCount: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          unsoldCount: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
        },
      },
    ]);

    const response =
      stats.length > 0
        ? stats
        : { totalAmount: 0, soldCount: 0, unsoldCount: 0 };
    res.status(200).json({ statistics: response });
  } catch (error) {
    console.error("Error getting sales stats:", error);
  }
};

const barchart = async (req, res) => {
  let month = Number(req.query.month) || 3;
  try {
    const pricerangebuckets = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];
    const result = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
        },
      },
      {
        // Create custom buckets with price ranges
        $addFields: {
          priceRange: {
            $switch: {
              branches: pricerangebuckets.map((range) => ({
                case: {
                  $and: [
                    { $gte: ["$price", range.min] },
                    { $lt: ["$price", range.max] },
                  ],
                },
                then: range.min + "-" + range.max,
              })),
              default: "901-above",
            },
          },
        },
      },
      {
        // Group by price range and count documents
        $group: {
          _id: "$priceRange",
          count: { $sum: 1 },
        },
      },
    ]);
    const chartData = {
      labels: result.map((result) => result._id),
      datasets: [
        {
          label: "Product Count",
          data: result.map((result) => result.count),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    res.status(200).json({ barchart: chartData });
  } catch (error) {
    console.error("Error getting bar chart stats:", error);
  }
};

const piechart = async (req, res) => {
  let month = Number(req.query.month) || 3;
  try {
    const pieChartData = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
        },
      },
      {
        $facet: {
          categories: [
            { $group: { _id: "$category", count: { $sum: 1 } } }, // Count items per category
          ],
        },
      },
      {
        $unwind: "$categories", // Unwind the array for further processing
      },
    ]);
    const formattedData = formatPieChartData(pieChartData);

    res.json({ pieChartData: formattedData });
  } catch (error) {
    console.error("Error getting pie chart stats:", error);
  }
};

async function makeAPICall(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
async function makeMultipleAPICalls(endpoints) {
  const promises = endpoints.map(makeAPICall);
  const responses = await Promise.all(promises);
  return responses;
}

const combinedData = async (req, res) => {
  try {
    const { month, page, limit, search } = req.query;
    const responses = await makeMultipleAPICalls([
      `http:/localhost:3001/transactions?month=${month}&page=${page}&limit=${limit}&search=${search}`,
      `http:/localhost:3001/statistics?month=${month}`,
      `http:/localhost:3001/barchart?month=${month}`,
      `http:/localhost:3001/piechart?month=${month}`,
    ]);

    res.json(responses);
  } catch (error) {
    console.log("Error occured", error);
  }
};

module.exports = { transaction, statistics, barchart, piechart, combinedData };
