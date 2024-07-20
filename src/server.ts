import app from "./app";

const PORT = process.env.PORT || 3000
const ENVIRONMENT = process.env.ENV

if(ENVIRONMENT === "DEV" || ENVIRONMENT === "STAGE" ) {
  import('../scripts/upload-dummy-data')
}

app.listen(PORT, ()=> {
  console.log("Server is listening on port " + PORT)
})
