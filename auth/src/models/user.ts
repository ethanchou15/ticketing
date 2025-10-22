import { Schema, Model, Document, model } from "mongoose";
import { Password } from "../services/password";

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
  id?: string; // will exist after toJSON transform
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // to customize the JSON output when calling res.send(user)
  {
    toJSON: {
      // doc is the mongoose document, ret is the plain object representation
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;

        return ret;
      },
    },
  }
);

// middleware to hash the password before saving the user
userSchema.pre("save", async function (done) {
  // only hash the password if it has been modified, or is new
  if (this.isModified("password")) {
    // hash the password, this.get("password") gets the current password value
    const hashed = await Password.toHash(this.get("password"));
    // set the password to the hashed value, this.set("password", value) sets the password field
    this.set("password", hashed);
  }

  // call done to indicate that the middleware is finished
  done();
});

// add type-safe build method for creating a user, to ensure all required properties are provided
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
