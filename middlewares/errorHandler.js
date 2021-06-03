const errorHandler = (err, req, res, next) => {
    let code;
    console.log(err);
    if(err.code<100) err.code=500
    switch (err.name) {
      case "ValidationError":
        code = 400;
        err.message = err.message.split(":")[2].split(",")[0];
        break;
      case "CastError":
        code = 400;
        err.message = "pls enter a valid id";
      default:
        code = err.code || 500;
    }
    res.status(code).json({
      success: false,
      message: err.message || "Server Error",
      code: code,
    });
  };
  
  module.exports = errorHandler;
  