import write from 'fs-writefile-promise/lib/node6';
import csvdata from 'csvdata';

function loadWinActorConfig(require) {
  const winActorConfig = require('./RPAExecuterConfig').winActor;
  return winActorConfig;
}
const winActorConfig = loadWinActorConfig();
const winActorExePath = winActorConfig.exePath;
const winActorInputDataPath = winActorConfig.inputDataPath;
const winActorOutputDataPath = winActorConfig.outputDataPath;

module.exports.winActor = {
  execute: (task, callback) => {
    const taskName = task.name;
    const taskInputData = task.data;
    csvdata.write(winActorInputDataPath, taskInputData)
      .then(() => {

      });

    const csvJSON = '';
    callback({ resultData: csvJSON });
  },
};
