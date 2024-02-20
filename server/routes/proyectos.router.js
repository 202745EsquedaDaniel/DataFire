const express = require('express');
const router = express.Router();
const ProjectService = require('../services/proyectos.service');
const service = new ProjectService();
const { models } = require('../lib/sequelize');

const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createProjectsSchema,
  getProjectSchema,
  updateProjectSchema,
  addCustomerRESchema,
  addWorkerRESchema,
  addServiceSchema,
  getCostSchema,
  updateCostsSchema,
  addAbonoSchema,
  getAbonoSchema,
  updateAbonoSchema,
} = require('../schemas/proyectos.schema');

router.get('/', async (req, res, next) => {
  try {
    const projects = await service.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get('/projectCustomer', async (req, res, next) => {
  try {
    const customerProject = await service.findCustomersProjects();
    res.json(customerProject);
  } catch (error) {
    next(error);
  }
});

router.get('/projectWorker', async (req, res, next) => {
  try {
    const projectWorkers = await service.findProjectsWorkers();
    res.json(projectWorkers);
  } catch (error) {
    next(error);
  }
});

router.get('/services', async (req, res, next) => {
  try {
    const services = await service.findServices();
    res.json(services);
  } catch (error) {
    next(error);
  }
});

router.get('/abonos', async (req, res, next) => {
  try {
    const abonos = await service.findAbonos();
    res.json(abonos);
  } catch (error) {
    next(error);
  }
});

router.get('/egresos', async (req, res) => {
  try {
    const totalProjects = await models.Project.getWeeklyExpenses();

    res.json(totalProjects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/project-stats', async (req, res) => {
  try {
    const totalProjects = await models.Project.getTotalProjects();
    const projectsByMonth = await models.Project.getProjectsByMonth();
    const CostsByMonth = await models.Project.getExpensesByMonth();

    res.json({ totalProjects, projectsByMonth, CostsByMonth });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get(
  '/projectCustomer/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const projectCustomer = await service.findOneProjectCustomer(id);
      res.json(projectCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/costosSemanales', async (req, res, next) => {
  try {
    const totalProjects = await service.findSemanalCosts();
    res.json(totalProjects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get(
  '/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const project = await service.findOne(id);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProjectsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProject = service.create(body);
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/projectCustomer',
  validatorHandler(addCustomerRESchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.addCustomer(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  validatorHandler(getProjectSchema, 'params'),
  validatorHandler(updateProjectSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const project = service.update(id, body);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteProject(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);
router.delete(
  '/projectCustomer/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteProjectCustomer(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

/**---------------------------------------ProjectWorkers--------------------------------------------------------- */
// puse el get all arriba por que estaba teniendo problemas de asincronismo
router.get(
  '/projectWorker/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const projectWorker = await service.findOneProjectWorker(id);
      res.json(projectWorker);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/projectWorker',
  validatorHandler(addWorkerRESchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.addProjectWorker(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/projectWorker/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteProjectWorker(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

/**---------------------------------------Services Router--------------------------------------------------------- */
// puse el get all arriba por que estaba teniendo problemas de asincronismo
router.get(
  '/services/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const projectWorker = await service.findOneService(id);
      res.json(projectWorker);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/services',
  validatorHandler(addServiceSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newService = await service.createService(body);
      res.status(201).json(newService);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/services/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  validatorHandler(getCostSchema, 'params'),
  validatorHandler(updateCostsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const cost = service.updateCost(id, body);
      res.json(cost);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/services/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteService(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

/**--------------------Abonos router---------------------------------------------------------------------------- */
router.get(
  '/abonos/:id',
  validatorHandler(getProjectSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const abono = await service.findOneAbono(id);
      res.json(abono);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/abonos',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  validatorHandler(addAbonoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const abono = await service.createAbono(body);
      res.status(201).json(abono);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/abonos/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  validatorHandler(getAbonoSchema, 'params'),
  validatorHandler(updateAbonoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const cost = service.updateAbono(id, body);
      res.json(cost);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/abonos/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'admin'),
  validatorHandler(getAbonoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteAbono(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
