// import React from "react";
// import {
//   List,
//   Card,
//   Alert,
//   Avatar,
//   ListItem,
//   Accordion,
//   Typography,
//   AccordionBody,
//   ListItemPrefix,
//   AccordionHeader,
// } from "@material-tailwind/react";
// import {
//   TicketIcon,
//   UserGroupIcon,
//   Square2StackIcon,
//   RectangleGroupIcon,
//   ChatBubbleLeftEllipsisIcon,
// } from "@heroicons/react/24/solid";
// import {
//   ChevronDownIcon,
//   ArrowLeftStartOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// function SidebarLight() {
//   const [open, setOpen] = React.useState(0);
//   const [openAlert, setOpenAlert] = React.useState(true);

//   const handleOpen = (value: any) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const LIST_ITEM_STYLES =
//     "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

//   return (
//     <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] mx-auto p-6 shadow-md">
//       <div className="mb-2 flex items-center gap-4 p-4">
//         <img
//           src="https://www.material-tailwind.com/logos/mt-logo.png"
//           alt="brand"
//           className="h-9 w-9"
//         />
//         <Typography color="blue-gray" className="text-lg font-bold">
//           Material Tailwind
//         </Typography>
//       </div>
//       <hr className="my-2 border-gray-200" />
//       <List>
//         <Accordion open={open === 1}>
//           <ListItem
//             selected={open === 1}
//             data-selected={open === 1}
//             onClick={() => handleOpen(1)}
//             className="p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
//           >
//             <ListItemPrefix>
//               <Avatar
//                 size="sm"
//                 src="https://www.material-tailwind.com/img/avatar1.jpg"
//               />
//             </ListItemPrefix>
//             <Typography className="mr-auto font-normal text-inherit">
//               Brooklyn Alice
//             </Typography>
//             <ChevronDownIcon
//               strokeWidth={3}
//               className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${open === 1 ? "rotate-180" : ""}`}
//             />
//           </ListItem>
//           <AccordionBody className="py-1">
//             <List className="p-0">
//               <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
//                 My Profile
//               </ListItem>
//               <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
//                 Settings
//               </ListItem>
//             </List>
//           </AccordionBody>
//         </Accordion>
//         <hr className="my-2 border-gray-200" />
//         <Accordion open={open === 2}>
//           <ListItem
//             selected={open === 2}
//             data-selected={open === 2}
//             onClick={() => handleOpen(2)}
//             className="px-3 py-[9px] select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
//           >
//             <ListItemPrefix>
//               <RectangleGroupIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             <Typography className="mr-auto font-normal text-inherit">
//               Dashboard
//             </Typography>
//             <ChevronDownIcon
//               strokeWidth={3}
//               className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${open === 2 ? "rotate-180" : ""}`}
//             />
//           </ListItem>
//           <AccordionBody className="py-1">
//             <List className="p-0">
//               <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
//                 Analytics
//               </ListItem>
//               <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
//                 Sales
//               </ListItem>
//             </List>
//           </AccordionBody>
//         </Accordion>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <Square2StackIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Products
//         </ListItem>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <TicketIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Orders
//         </ListItem>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <UserGroupIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Customers
//         </ListItem>
//       </List>
//       <hr className="my-2 border-gray-200" />
//       <List>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Help & Support
//         </ListItem>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <ArrowLeftStartOnRectangleIcon
//               strokeWidth={2.5}
//               className="h-5 w-5"
//             />
//           </ListItemPrefix>
//           Sign Out
//         </ListItem>
//       </List>
//       <Alert
//         open={openAlert}
//         className="mt-auto"
//         color="green"
//         variant="ghost"
//       >
//         <Typography
//           variant="small"
//           color="green"
//           className="mb-1 font-bold"
//         >
//           New Version Available
//         </Typography>
//         <Typography variant="small" color="green" className="font-normal">
//           Update your app and enjoy the new features and improvements.
//         </Typography>
//         <div className="mt-4 flex gap-4">
//           <Typography
//             as="a"
//             href="#"
//             variant="small"
//             color="green"
//             className="font-normal"
//             onClick={() => setOpenAlert(false)}
//           >
//             Dismiss
//           </Typography>
//           <Typography
//             as="a"
//             href="#"
//             variant="small"
//             color="green"
//             className="font-medium"
//           >
//             Upgrade Now
//           </Typography>
//         </div>
//       </Alert>
//       <Typography
//         variant="small"
//         className="mt-5 font-medium text-gray-500 flex justify-center"
//       >
//         mt v2.1.2
//       </Typography>
//     </Card>
//   );
// }

// function SidebarDark() {
//   const [open, setOpen] = React.useState(0);
//   const [openAlert, setOpenAlert] = React.useState(true);

//   const handleOpen = (value: any) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const LIST_ITEM_STYLES =
//     "text-gray-500 hover:text-white focus:text-white active:text-white hover:bg-opacity-20 focus:bg-opacity-20 active:bg-opacity-20";

//   return (
//     <Card
//       color="gray"
//       className="h-[calc(100vh-2rem)] w-full max-w-[20rem] mx-auto p-6 shadow-md"
//     >
//       <div className="mb-2 flex items-center gap-4 p-4">
//         <img
//           src="https://www.material-tailwind.com/logos/mt-logo.png"
//           alt="brand"
//           className="h-9 w-9"
//         />
//         <Typography className="text-lg font-bold text-gray-300">
//           Material Tailwind
//         </Typography>
//       </div>
//       <hr className="my-2 border-gray-800" />
//       <List>
//         <Accordion open={open === 1}>
//           <ListItem
//             selected={open === 1}
//             data-selected={open === 1}
//             onClick={() => handleOpen(1)}
//             className="p-3 hover:bg-opacity-20 text-gray-500 select-none focus:bg-opacity-20 active:bg-opacity-20 data-[selected=true]:bg-gray-50/20 hover:text-white focus:text-white active:text-white data-[selected=true]:text-white"
//           >
//             <ListItemPrefix>
//               <Avatar
//                 size="sm"
//                 src="https://www.material-tailwind.com/img/avatar1.jpg"
//               />
//             </ListItemPrefix>
//             <Typography className="mr-auto font-normal text-inherit">
//               Brooklyn Alice
//             </Typography>
//             <ChevronDownIcon
//               strokeWidth={3}
//               className={`ml-auto text-gray-500 h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
//             />
//           </ListItem>
//           <AccordionBody className="py-1">
//             <List className="p-0">
//               <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
//                 My Profile
//               </ListItem>
//               <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
//                 Settings
//               </ListItem>
//             </List>
//           </AccordionBody>
//         </Accordion>
//         <hr className="my-2 border-gray-800" />
//         <Accordion open={open === 2}>
//           <ListItem
//             selected={open === 2}
//             data-selected={open === 2}
//             onClick={() => handleOpen(2)}
//             className="px-3 py-[9px] hover:bg-opacity-20 text-gray-500 select-none focus:bg-opacity-20 active:bg-opacity-20 data-[selected=true]:bg-gray-50/20 hover:text-white focus:text-white active:text-white data-[selected=true]:text-white"
//           >
//             <ListItemPrefix>
//               <RectangleGroupIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             <Typography className="mr-auto font-normal text-inherit">
//               Dashboard
//             </Typography>
//             <ChevronDownIcon
//               strokeWidth={3}
//               className={`ml-auto text-gray-500 h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
//             />
//           </ListItem>
//           <AccordionBody className="py-1">
//             <List className="p-0">
//               <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
//                 Analytics
//               </ListItem>
//               <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
//                 Sales
//               </ListItem>
//             </List>
//           </AccordionBody>
//         </Accordion>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <Square2StackIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Products
//         </ListItem>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <TicketIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Orders
//         </ListItem>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <UserGroupIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Customers
//         </ListItem>
//       </List>
//       <hr className="my-2 border-gray-800" />
//       <List>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Help & Support
//         </ListItem>
//         <ListItem className={LIST_ITEM_STYLES}>
//           <ListItemPrefix>
//             <ArrowLeftStartOnRectangleIcon
//               strokeWidth={2.5}
//               className="h-5 w-5"
//             />
//           </ListItemPrefix>
//           Sign Out
//         </ListItem>
//       </List>
//       <Alert
//         open={openAlert}
//         className="mt-auto bg-gray-800"
//         variant="ghost"
//       >
//         <Typography
//           variant="small"
//           color="white"
//           className="mb-1 font-bold"
//         >
//           New Version Available
//         </Typography>
//         <Typography variant="small" color="white" className="font-normal">
//           Update your app and enjoy the new features and improvements.
//         </Typography>
//         <div className="mt-4 flex gap-4">
//           <Typography
//             as="a"
//             href="#"
//             variant="small"
//             color="white"
//             className="font-normal"
//             onClick={() => setOpenAlert(false)}
//           >
//             Dismiss
//           </Typography>
//           <Typography
//             as="a"
//             href="#"
//             variant="small"
//             color="white"
//             className="font-medium"
//           >
//             Upgrade Now
//           </Typography>
//         </div>
//       </Alert>
//       <Typography
//         variant="small"
//         className="mt-5 font-medium text-gray-400 flex justify-center"
//       >
//         mt v2.1.2
//       </Typography>
//     </Card>
//   );
// }

// export function Sidebar1() {
//   return (
//     <section className="grid place-items-center">
//       <div className="grid gap-10 md:grid-cols-2 grid-cols-1">
//         <SidebarLight />
//         <SidebarDark />
//       </div>
//     </section>
//   );
// }

// export default Sidebar1;