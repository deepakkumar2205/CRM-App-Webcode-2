import BadgeIcon from '@mui/icons-material/Badge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContactsIcon from '@mui/icons-material/Contacts';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PortraitIcon from '@mui/icons-material/Portrait';
import SearchIcon from '@mui/icons-material/Search';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Avatar, Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import API from '../url';
import { About } from './About';
import { Allocation } from './Allocation/Allocation';
import Context from './ContextFold/Context';
import CreateEmployee from './CreateEmployee';
import './Dashboard.css';
import { Employees } from './Employees/Employees';
import { Home } from './Home/Home';
import { Profile } from './Profile/Profile';

//search bar and top bar code are shown bellow:
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })); 

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
         width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
     boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

//!dashbard funcion component is started from here
function Dashboard() {
  const navigate= useNavigate();
  const [flagVerify,setFlagVerify] = React.useState(true);
  const context = React.useContext(Context);
  const [profileImage,setProfileImage ] = React.useState("");
  
  //Validate the token only one the dashboard get render next time it will not render .I keep like this for better performance.
  if(flagVerify){
    setFlagVerify(false)
      const token=localStorage.getItem("x-Auth-token")
      if(token){
        fetch(`${API}/users/verifyToken`, {
          method: "GET",
          headers: {
            'x-Auth-token': localStorage.getItem("x-Auth-token"),
            'roleId':localStorage.getItem("roleId"),
            '_id':localStorage.getItem("_id")
    
          }
        }).then((res)=>{
          if(res.status ===200){
            // console.log('triger');
          }else if(res.status ===401){
            localStorage.clear();
            navigate("/")
          }
          return res.json()
        }).then((data)=>setProfileImage(data.data))
        .catch((err)=>console.log(err))
      }else{
        navigate('/')
      }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
 
  
  const isMenuOpen       = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl=    {anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical  : 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{
        handleMenuClose()
        navigate("profile")
      }}>Profile</MenuItem>
      <MenuItem onClick={()=>{
        handleMenuClose()
        localStorage.clear()
        navigate("/")
      }}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId     = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl    ={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>context.theme==='light'?context.setTheme('dark') :context.setTheme('light')}>
        <IconButton 
         size      ="large"
         aria-label="show 4 new mails"
         color     ="inherit"

         >
          <Badge  color="error">
          {context.theme!=='light'?<LightModeTwoToneIcon/>:
        <DarkModeOutlinedIcon />}
          </Badge>
        </IconButton>
        <p>Theme</p>
      </MenuItem>
      <MenuItem>
      <Tooltip title="Total members in the CRM">
        <IconButton
          size      ="large"
          aria-label="show 17 new notifications"
          color     ="inherit"
         >
        
          <Badge color="error" badgeContent={context.badge}>
            <PeopleIcon />
          </Badge >
        </IconButton>
        </Tooltip>
        <p>Total Members</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size         ="large"
          aria-label   ="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color        ="inherit"
        >
          {/* <AccountCircle /> */}
          <Avatar alt={profileImage.firstName} src={profileImage.imageUrl} sx={{ width: 30, height: 30 }}/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  if(open){
    setTimeout(() => {
         setOpen(!open)
      }, 8000);
  }
  const role = localStorage.getItem("roleId")
  let mapingDataForSideBar =role ==='admin' ?["Home","Employees","Create Employees", "Allocation", "Profile", "About"]:
                                             ["Home","Employees" ,"Profile", "About"]
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {!open ? (
            <>
              <Diversity3Icon />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  paddingLeft: "15px",
                  width:"150px"
                }}
              >
                CRM-APP
              </Typography>
            </>
          ) : (
            false
          )}
          <div className='searchDiv' >
            {document.location.pathname === '/dashboard/employees' &&
          <Search className='searchBar'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e)=>{
                let character = e.target.value;
                let array = context.employee;
                let resArray=[]
                for(let i of array){
                  if(i.firstName.toUpperCase().includes(character.toUpperCase() )||
                     i.roleId.toUpperCase().includes(character.toUpperCase())
                  ){
                    resArray.push(i)
                  }
                }
                context.setSortedEmployees(resArray.length ===0 ? 'empty' : resArray )
                // context.setSortedEmployees( resArray )
              
                
              }}
            />
          </Search>}
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() =>
                context.theme === "light"
                  ? context.setTheme("dark")
                  : context.setTheme("light")
              }
            >
              <Badge color="error">
                {context.theme !== "light" ? (
                  <LightModeTwoToneIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="error" badgeContent={context.badge}>
              <Tooltip title="Total members in the CRM">
                <PeopleIcon />
              </Tooltip>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <Avatar alt={profileImage.firstName} src={profileImage.imageUrl}sx={{ width: 30, height: 30 }}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Diversity3Icon
            style={{ display: "flex", marginRight: "auto", marginLeft: "12px" }}
          />
          <h2>CRM-APP</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {mapingDataForSideBar.map(
            (text, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    if (text === "About") {
                      navigate("about");
                    } else if (text === "Profile") {
                      navigate("profile");
                    } else if (text === "Home") {
                      navigate("");
                    } else if (text === 'Allocation'){
                      navigate("allocation")
                    }else if (text === 'Employees'){
                      navigate("employees")
                    }else if(text === 'Create Employees'){
                      navigate("createEmployees")
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"Home" === text ? <HomeIcon /> : false}
                    {"Allocation" === text ? <SupervisorAccountIcon /> : false}
                    {"Profile" === text ? <PortraitIcon /> : false}
                    {"About" === text ? <ContactsIcon /> : false}
                    {"Employees" === text ? <BadgeIcon /> : false}
                    {"Edit Employees" === text ? <EditIcon /> : false}
                    {"Create Employees" === text ? <PersonAddAlt1Icon /> : false}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/*// !Routing part below*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/createEmployees" element={<CreateEmployee />} />
        </Routes>
        {/* </BrowserRouter> */}
      </Box>
    </Box>
  );
}
export default Dashboard