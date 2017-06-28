import amqp from 'amqplib';
import jobExecuter from './jobExecuter';
import executerStrategy from './executerStrategies';

let connection;
let channel;
let queue;

function consume() {
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      // console.log(msg.content.toString());
      const jobObj = JSON.parse(msg.content.toString());
      console.log(jobObj);
      const jobId = jobObj.jobId;
      const jobName = jobObj.jobName;
      const jobInput = JSON.parse(jobObj.jobInput);


      const executer = jobExecuter(executerStrategy[executerType]);
      executer.execute(jobName, jobInput, (err, jobOutput) => {
        if (err) {

        }
        channel.sendToQueue('jobs_results_queue',
          new Buffer(JSON.stringify(Object.assign(jobOutput, { jobId }))));
      });
      channel.ack(msg);
    }
  });
}

amqp
  .connect('amqp://localhost')
  .then((conn) => {
    connection = conn;
    return conn.createChannel();
  })
  .then((ch) => {
    channel = ch;
    return channel.assertQueue('jobs_queue');
  })
  .then((q) => {
    queue = q.queue;
    consume();
  })
  .catch(console.warn);
