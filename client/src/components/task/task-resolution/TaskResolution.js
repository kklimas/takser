import { Divider, Paper, Stack, styled } from "@mui/material";
import { Box } from "@mui/system";

const threads = [
  {
    user: "User 1",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    resolved: false,
  },
  {
    user: "User 1",
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
    resolved: true,
  },
  {
    user: "User 2",
    comment:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    resolved: false,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const TaskResolution = () => {
  return (
    <>
      <Box width="100%" textAlign="center" mb={2}>
        Resolution
        <Divider />
      </Box>
    </>
  );
};
