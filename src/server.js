import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./service/databaseService.js";

connectDB()
 

;(async () => {
    try{
        const server = app.listen(config.PORT)
        console.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT
            }
        })

    }catch(err){
        console.error(`APPLICATION_ERROR`, {meta: err})

    }

}) ()