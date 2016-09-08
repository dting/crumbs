import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

export class AddMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit() {
    this.props.addMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.message}
              placeholder="Enter text"
              onChange={this.handleInputChange}
            />
            <InputGroup.Button>
              <Button bsStyle="primary" onClick={this.handleSubmit}>
                Add message
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

