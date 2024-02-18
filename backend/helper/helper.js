function formatPieChartData(data) {
   
    
      // Extract and format desired properties
      return data.map((categoryData) => ({
        category: categoryData.categories._id, // Assuming "_id" field exists in inner object
        count: categoryData.categories.count, // Assuming "count" field exists in inner object
      }));
  }

  module.exports = formatPieChartData