const { RESTDataSource } = require("apollo-datasource-rest");


class PropublicaAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.propublica.org/congress/v1';
    }
    async getAllBills() {
        return this.get('bills');
    }

    async getABill(id) {
        const result = await this.get('bill', {
            id
        });

        return result[0];
    }
}

module.exports = PropublicaAPI;