import { jwtDecode } from "jwt-decode";

const GetUser = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = jwtDecode(token);
    if (!user) {
      localStorage.removeItem("token");
    } else {
      return user.id;
    }
  }
};

export default GetUser;
