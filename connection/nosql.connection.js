const mongoose = require("mongoose");

async function connectionNoSql() {
  try {
    await mongoose.connect(process.env.URL_NOSQL_CONCEPTO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log({ bd: "mongo", status: 200, textStatus: "connected" });
  } catch (err) {
    console.log({ error: err.message });
  }
}

module.exports = connectionNoSql;
