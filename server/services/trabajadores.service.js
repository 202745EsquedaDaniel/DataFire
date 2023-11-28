const { faker } = require('@faker-js/faker');

class WorkerService {
  constructor() {
    (this.workers = []), this.generate();
  }
  generate() {
    const limit = 10;
    for (let index = 0; index < 10; index++) {
      this.workers.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 100 }),
        position: faker.person.jobTitle(),
        salary: faker.finance.amount(100, 100000, 2),
      });
    }
  }

  findOne(id) {
    const worker = this.workers.find((item) => item.id === id);
    return worker;
  }

  create(data) {
    const newWorker = {
      id: faker.string.uuid(),
      ...data,
    };
    this.workers.push(newWorker);
    return newWorker;
  }

  update(id, changes){
    const index = this.workers.findIndex(item => item.id === id) //it finds the worker id
    const worker = this.workers[index] //save the selected worker
    this.workers[index] = {
      ...worker, //build the worker
      ...changes //rewrite the changes
    }
    return this.workers[index] //return the edited json
  }
}
module.exports = WorkerService;
