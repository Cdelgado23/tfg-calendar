import { spanish } from "../../translations/Spanish";
import { ResourceElement } from "./ResourceElements";
import { Button} from '../../pages/PagesElements';

import React from 'react';



/*
resource =  information, 
            properties,
            deleteFunction 
*/
export const Resource = ({resource})=>{

    /*
    property = {condition() -> return boolean, data -> data to show}
    */
    function listProperties(properties){
        return (properties.map(p=>(
            p.condition? <Button background="#969696" disabled={true} style={{width: "20%", padding: "0"}}>{p.data}</Button>: <div style={{width: "20%", padding: "0", margin: "0.5em"}}></div>)
        ));
    }

    return(
        <ResourceElement>
            <Button background="#e7e9eb" onClick={e=>{e.preventDefault()}}style={{width: "70%", color: "black"}}>{resource.information}</Button>
            {listProperties(resource.properties)}
            <Button background="#a83535" onClick={e=>{e.preventDefault();resource.delete()}} style={{width: "10%"}}>{spanish.delete}</Button>
        </ResourceElement>    
      );
};


export function roomToResource(room, deleteRoom){

    return {
        information: room.roomName,
        properties:[
            {
                data: spanish.concurrent,
                condition: !room.checkConcurrency
            }
        ],
        delete: deleteRoom
    }
}

export function teacherToResource(teacher, deleteTeacher){

    return{
        information: teacher.teacherName,
        properties:[
            {
                data: spanish.concurrent,
                condition: !teacher.checkConcurrency
            }
        ],
        delete: deleteTeacher
    };
}

export function titleToResource(title, deleteTitle){

    return {
        information: title.titleName,
        properties:[
            {
                data: spanish.semesters + ": " + title.semesters,
                condition: true
            }
        ],
        delete: deleteTitle
    };
}