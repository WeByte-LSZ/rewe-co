import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const BreadCrumbs = ({ path }: { path: string[] }) => {
  console.log(path);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Breadcrumbs
        size="sm"
        aria-label="breadcrumbs"
        separator={<ChevronRightRoundedIcon />}
        sx={{ pl: 0 }}
      >
        <Link
          underline="none"
          color="neutral"
          href="#some-link"
          aria-label="Home"
        >
          <HomeRoundedIcon />
        </Link>

        {path.length > 1
          ? path.slice(0, path.length - 1).map((e, i) => {
              return (
                <Link
                  key={i}
                  underline="hover"
                  color="neutral"
                  href="#some-link"
                  fontSize={12}
                  fontWeight={500}
                >
                  {e}
                </Link>
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
