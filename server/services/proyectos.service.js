const { faker } = require('@faker-js/faker');

class ProjectService {
  constructor() {
    (this.projects = []), this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      const startDate = faker.date.past();
      const endDate = faker.date.between({
        from: startDate,
        to: faker.date.recent(),
      });
      this.projects.push({
        id: faker.string.uuid(),
        fecha_inicio: faker.date.past(),
        fecha_fin: endDate,
      });
    }
  }
}

module.exports = ProjectService;
