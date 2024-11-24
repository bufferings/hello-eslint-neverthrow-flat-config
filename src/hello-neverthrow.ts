import {err, ok, Result} from "neverthrow";

const hello = (flag: boolean): Result<string, Error> => {
  if (flag) {
    return ok("hello");
  }
  return err(new Error("failure"));
}

const result = hello(true);
console.log(result);
