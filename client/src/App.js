import * as React from 'react';

import { Routes, Route } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Login from "./components/Auth/Login";
import LostPsw from "./components/Auth/LostPsw";
import Register from "./components/Auth/Register";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import AddPerson from "./components/DashboardFamily/AddPerson/AddPerson";
import ListPersons from "./components/DashboardFamily/ListPerson/ListPersons";
import SearchPersons from "./components/DashboardFamily/SearchPerson/SearchPersons";
import Tree from "./components/DashboardFamily/Tree/Tree";
import Welcome from "./components/DashboardFamily/Welcome";
import Public from "./components/Public/Public";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import DisplayPerson from "./components/DashboardFamily/DisplayPerson/DisplayPerson";
import EditPerson from './components/DashboardFamily/EditPerson/EditPerson';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="lostpassword" element={<LostPsw />} />
          </Route>

          <Route path="family" element={<DashboardLayout />}>
            <Route index element={<Welcome />} />
            <Route path="addperson" element={<AddPerson />} />
            <Route path="listpersons" element={<ListPersons />} />
            <Route path="searchpersons" element={<SearchPersons />} />
            <Route path="searchpersons/:id" element={<DisplayPerson />} />
            <Route path="editpersons/:id" element={<EditPerson />} />

            <Route path="tree" element={<Tree />} />
          </Route>
        </Routes>

      
    </ThemeProvider>
  );
}

export default App;
