import React from "react";
import { useState } from "react";
import Axios from "axios";
import debounce from "lodash.debounce";
import { useField, useFormikContext } from "formik";

import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const URL = process.env.REACT_APP_API_BASE_URL;

export const TextFieldAutocompleteFather = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [isValue, setIsValue] = useState("");
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [filteredPersonsCopy, setFilteredPersonsCopy] = useState([]);
  const [listOfPersons, setListOfPersons] = useState([]);

  const configTextfield = {
    ...field,
    ...props,
    fullWidth: true,
  };
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  ///
  const handleChangePerson = (e) => {
    let query = e.target.value;
    setIsValue(query);
    setFieldValue(name, query);
    query = e.target.value.toLowerCase();

    if (query.length > 2) {
      const doPersonFilter = debounce((query) => {
        if (!query) return setFilteredPersonsCopy([]);

        let l = `${URL}suggest/f/${query}`;
        const fetchHandler = async () => {
          return await Axios.get(l).then((res) => res.data);
        };
        fetchHandler().then((data) => setListOfPersons(data));
        //console.log(listOfPersons)

        setFilteredPersonsCopy(
          listOfPersons.filter(
            (personsCopy) =>
              personsCopy.fullname.toLowerCase().includes(query.toLowerCase())
            //personsCopy => personsCopy.fullname.toLowerCase().includes(query.toLowerCase())
          )
        );
       
        setSuggestionsActive(true);
      }, 500);
      doPersonFilter(query);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClickSuggest = (e) => {
    const personId = e.target.getAttribute("data-index");

    setFieldValue(name, e.target.innerText);
    setFieldValue("father", personId);
    setFilteredPersonsCopy([]);
    setIsValue(e.target.innerText);
    setSuggestionsActive(false);
  };

  const SuggestionsCopy = () => {
    return (
      <List>
        {filteredPersonsCopy?.map((p, index) => (
          <ListItem
            key={index}
            data-index={p._id}
            onClick={handleClickSuggest}
            sx={{ cursor: "pointer" }}
          >
            {p.fullname}, ur. {p.birthyear}, {p.birthplace}
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <>
      <TextField
        autoComplete="off"
        fullWidth
        value={isValue}
        onChange={handleChangePerson}
      />
      {suggestionsActive && <SuggestionsCopy />}
    </>
  );
};

export const TextFieldAutocompleteMother = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [isValue, setIsValue] = useState("");
  const [valueId, setValueId] = useState("");
  const [suggestionsActive, setSuggestionsActive] = useState(false);

  const [filteredPersonsCopy, setFilteredPersonsCopy] = useState([]);
  const [listOfPersons, setListOfPersons] = useState([]);

  const configTextfield = {
    ...field,
    ...props,
    fullWidth: true,
  };
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  //
  const handleChangePerson = (e) => {
    let query = e.target.value;
    setIsValue(query);
    setFieldValue(name, query);
    query = e.target.value.toLowerCase();

    if (query.length > 2) {
      const doPersonFilter = debounce((query) => {
        if (!query) return setFilteredPersonsCopy([]);

        let l = `${URL}suggest/m/${query}`;
        const fetchHandler = async () => {
          return await Axios.get(l).then((res) => res.data);
        };
        fetchHandler().then((data) => setListOfPersons(data));
        //console.log(listOfPersons);

        setFilteredPersonsCopy(
          listOfPersons.filter((personsCopy) =>
            personsCopy.fullname.toLowerCase().includes(query.toLowerCase())
          )
        );
        
        setSuggestionsActive(true);
      }, 500);
      doPersonFilter(query);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    const personId = e.target.getAttribute("data-index");

    setFieldValue(name, e.target.innerText);
    setFieldValue("mother", personId);
    setFilteredPersonsCopy([]);
    setIsValue(e.target.innerText);
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
            sx={{ cursor: "pointer" }}
          >
            {p.fullname}, ur. {p.birthyear}, {p.birthplace}
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <>
      <TextField
        autoComplete="off"
        fullWidth
        value={isValue}
        onChange={handleChangePerson}
      />
      {suggestionsActive && <SuggestionsCopy />}
      <input type="text" name="mother" value={valueId} hidden readOnly />
    </>
  );
};
