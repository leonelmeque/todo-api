import app from "./app";
import './tasks/user-data-removal.task';

const PORT = process.env.PORT || 3000
const ENVIRONMENT = process.env.ENV

if(ENVIRONMENT === "DEV" || ENVIRONMENT === "STAGE" ) {
  import('../scripts/upload-dummy-data')
}

app.listen(PORT, ()=> {
  console.log("Server is listening on port " + PORT)
})

