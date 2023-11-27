const { faker } = require('@faker-js/faker');

class CustomersService {
  constructor() {
    this.customers = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.customers.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        company: faker.company.name(),
      });
    }
  }
}

module.exports = CustomersService;
