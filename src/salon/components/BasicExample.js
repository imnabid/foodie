import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BasicExample() {
  return (
    <>
      <div className="container col-lg-4 col-md-4 col-sm-2 ">
        <div className="login">
          <img
            className="signup"
            src="https://yt3.ggpht.com/ytc/AKedOLQcjMYalW_yII-YeLIMExAZ88R58Jw6VFUOJ1lK=s900-c-k-c0x00ffffff-no-rj"
            alt=""
          />
          <Form>
            <h4 className="f">Welcome to foodie</h4>
            <h6 className="f">Bon Appeit</h6>
            
            <br /><div className="n1">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name:</Form.Label>
              <Form.Control id="n" type="email" placeholder=" First Name" />
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Last Name:</Form.Label>
              <Form.Control id="n" type="email" placeholder="Last Name" />
            </Form.Group></div>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>UserName:</Form.Label>
              <Form.Control id="n" type="text" placeholder="Username" />
              <Form.Text className="text-muted">
                By what name can we call you.
              </Form.Text>
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control id="n" type="email" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address:</Form.Label>
              <Form.Control id="n"  type="email" placeholder="address" />
            </Form.Group>
            <Form.Group className="mb-3"  controlId="formBasicEmail">
              <Form.Label>Contact:</Form.Label>
              <Form.Control id="n" type="email" placeholder="contact" />
            </Form.Group>
            <br />
            <div className="n1">
            <Form.Group  className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password:</Form.Label>
              <Form.Control id="n" type="Password" placeholder="Password" />
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formBasicEmail">
            <Form.Label>Confirm Password:</Form.Label>

              <Form.Control id="n" type="password" placeholder="Confirm Password" />
            </Form.Group>
            </div>
            <Button className="ss"><b>Sign up</b> </Button>

            <p className="cc">
              Already have an account?<a href="">LOG IN</a>
              <h6>OR</h6>
              <hr/>
              
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}

export default BasicExample;
