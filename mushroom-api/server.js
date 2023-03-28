const express = require("express");
const morgan = require("morgan");
const hm = require("mysql-ithm");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const users = require("./routes/api/users");
const tags = require("./routes/api/tags");
const classify = require("./routes/api/classify");
const mushroom = require("./routes/api/mushroom");
const info = require("./routes/api/info");
const areas = require("./routes/api/areas");
const cookbook = require("./routes/api/cookbook");
const mushroomInfo = require("./routes/api/mushroomInfo");
const addMushroom = require("./routes/api/addMushroom");

//心跳包支持组件
const router = express.Router();
const AreaModel = require("./modeles/Areas");

// 使用body-parser中间件
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ extended: true, limit: "10mb" }));

// 开启跨域
app.use(cors());

// 开放静态资源路径
app.use(express.static("./public"));

// //网络数据库
// hm.connect({
//     host: '39.105.231.106',//数据库地址
//     // host: '127.0.0.1',
//     port:'3306',
//     user: 'root',//用户名，没有可不填
//     password: '091816',//密码，没有可不填
//     database: 'mushroom'//数据库名称
// });

//网络数据库2
const connection = hm.connect({
  host: "mysql.sqlpub.com", //数据库地址
  // host: '127.0.0.1',
  port: "3306",
  user: "qqmysql", //用户名，没有可不填
  password: "914b7f45579894e1", //密码，没有可不填
  database: "mushroom", //数据库名称
});

// //本地数据库
// hm.connect({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: '123456',
//     database: 'mushroom'
// });

setInterval(() => {
  AreaModel.find((err, results) => {
    if (err) {
      console.error("Heartbeat failed:", err);
    } else {
      console.log("Heartbeat sent");
    }
  });
}, 10000);

app.get("/", function (req, res) {
  res.json("欢迎访问蘑菇后台系统");
});

app.use(morgan("dev"));

// 使用routes
app.use("/api/users", users);
app.use("/api/tags", tags);
app.use("/api/classify", classify);
app.use("/api/mushroom", mushroom);
app.use("/api/info", info);
app.use("/api/areas", areas);
app.use("/api/cookbook", cookbook);
app.use("/api/mushroomInfo", mushroomInfo);
app.use("/api/addMushroom", addMushroom);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
