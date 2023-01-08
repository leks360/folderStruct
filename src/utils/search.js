import { selectClasses } from "@mui/material";
import { useState } from "react";
import { useSelectedNodeState, useTreeState } from "../contexts";
// export const initialFamilyInfoState = {
//     "Name" : "",
//     "Spouse" : "",
//     "Location" : "",
//     "Birth Year" : "",
//     "Present Address" : "",
//     "Family Photo" : null
// }

export const SearchFamily=({searchTerm})=>{
    console.log(searchTerm,"THIS IS THESEARCH TERM");
    const [selectedNode] = useSelectedNodeState();
    const [treeState, setTreeDataState] = useTreeState();

    // search = (items, term) => {
    //     return items.reduce((acc, item) => {
    //        if (this.contains(item.text, term)) {
    //          acc.push(item);
    //        } else if (item.items && item.items.length > 0) {
    //          let newItems = this.search(item.items, term);
    //          if (newItems && newItems.length > 0) {
    //            acc.push({ text: item.text, items: newItems, expanded: item.expanded });
    //          }
    //        }
    //        return acc;
    //      }, []);
    //    }
    const contains = (text, searchTerm) => {
        console.log(text," ",searchTerm);
        return ( (text.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) || searchTerm===undefined);
    }
    const isNodeorParent=(family)=>{
        let newData;
        if(contains(family.Name,searchTerm)){
            newData.push(family);
        }
    }
    const searchLogic=(searchTerm)=>{
      
            // setTreeDataState((prev)=>{
            //     console.log(prev,"this is the prevoius state");
            //     let clone={...prev};
            // });
        console.log("THIS IS THE SEARCH TERM",searchTerm);
            setTreeDataState((prev)=>{
            console.log("THIS IS THE PREV STATE",prev);
            

            const recur=(family)=>{
            if(!family)return;
            console.log(family,"RECURSION RUNNING");
            let acc={};
            if (contains(family.Name, searchTerm)) {
                acc={...acc,family};
            } else if (family?.children && family.children.length > 0) {
                let newItems = recur(family.children, searchTerm);
                if (newItems && newItems.length > 0) {
                acc=(acc,{ Name:family.Name, children:newItems});
                }
            }
            return acc;
            }
            const gg=recur(prev);
            console.log("THIS is what i am returning",gg);
            return gg;

            
            
        });
        
    }
    return {searchLogic}

}