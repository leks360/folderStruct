import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { LayoutHeader } from './LayoutHeader'
import {SearchFamily} from '../utils/search.js';
import './SearchBar.css';
import { useSelectedNodeState, useTreeState,useFilteredIdState,useSearchTextState } from "../contexts";
export default function SearchBar(props) {
    
   // const [searchText,setsearchText]=useState("");
   
  
     const [treeState, setTreeDataState] = useTreeState()

     const [filteredId,setFilteredIdState]= useFilteredIdState();

     const [searchText,setSearchTextState]= useFilteredIdState();

     
    //const {searchLogic}=SearchFamily({searchText});
    const contains = (text, searchText) => {
        console.log(text,"THIS IS WHAT I AM SEARCHING FOR ",searchText, "type of",typeof(searchText));
        if(text===undefined||searchText===undefined)return true;
        return ( (text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) || searchText===" ");
    }
    const searchLogic=(searchText)=>{
            

            console.log("THIS IS THE UPDATED SEARCH TERM",searchText);
               
               
                var filtered = new Set();
                const recur=(family)=>{
                   
                    if(family==='undefined')return false;

                    console.log("RECURSION HAPPENING ",family);

                    const id=family.id;

                    var containChild=false; 
                        if (contains(family.Name, searchText)) {
                           
                       
                            console.log("adding this");
                            filtered.add(id);
                            containChild=true;

                        } 

                        if (family?.children) {

                           
                            console.log(Object.entries(family.children),"CHILLDREN of",family.Name);

                            for( const [key,val] of Object.entries(family.children)){
                                console.log("INSIDE ",val);
                                containChild|=recur(val);
                            }
                            if(containChild){
                                filtered.add(id);
                                return true;
                            }
                           
                        }
                        return containChild;
                       
                        
                }
                const ret=recur(treeState);
                console.log("this is what i am returning ",filtered);
                setFilteredIdState(filtered);
                return filtered;
                
                
            
    }
    
    console.log("THIS IS THE SEARCH TERM HERE IN COL",searchText);
    // const handleSearch=(e)=>{
        
    //     setSearchTextState(e.target.value)
        
    //     console.log("TERM IS CHANGED to",searchText);
    //     searchLogic(searchText);
    // }
    const handleFilter=(e)=>{
        setSearchTextState(e.target.value);
       // setsearchText(e.target.value);
       console.log("SO THIS IS GETTING CALLED OR NOT?")
        searchLogic(e.target.value);
    }

    // useEffect(()=>{
    //     console.log("SO THIS IS CALLING USEEFFETC IN SERAHC ")
    //     searchLogic(searchText);
    // },[searchText]);

    return (
        <>
            <LayoutHeader header={'Family Tree'} />
                {/* <TextField  sx={{marginLeft:"10px",marginTop:"20px",marginBottom:"20px"}} size="small" id="outlined-basic" 
                defaultValue="Small" label="Search Family Member" variant="outlined"  onChange={(e)=>{console.log(e.target.value);setSearchTextState(e.target.value)}} />
                 */}
            <input  id="input" class="" type="text" onChange={handleFilter}/>
          
           

        </>
    )
}
