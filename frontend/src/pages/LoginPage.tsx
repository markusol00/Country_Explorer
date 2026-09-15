import { Link } from "react-router";

function LoginPage() {
  async function clickDemo() {
    //returns a response object
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //Hardcoded values for the demo-user (not a real mail)
          email: "demo@countryexplorer.com",
          password: "demo123",
        }),
      });
      console.log(response);
      console.log("Status:", response.status);
      console.log("OK:", response.ok);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Link to={"/countries"} onClick={clickDemo}>
        Demo login
      </Link>
    </>
  );
}

export default LoginPage;
