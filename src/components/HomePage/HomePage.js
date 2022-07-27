import React, { useEffect, useState } from 'react';
import parse from "html-react-parser";

// import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default function Homepage() {
    const [posts, setPosts] = useState([]);
    const columnsPerRow = 4;


    function get_data(){
        fetch('http://localhost:3001/get_clothes', {
          method: "GET",
          headers: {
            'Content-type': 'appli cation/json'
          }
        })
        .then((response) => {
            if(response.ok){
                var data = response.json();
                data.then(function(r1){
                    console.log(r1);
                    return r1;
                })
                //console.log(response.json());
            }
        })
        .then((result) => {
            console.log(result);
        })
    }
    
    const getPostsData = async () => {
        try {
          await get_data()
            .then((data) => {    
              setPosts(data.json);
            });
        } catch (err) {
          console.log(err);
        }
      };

      const getColumnsForRow =()=>{
        let items = posts.map((post, index) => {
          return ( 
            <Col>
            <Card key={post.pid}>
            <Card.Body>
              <Card.Title>{parse(post.name)}</Card.Title>
              <Card.Text>
                {parse(post.description)}
              </Card.Text>             
            </Card.Body>
          </Card>
        </Col>
          );
   
      });
      return items;
    };

    useEffect(() => {
        getPostsData();        
   })

  return (
    <Container>
          <Row xs={1} md={columnsPerRow}>
             {getColumnsForRow()}
          </Row>
      </Container>  
      );
  
};