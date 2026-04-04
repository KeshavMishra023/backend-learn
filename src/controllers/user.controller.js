// import { asyncHandler } from "../utils/asynchandler.js";
// import {ApiError} from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
// import { ApiResponse } from "../utils/ApiResponse.js"
// const registerUser = asyncHandler(async (req, res) => {
// //   res.status(200).json({
// //     message: "ok",
// //   });
    
//     // get user details from frontend
//     // valdation -not empty
//     // check user alredy exist  by email, username
//     // user upload image , avtar
//     // upload them cloudinary , avtar
//     // craete user object - create enrty in db
//     // remove password , refresh token
//     // check user creation 
//     // return res 

//     const {fullName, email, username, password} = req.body;

//     console.log("fullName", fullName);

//     if(
//         [fullName, email, username, password].some((field) => field?.trim() === "")
//     ){
//         throw new ApiError(400, "all field is required")
//     }
    
//     const existedUser = await User.findOne({
//         $or: [{ username }, { email }]
//     })

//     if(existedUser){
//         throw new ApiError(409, "user with eamil and username is exits")
//     }

//     const avatarLocalPath = req.files?.avatar[0]?.path;
//     // const coverImagLocalPath = req.files?.coverImage[0]?.path;
//     let coverImagLocalPath;

//     if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
//         coverImagLocalPath = req.files.coverImage[0].path
//     }


//     if(!avatarLocalPath){
//         throw new ApiError(400, "Avatar file is required")
//     }
//    const avatar =  await uploadOnCloudinary(avatarLocalPath);
//     const coverImage =  await uploadOnCloudinary(coverImagLocalPath);
//     if(!avatar){
//      throw new ApiError(400, "Avatar file is required")   
//     }

//     const user = await User.create({
//         fullName,
//         avatar: avatar.url,
//         coverImage: coverImage?.url || "", 
//         email,
//         password,
//         username: username.toLowerCase()
//     })

//     console.log("user in db", user);
    

//     const createdUser = await User.findById(user._id).select(
//         "-password -refreshToken"
//     )
//     if(!createdUser){
//         throw new ApiError(500, "something went wrong resgiter is user")
//     }

//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "User resgisted successfully")
//     )
// });

// export { registerUser };




import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    
    const { fullName, email, username, password } = req.body;

    console.log("fullName:", fullName);

    if (
        [fullName, email, username, password].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    let coverImageLocalPath;
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    console.log("User saved in DB:", user);

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }
    
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export { registerUser };