import './Login.css'

const ResetPassword = () =>{
    return (
      <div id="LoginStyle">
        <div className="wrapper">
          <div className="title-text">
            <div className="title signup">Reset Password</div>
          </div>
          <div className="form-container">
            <div className="form-inner">
              <form action="#" className="loginInsideForm">
                <div className="field">
                  <input type="text" placeholder="Email Address" required />
                </div>
                <div className="field">
                  <input type="text" placeholder="Phone Number" required />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}
export default ResetPassword