import {auth} from "@clerk/nextjs";

const allowedIds = [
    "user_32ma5Xhfif3X6zPueqByOAPuyMZ"
]

export const IsAdmin = async () => {
    const {userId} = await auth();
    if(!userId) return false;
    return allowedIds.includes(userId);
}