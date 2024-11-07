import { Layout as ReactAdminLayout } from "react-admin";
import CustomMenu from "../Menu";
import Box from "@mui/material/Box";

const Layout = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <CustomMenu />
      <div style={{ marginLeft: '240px', width: '100%' }}>
        <ReactAdminLayout
          {...props}
          menu={CustomMenu} 
          appBar={() => (
            <Box>
              <Box
                sx={{
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 8,
                }}
              >
                <a 
                  href="http://localhost:3000" 
                  rel="noopener noreferrer"
                >
                  <img height="16" src="/logo_oc.png" alt="Logo" />
                </a>
              </Box>
              <div
                style={{
                  backgroundImage: "url(/header.png)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  height: window.innerWidth < 600 ? "200px" : 
                         window.innerWidth < 900 ? "300px" : "450px",
                }}
              />
            </Box>
          )}
        />
      </div>
    </div>
  );
};

export default Layout;