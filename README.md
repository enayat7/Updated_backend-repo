


# create a .env file with following data 
# PORT=8000
# MONGODB_URI=mongodb+srv://username:password@cluster0.wnpq6uu.mongodb.net //somthing like that for Atlas
# CORS_ORIGIN=*
# JWT_SECRET_KEY=
# EXPIRY_TIME=


# After that import all the necessary module mentioned in package.json file

# to run the app
# first go to the maid directory
# run the below command in git-bash or node.js environment or other  
# node src/index.js
    or 
# nodemon src/index.js

# Api end points 

# BASE_URL = http://localhost:8000/api/v1/users

# routes

# router.route("/register").post(...)  {
    username, fullname, email, password  // pass through body // all field are compusory
    input // json format
    output // json format
}

# router.route("/login").post(...){
    username || password and password // pass through body // all field compulsory
    input // json format
    output // json format
}

# router.route("/addnote").post(...){
    title, content  // pass through body // all feild compulsory with som contrains
    autherization token // header
    input // json format
    output // json format

}

# router.route("/allnotes").get(...){
    autherization token // header
    output // json format

}

# router.route("/note/:noteId").get(...){
    noteId // pass through params 
    autherization token // header
    output // json format

}

# router.route("/updatenote/:noteId").put(...){
    noteId // pass through params
    title, content // pass through body // i mean updated
    autherization token // header
    input // json format
    output // json format
}

# router.route("/deletenote/:noteId").delete(...){
    noteId // pass through params
    autherization token // header
}


# router.route("/deleteuser/:userId").delete(...){
    userId // pass through params
    autherization token // header
}




