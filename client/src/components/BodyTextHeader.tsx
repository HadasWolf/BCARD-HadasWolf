import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type BodyTextHeaderProps = { subtitle: string };

const BodyTextHeader: React.FC<BodyTextHeaderProps> = ({ subtitle }) => {
  return (
    <>
      <Box alignContent={"center"}>
        <Typography variant="h6" component="h4">
          {subtitle}
        </Typography>
      </Box>
    </>
  );
};

export default BodyTextHeader;
