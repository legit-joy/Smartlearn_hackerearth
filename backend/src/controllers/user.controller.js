import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
    console.log("Step 1: Register User Request Received");
    const { fullName, fullname, name, username, email, password } = req.body;
    console.log("Step 2: Payload extracted", { email, username });

    const resolvedFullName = (fullName ?? fullname ?? name ?? "").trim();
    const resolvedUsername = (username ?? "").trim();
    const resolvedEmail = (email ?? "").trim().toLowerCase();
    const resolvedPassword = password ?? "";

    if (!resolvedFullName || !resolvedEmail || !resolvedPassword) {
        console.log("Step 3: Validation Failed - Missing fields");
        throw new ApiError(400, "fullName, email and password are required");
    }

    console.log("Step 4: Checking individual existence for debugging");
    // Debug individual fields
    const emailExist = await User.findOne({ email: resolvedEmail });
    console.log("Step 4a: Email exists?", !!emailExist);

    if (resolvedUsername) {
        const userExist = await User.findOne({ username: resolvedUsername.toLowerCase() });
        console.log("Step 4b: Username exists?", !!userExist);
    }

    const existing = await User.findOne({
        $or: [
            { email: resolvedEmail },
            ...(resolvedUsername ? [{ username: resolvedUsername.toLowerCase() }] : [])
        ]
    });

    if (existing) {
        console.log("Step 5: Conflict - User already exists");
        throw new ApiError(409, "User already exists with this email/username");
    }

    console.log("Step 6: Creating User in DB...");
    const user = await User.create({
        fullName: resolvedFullName,
        username: resolvedUsername ? resolvedUsername.toLowerCase() : resolvedEmail.split("@")[0],
        email: resolvedEmail,
        password: resolvedPassword
    });
    console.log("Step 7: User Created, ID:", user._id);

    console.log("Step 8: Generating Access Token...");
    const accessToken = user.generateAccessToken();
    console.log("Step 9: Token Generated");

    const safeUser = await User.findById(user._id).select("-password");
    console.log("Step 10: Sending Response");

    return res
        .status(201)
        .json(new ApiResponse(201, { user: safeUser, accessToken }, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const resolvedEmail = (email ?? "").trim().toLowerCase();
    const resolvedPassword = password ?? "";

    if (!resolvedEmail || !resolvedPassword) {
        throw new ApiError(400, "email and password are required");
    }

    const user = await User.findOne({ email: resolvedEmail });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const ok = await user.isPasswordCorrect(resolvedPassword);
    if (!ok) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = user.generateAccessToken();
    const safeUser = await User.findById(user._id).select("-password");
    return res
        .status(200)
        .json(new ApiResponse(200, { user: safeUser, accessToken }, "Logged in successfully"));
});

export { registerUser, loginUser };