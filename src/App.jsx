import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import classifyTheme from './classify/theme';
import ChecklistView from './ChecklistView';
import Home from './Home';
import AnalyticsScreen from './Analytics/AnalyticsScreen';
import { Admin, Resource, EditGuesser, CustomRoutes } from 'react-admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { dataProvider } from './services/dataProvider';
import BoardView from './BoardView';
import Layout from './Layout';
import ItemCreate from './ItemCreate';
import { ItemShow } from './ItemShow';
import StudentList from './StudentList';

const App = () => (
  <ThemeProvider theme={classifyTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/analytics" element={<AnalyticsScreen />} />
        <Route
          path="*"
          element={
            <Admin
              dataProvider={dataProvider}
              layout={Layout}
              theme={classifyTheme}
            >
              <Resource
              name="students"
              list={StudentList}
              options={{ label: 'Alternants' }}
            />
              <Resource
                name="items"
                list={BoardView}
                edit={EditGuesser}
                show={ItemShow}
                create={() => {
                  setIsOpen(true);
                  return (
                    isOpen && <ItemCreate onClose={() => setIsOpen(false)} />
                  );
                }}
              />
              <CustomRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/checklist" element={<ChecklistView />} />
                <Route path="/board" element={<BoardView />} />
                
              </CustomRoutes>
            </Admin>
          }
        />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
