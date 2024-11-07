import { Droppable } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";

import { statusNames } from "../helpers/statuses";
import BoardCard from "../BoardCard";
import BoardAction from "../BoardAction";
const BoardColumn = ({ status, items }) => (
  <Box
    sx={{
      flex: 1,
      padding: 2,
      width: "300px",
      borderRadius: "8px",
      backgroundColor: "content.highlight.thirdLevel.background",
    }}
  >
    <Typography align="left" variant="h4" sx={{ marginBottom: 1 }}>
      {statusNames[status]}
    </Typography>
    <Droppable droppableId={status}>
      {(droppableProvided, snapshot) => (
        <Box
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={snapshot.isDraggingOver ? " isDraggingOver" : ""}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            gap: 2,
            minHeight: "200px",
            "&.isDraggingOver": {
              bgcolor: "#dadadf",
            },
          }}
        >
          {items.map((item, index) => (
            <BoardCard key={item.id} item={item} index={index} />
          ))}
          <BoardAction />
          {droppableProvided.placeholder}
        </Box>
      )}
    </Droppable>
  </Box>
);

export default BoardColumn;
