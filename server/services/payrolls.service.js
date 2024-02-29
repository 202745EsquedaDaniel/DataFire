const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class PayrollService {
  async findPayrolls() {
    const rta = await models.Project.findAll();
    return rta;
  }

  async getPayrollInformation() {
    // Obtener todas las nominas
    const nominas = await models.Nomina.findAll({
      include: [
        {
          model: models.Worker,
          as: 'worker',
          attributes: ['name', 'last_name', 'salary'],
        },
        { model: models.Project, as: 'project', attributes: ['name'] },
      ],
    });

    // Transformar la información
    const payrollInfo = nominas.map((nomina) => {
      const { name, last_name, salary } = nomina.worker;
      const { name: projectName } = nomina.project;

      return {
        nombre_empleado: `${name} ${last_name}`,
        nombre_del_proyecto: projectName,
        salary,
        payment_date: nomina.payment_dates,
      };
    });

    return payrollInfo;
  }

  async findOnePayroll(id) {
    const payroll = await models.Nomina.findByPk(id);
    if (!payroll) {
      throw boom.notFound('Payroll not found');
    }
    return payroll;
  }

  async createPayroll(data) {
    const newPayroll = await models.Nomina.create(data);
    return newPayroll;
  }

  async update(id, changes) {
    const payroll = await this.findOne(id);

    if (!payroll) {
      throw boom.notFound('payroll not found');
    }

    const rta = await payroll.update(changes);
    return rta;
  }

  async deletePayroll(id) {
    const payroll = await this.findOne(id);

    await payroll.destroy();
    return { id };
  }
}
module.exports = PayrollService;
