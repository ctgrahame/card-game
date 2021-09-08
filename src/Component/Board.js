import React from 'react';
import '../css/main.css';
import Card from './Card';



class Board extends React.Component {

    render(){
       
        return(
            <div className = 'card-wrap'>
                {
                this.props.contents.map((content,index)=>{
                    return <Card key={index} id={index} value={content[0]} onClick={this.props.onClick} />
                })
              
                }
                
            </div>
        )
    }
}

export default Board;