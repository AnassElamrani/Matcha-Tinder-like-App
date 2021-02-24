import React from "react";
import { Button, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import history from "../../history/history";

const Error = (props) => {
  const handelErrorBtn = (auth) => {
    auth ? history.push("/") : history.push("/Login");
    // history.push("/");
  };
  console.log(props)
  return (
    <React.Fragment>
      <Typography variant="h1">Page Not Found</Typography>
      <Button onClick={() => handelErrorBtn(props.isAuth)}>
        {/* <Link to="/" style={{ textDecoration: "none" }}> */}
        Go Back To Home Page
        {/* </Link> */}
      </Button>
    </React.Fragment>
  );
};

export default withRouter(Error);
