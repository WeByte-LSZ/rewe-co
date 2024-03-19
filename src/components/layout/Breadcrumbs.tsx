import { Box, Breadcrumbs, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const BreadCrumbs = ({ path }: { path: string[] }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Breadcrumbs
        size="sm"
        aria-label="breadcrumbs"
        separator={<ChevronRightRoundedIcon />}
        sx={{ pl: 0 }}
      >
        <HomeRoundedIcon />
        {path.length > 1
          ? path.slice(0, path.length - 1).map((e, i) => {
            return (
              <Typography
                key={i}
                fontSize={12}
                fontWeight={500}
              >
                {e}
              </Typography>
            );
          })
          : ""}
        <Typography color="primary" fontWeight={500} fontSize={12}>
          {path[path.length - 1]}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumbs;
