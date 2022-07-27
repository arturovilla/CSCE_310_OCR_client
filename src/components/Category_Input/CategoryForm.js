import React from "react";
class CategoryForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      Category: ''
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
      fetch('http://localhost:3001/category/submit_category', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state)
        })
        .then((response) => {
          if (response.ok){
            alert(this.state.Category + ' was added to the OCR');
            this.setState({
                            Category: ''
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
            Category: 
            <input type="text" name = "Category" value={this.state.Category} onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  export default CategoryForm;
  
  