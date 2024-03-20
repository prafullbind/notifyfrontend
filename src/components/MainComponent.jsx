import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';
import TaskListComponent from './TaskListComponent';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TaskDetail from './TaskDetail';


function MainComponent() {

    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<FormComponent />} />
            <Route path='/task-details/:id' element={<TaskDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainComponent;
