import React, { Component } from "react";
import Axios from "axios";
import { Button } from "@material-ui/core";
import history from "../../history/history";

// contu nue to with button valid

class Valid extends Component {
  state = {
    verify: false,
    msg: "",
  };
  // preventDefault = event => event.preventDefault()

  handelConfirm = (id) => {
    Axios.get(`users/confirm/${id}`).then((response) => {
      let { status, msg } = response.data;
      console.log(response.data.status);
      if (status === "succes") this.setState({ verify: true, msg: msg });
      else if (status === "verify") this.setState({ verify: true, msg: msg });
    });
  };

  componentDidUpdate() {
    if (this.state.verify) history.push("/Login");
  }

  render() {
    return (
      <React.Fragment>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.handelConfirm(this.props.match.params.cnfId)}
        >
          Valid
        </Button>
      </React.Fragment>
    );
  }
}

export default Valid;
