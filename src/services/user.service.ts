import User, {UserType} from "../models/user.model"

export const saveUser = async (data: Partial<UserType>) => {
    const user = new User(data);
    return user.save();
}

export const findUserByEmail = async (email: string) => {
    return User.findOne({email});
}
