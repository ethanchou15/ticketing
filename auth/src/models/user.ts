import { Schema, Model, Document, model } from "mongoose";

// describe the properties of a user
interface UserAttrs {
  email: string;
  password: string;
}

// describe the properties that a User Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// describe the properties that a User Document has
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// add type-safe build method for creating a user, to ensure all required properties are provided
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
