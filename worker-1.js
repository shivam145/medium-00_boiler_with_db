var amqp = require("amqplib/callback_api");
const CONN_URL =
  "amqps://lrrlrmaa:AGvOyKD2FaiC5u0EHarlREUXaELc53ZC@lionfish.rmq.cloudamqp.com/lrrlrmaa";

amqp.connect("amqp://localhost", function (err, conn) {
  conn.createChannel(function (err, ch) {
    var queue = "user-messages1";
    let args = new Map();
    args.set("x-max-priority", 3);
    ch.assertQueue(queue, {
      durable: false,
      maxPriority: 5,
    });
    ch.consume(
      queue,
      function (msg) {
        setTimeout(function () {
          console.log(".....");
          console.log("Message:", msg.content.toString());
        }, 6000);
      },
      { noAck: true }
    );
  });
});
