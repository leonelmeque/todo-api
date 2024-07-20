import { generateToken } from '../src/middleware/auth.middleware';


beforeAll( ()=>{
    authToken = generateToken("testUser")
})

export let authToken = ""
