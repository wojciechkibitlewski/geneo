import { useState } from "react";
import Axios from "axios";
import debounce from "lodash.debounce";

import TextField from "@mui/material/TextField";




const AddPersonAutocomplite = (data) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [listOfClients, setListOfClients] = useState([]);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();

    setValue(query);

    //let filterTimeout;

    if (query.length > 2) {
      const debouncedFilter = debounce(() => {
        ///////////////
        //console.log("====>", query);
        let l = `${data.apiLink}/${query}`;

        const fetchHandler = async () => {
          return await Axios.get(l).then((res) => res.data);
        };
        fetchHandler().then((data) => setListOfClients(data));
        console.log(listOfClients);


        let dataName = [];
        let dataId = [];

        for (let i = 0; i < listOfClients.length; i++) {
          //console.log(dn[i].name);
          dataName.push(listOfClients[i].name);
          dataId.push(listOfClients[i]._id);
        }
        //////////
        console.log(`data: ${dataName}`)
        
        const filterSuggestions = dataName.filter(
          (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
        );
        
        setSuggestions(filterSuggestions);
        

        setSuggestionsActive(true);
      }, 600);
      debouncedFilter();
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    const indexOfId = e.target.getAttribute("data-index");

    //console.log(dataId[indexOfId]);

    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    console.log(`suggestions: ${suggestions}`);

    return (
      <ul className={data.suggestionsClassName}>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              data-index={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
    <TextField
      name="fatherName"
      fullWidth
      id="fatherName"
      label="Imię i nazwisko ojca"
      onChange={ handleChange}
    />




    <div className="autocomplete">
      <input
        type="text"
        className={data.className}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        name="fatherName"
      />
      {suggestionsActive && <Suggestions />}
    </div>
    </>
  );
};

export default AddPersonAutocomplite;