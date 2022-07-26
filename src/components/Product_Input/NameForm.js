import React from "react";
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Clothing Product Name:
            <input type="text" name = "Name" value={this.state.Name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Description: 
            <input type="text" name = "Description" value={this.state.Description} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Color: 
            <input type="text" name = "Color" value={this.state.Color} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Category: 
            <input type="text" name = "Category" value={this.state.Category} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            SupplierID: 
            <input type="text" name = "SupplierID" value={this.state.SupplierID} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Quantity: 
            <input type="text" name = "Quantity" value={this.state.Quantity} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Size:
            <input type="text" name = "Size" value={this.state.Size} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  export default NameForm;
  
  