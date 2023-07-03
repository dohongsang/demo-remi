import request from "supertest";
import { Password } from "../../core";
import "../../core/db/entities/user-account";
import "../../core/db/entities/user-profile";
import { UserLoginRequest } from "../auth/rest/models/user-login/user-login.req";
import { UserRegisterRequest } from "../auth/rest/models/user-register/user-register.req";

describe("Test Sign Up / Sign In Integration", () => {
  it("User will sign in and login with this account", async () => {
    const httpRequest = request("https://api.badmem.com");
    const password = new Password();

    // Sign up with new account
    const reqRegister: UserRegisterRequest = {
      email: "integration-test@gmail.com",
      password: password.encryptPassword(
        "123123",
        "ZGVtby1yZW1pLXNvdXJjZS1jb2Rl"
      ),
      firstName: "Integration",
      lastName: "Test",
    };

    httpRequest
      .post("/api/register")
      .send(reqRegister)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImlkIjoiYThjYzBhODYtZDVmZC00M2YxLTk5NjgtYmFjYWQ2ZGI4ZWVjIiwiZW1haWwiOiJzeXN0ZW0tYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY4ODA4NDcxOCwiZXhwIjoxNjkwNjc2NzE4fQ.OdHR0VyDXUoRUQxCT1slbT8j6tKiohFN9RkvtHr1sqAlcIdvc6g6eocQWRHHXl9fzYEPEzKFl1DKhnqGQtd67Q"
      )
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.accessToken).toBeTruthy();
      })
      .catch((error) => {
        expect(error.status).toEqual(403);
      });

    // Sign in with new above account
    const reqLogin: UserLoginRequest = {
      username: reqRegister.email,
      password: password.encryptPassword(
        "123123", // Password from client
        "ZGVtby1yZW1pLXNvdXJjZS1jb2Rl" // Key encrypt password from client
      ),
    };

    httpRequest
      .post("/api/login")
      .send(reqLogin)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImlkIjoiYThjYzBhODYtZDVmZC00M2YxLTk5NjgtYmFjYWQ2ZGI4ZWVjIiwiZW1haWwiOiJzeXN0ZW0tYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY4ODA4NDcxOCwiZXhwIjoxNjkwNjc2NzE4fQ.OdHR0VyDXUoRUQxCT1slbT8j6tKiohFN9RkvtHr1sqAlcIdvc6g6eocQWRHHXl9fzYEPEzKFl1DKhnqGQtd67Q"
      )
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.accessToken).toBeTruthy();
      })
      .catch((error) => {
        expect(error.status).toEqual(401);
      });
  });
});
