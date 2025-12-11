import { Box, Container } from "@mui/material";
import "./PageContainer.css";

export default function PageContainer({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#071022,#071733)",
        padding: "32px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}
