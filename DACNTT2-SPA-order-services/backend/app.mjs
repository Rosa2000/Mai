import { default as express } from "express";
import { default as bodyParser } from "body-parser";
import { default as cors } from "cors";
import { approotdir } from "./approotdir.mjs";
import { router as userRouter } from "./routes/v1/user.mjs";
import { router as productManagerRouter } from "./routes/v1/productsManagerRoute.mjs";
import { router as shoppingRouter } from "./routes/v1/shopping.mjs";
import { router as ordersRouter } from "./routes/v1/orders.mjs";
import { router as servicesRouter } from "./routes/v1/services.mjs";
import * as dotenv from "dotenv";
import * as path from "path";

const app = express();
dotenv.config();
const __dirname = approotdir;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname, "public")));

//access token for authenticated
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
//Routes
app.use("/API/v1/users", userRouter);
app.use("/API/v1/products", productManagerRouter);
app.use("/API/v1/shopping", shoppingRouter);
app.use("/API/v1/orders", ordersRouter);
app.use("/API/v1/services", servicesRouter);

const server = app.listen(8000, () => {
  console.log("server is running on port 8000");
});
