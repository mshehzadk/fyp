import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Successfully Connected to the database!");
    });

    connection.on("error", (error) => {
      console.log("MONGODB connection error");
      console.log(error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong while connecting to the database!");
    console.log(error);
  }
}
