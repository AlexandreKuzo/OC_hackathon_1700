import { Draggable } from "@hello-pangea/dnd";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

import { ShowButton, useRedirect } from "react-admin";

const BoardCard = ({ item, index }) => {
  const redirect = useRedirect();

  const onClick = () => {
    redirect(`/items/${item.id}/show`);
  };

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => (
        <Box
          sx={{ cursor: "pointer", width: "267px" }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            onClick={onClick}
            style={{
              opacity: snapshot.isDragging ? 0.9 : 1,
              transform: snapshot.isDragging ? "rotate(-2deg)" : "",
            }}
            elevation={snapshot.isDragging ? 3 : 1}
          >
            <CardContent
              sx={{ padding: 3, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
                {item.jobTitle}
              </Typography>
              <Typography variant="subheading" color="text.secondary">
                Entreprise
              </Typography>
              <Typography variant="body">{item.companyName}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};

export default BoardCard;
