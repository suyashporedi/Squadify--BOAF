import React, { Component } from "react";
import { signup } from "../auth/index";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      tags: [],
      choosetags: "",
      open: false
    };
  }

  handleChange = passInValue => event => {
    this.setState({ error: "" });
    this.setState({ [passInValue]: event.target.value });
  };

  onTagsChange = (event, values) => {
    this.setState(
      {
        choosetags: values
      },
      () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.tags);
      }
    );
  };

  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name: name,
      email: email,
      password: password,
      tags: this.state.choosetags
    };
    // console.log(user);
    signup(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
      }
    });
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/getTags`)
      .then(res => res.json())
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ tags: jsonData });
        console.log(this.state.tags);
      });
  }

  signupForm = (name, email, password) => (
    <form
      onKeyPress={event => {
        if (event.which === 13 /*Enter key*/) {
          event.preventDefault();
        }
      }}
    >
      <div class="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        ></input>
      </div>
      <div class="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        ></input>
      </div>
      <div class="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        ></input>
      </div>
      <div class="form-group">
        <label className="text-muted">Choose Tags</label>
        <br />
        <br />
        <Autocomplete
          multiple
          id="tags-filled"
          options={this.state.tags.map(option => option.tagName)}
          freeSolo
          onChange={this.onTagsChange}
          //value= {this.state.choosetags}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={params => (
            <TextField
              {...params}
              label="Select Tags"
              placeholder="Favorites"
              fullWidth
            />
          )}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Sign Up
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>
        {error && <div className="alter alert-danger mb-2">{error}</div>}
        {open && (
          <div className="alert alert-info">
            Sign up successfully. Please <Link to="/signin">Sign in</Link>.
          </div>
        )}
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
