const { faker } = require('@faker-js/faker');
const boom = require("@hapi/boom")
const {create} = require("../schemas/trabajadores.schema")
const {models} = require("../lib/sequelize")

class WorkerService {
  constructor() {
    (this.workers = []), this.generate();
  }

async find() {
  const rta = await models.Worker.findAll()
  return rta
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
    if (!worker) {
      throw boom.notFound("Worked not found")
    }
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
    console.log(index)
    if (index === -1) {
      throw boom.notFound("Product not found")
    }
    const worker = this.workers[index] //save the selected worker
    this.workers[index] = {
      ...worker, //build the worker
      ...changes //rewrite the changes
    }
    return this.workers[index] //return the edited json
  }

  delete(id){
    const index = this.workers.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound("Product not found")
    }
    this.workers.splice(index,1)
    return {id}
  }
}
module.exports = WorkerService;
