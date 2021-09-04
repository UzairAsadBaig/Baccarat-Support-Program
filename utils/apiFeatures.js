// eslint-disable-next-line no-unused-vars
class APIFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }


    // ! BUILT THE QUERY
    filter() {
        const queryObj = {
            ...this.queryString
        };

        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach(val => delete queryObj[val]);

        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, matchedVal => `$${matchedVal}`);

        const queryObj2 = JSON.parse(queryString);

        this.query = this.query.find(queryObj2);
        return this;
    }

    // ! APPLY SORTING
    sort() {

        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('createdAt imageCover');
        }
        return this;
    }


    // ! APPLY PAGINATION
    paginate() {
        const PAGE = Number(this.queryString.page) || 1;
        const LIMIT = Number(this.queryString.limit) || 100;
        const SKIP = (PAGE - 1) * LIMIT;

        this.query = this.query.skip(SKIP).limit(LIMIT);
        return this;
    }


    // ! APPLY PROJECTION
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }



}

module.exports = APIFeatures;