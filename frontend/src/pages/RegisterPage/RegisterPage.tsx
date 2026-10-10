import "./RegisterPage.css";
function RegisterPage() {
  return (
    <div className="outerContainer">
      <p>dv</p>
      <form className="formContainer">
        <h1>Register </h1>
        <p>Please fill out this form to make an account </p>
        <section className="nameSection">
          <div className="inputfield">
            <label>First name:</label>
            <input type="text" />
          </div>
          <div className="inputfield">
            <label>Last name:</label>
            <input type="text" />
          </div>
        </section>
        <div className="inputfield">
          <label>E-mail:</label>
          <input type="text" />
        </div>
        <div className="inputfield">
          <label>Password:</label>
          <input type="password" />
        </div>
        <button>Sign up!</button>
        <p>Already having an account? Log in.</p>
      </form>
    </div>
  );
}

export default RegisterPage;
