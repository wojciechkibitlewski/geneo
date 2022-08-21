import React from "react";
import { useState } from "react";
import Axios from "axios";
import debounce from "lodash.debounce";

import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export const TextFieldAutocompleteFather = (data) => {
   
  const [value, setValue] = useState("");
  const [valueId, setValueId] = useState("");
  const [suggestionsActive, setSuggestionsActive] = useState(false);


  const [filteredPersonsCopy, setFilteredPersonsCopy] = useState([]);
  const [listOfPersons, setListOfPersons] = useState([]);

    //
    const handleChangePerson = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        
        if (query.length > 2) {
            const doPersonFilter = debounce(query => {
                if (!query) return setFilteredPersonsCopy([])           
                
                let l = `${data.apiLink}suggest/${query}`;
                const fetchHandler = async () => {
                return await Axios.get(l).then((res) => res.data);
                };
                fetchHandler().then((data) => setListOfPersons(data));
                console.log(listOfPersons)
                
                setFilteredPersonsCopy(listOfPersons.filter(
                    personsCopy => personsCopy.fullname.toLowerCase().includes(query.toLowerCase())
                    
                ))
                
                setSuggestionsActive(true)

            }, 500);
            doPersonFilter(query);
        } else {
            setSuggestionsActive(false)
        }
    }
    
    const handleClick = (e) => {
        const personId = e.target.getAttribute("data-index");
        
        setFilteredPersonsCopy([]);
        setValue(e.target.innerText);
        setValueId(personId);
        setSuggestionsActive(false);
      };
      
      
   
    const SuggestionsCopy = () => {
        return (
        <List>
            {filteredPersonsCopy?.map((p, index) => (
                <ListItem 
                key={index}
                data-index={p._id}
                onClick={handleClick} 
                sx={{ cursor:"pointer"}}             
                >
                    {p.fullname}, ur. {p.birthyear}, {p.birthplace}
                </ListItem>
            ))}
        </List>
        )
    };

  return (
    <>
      <TextField
        autoComplete="off"
        name={data.name}
        fullWidth
        label={data.label}
        value={value}
        onChange={handleChangePerson}
      />
      {suggestionsActive && <SuggestionsCopy />}
      <input type="text" name="father" value={valueId} hidden readOnly />
    </>
  );
};


export const TextFieldAutocompleteMother = (data) => {
    
  const [value, setValue] = useState("");
  const [valueId, setValueId] = useState("");
  const [suggestionsActive, setSuggestionsActive] = useState(false);


  const [filteredPersonsCopy, setFilteredPersonsCopy] = useState([]);
  const [listOfPersons, setListOfPersons] = useState([]);

    //
    const handleChangePerson = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        
        if (query.length > 2) {
            const doPersonFilter = debounce(query => {
                if (!query) return setFilteredPersonsCopy([])           
                
                let l = `${data.apiLink}suggest/${query}`;
                const fetchHandler = async () => {
                return await Axios.get(l).then((res) => res.data);
                };
                fetchHandler().then((data) => setListOfPersons(data));
                console.log(listOfPersons)
                
                setFilteredPersonsCopy(listOfPersons.filter(
                    personsCopy => personsCopy.fullname.toLowerCase().includes(query.toLowerCase())
                    
                ))
                
                setSuggestionsActive(true)

            }, 500);
            doPersonFilter(query);
        } else {
            setSuggestionsActive(false)
        }
    }
    
    const handleClick = (e) => {
        const personId = e.target.getAttribute("data-index");
        
        setFilteredPersonsCopy([]);
        setValue(e.target.innerText);
        setValueId(personId);
        setSuggestionsActive(false);
      };
      
      
   
    const SuggestionsCopy = () => {
        return (
        <List>
            {filteredPersonsCopy?.map((p, index) => (
                <ListItem 
                key={index}
                data-index={p._id}
                onClick={handleClick} 
                sx={{ cursor:"pointer"}}             
                >
                    {p.fullname}, ur. {p.birthyear}, {p.birthplace}
                </ListItem>
            ))}
        </List>
        )
    };
  return (
    <>
      <TextField
        autoComplete="off"
        name={data.name}
        fullWidth
        label={data.label}
        value={value}
        onChange={handleChangePerson}
        

      />
      {suggestionsActive && <SuggestionsCopy />}
      <input type="text" name="mother" value={valueId} hidden readOnly />
    </>
  );
};
