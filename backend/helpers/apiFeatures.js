/* apiFeature.js is use for implimenting All the api feature such as
Filtter, sort,Field limiting and Pagination  */

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  // 1) Filtering
  filter() {
    const queryObj = {...this.queryString};

    const excludeFields = ['page', 'sort', 'limit', 'fields']; // don't want to include
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1.5) advance filtering ex from gte => $gte
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // const ids = [1,2,3]
    // Model.find({ '_id': { $in: ids } });
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  // 2) Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } 
    return this;
  }
  // 3) Field limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join('');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  // 4) Pagination -> limit data in page
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
