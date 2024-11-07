import {
  Create,
  CreateButton,
  List,
  SearchInput,
  SimpleForm,
  TextInput,
  DateInput,
} from "react-admin";

import { useMediaQuery, Typography, Theme, Box } from "@mui/material";
import BoardContent from "../Board";

const itemFilters = [
  // eslint-disable-next-line react/jsx-key
  <SearchInput source="q" alwaysOn sx={{ marginBottom: 2, marginTop: 2 }} />,
];

const BoardView = () => {
  return (
    <Box>
      {/* <List
        filters={itemFilters}
        perPage={100}
        sort={{ field: 'index', order: 'ASC' }}
        pagination={false}
        component="div"
        actions={<BoardAction />}
      > */}
      <BoardContent />

      {/* </List> */}
    </Box>
  );
};

export default BoardView;
