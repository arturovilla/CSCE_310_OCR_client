import React from "react";
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {Name: '',
      Description: '',
      Color: '',
      Category: '',
      SupplierID: '',
      Cost: '',
      Size: '',
      Quantity: ''
      };
  
      //this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch('http://localhost:3001/product/submit_clothing', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state)
        })
        .then((response) => {
          if (response.ok){
            alert(this.state.Name + ' was added to the OCR');
            this.setState({Name: '',
                            Description: '',
                            Color: '',
                            Category: '',
                            SupplierID: '',
                            Cost: '',
                            Size: '',
                            Quantity: ''
                            });
          }
        })
        .then((result) => {
          console.log(result)
        })
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Clothing Product Name:
            <input type="text" name = "Name" value={this.state.Name} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Description: 
            <input type="text" name = "Description" value={this.state.Description} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Color: 
            <input type="text" name = "Color" value={this.state.Color} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Category: 
            <input type="text" name = "Category" value={this.state.Category} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            SupplierID: 
            <input type="text" name = "SupplierID" value={this.state.SupplierID} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Cost: 
            <input type="text" name = "Cost" value={this.state.Cost} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Size: 
            <input type="text" name = "Size" value={this.state.Size} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Quantity: 
            <input type="text" name = "Quantity" value={this.state.Quantity} onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  export default NameForm;
  
  