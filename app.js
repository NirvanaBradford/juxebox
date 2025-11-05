import express from "express";
import router from "#db/api/routes";
const app = express();

app.use(express.json());

app.use("/", router);

app.listen(3000, () => console.log("server running on port 3000"));

app.use((err, req, res, next) => {
  console.error("Error caused by middleware---:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error!!",
  });
});
export default app;
