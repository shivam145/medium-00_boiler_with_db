import amqp from "amqplib/callback_api";
const CONN_URL =
  "amqps://lrrlrmaa:AGvOyKD2FaiC5u0EHarlREUXaELc53ZC@lionfish.rmq.cloudamqp.com/lrrlrmaa";

let ch = null;
amqp.connect("amqp://localhost", function (err, conn) {
  conn.createChannel(function (err, channel) {
    ch = channel;
    ch.assertQueue("user-messages1", {
      durable: false,
      maxPriority: 5,
    });
  });
});
let args = new Map();
args.set("x-max-priority", 5);
export const publishToQueue = async (queueName, data, priority) => {
  try {
    console.log(priority);
    // await
    await ch.sendToQueue(queueName, Buffer.from(data), {
      priority: priority,
    });
    console.log("Your request is being processed");
  } catch (err) {
    console.error(err);
  }
};

process.on("exit", (code) => {
  ch.close();
  console.log(`Closing rabbitmq channel`);
});
