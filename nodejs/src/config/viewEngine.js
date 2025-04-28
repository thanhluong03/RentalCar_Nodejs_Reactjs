
import express from "express"; // khai bao
let configViewEngine = (app) => {
    app.use(express.static("./src/public")) // yêu cầu chỉ được lấy ảnh trong file đã chọn publicpublic
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = configViewEngine;
