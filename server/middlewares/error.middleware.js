export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Server Error!"


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === "dev" ? err.stack : undefined
    })
}