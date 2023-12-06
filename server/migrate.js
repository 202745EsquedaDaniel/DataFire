const { exec } = require('child_process');

function runMigrations() {
  const command = 'npx sequelize-cli db:migrate';

  const migrationProcess = exec(command);

  migrationProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  migrationProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  migrationProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
}

// Ejecuta las migraciones
runMigrations();
