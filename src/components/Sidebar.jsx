import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaCross } from "react-icons/fa6";
import { RiCrossLine, RiMenu2Line } from "react-icons/ri";
import { userProfile } from "../constant-images";
import { RxCross2 } from "react-icons/rx";

function Sidebar() {
  const [isopen, setOpen] = useState(true);
  const [submenuOpen, setsubmenuOpen] = useState(true);
  const [Menus, setmenu] = useState([
    {
      "title": "MENU",
      "submenu": [{ "title": "Sell" }, { "title": "Accounts" }]
    },
    {
      "title": "Users",
      "submenu": [{ "title": "View User" }, { "title": "Current Info" }]
    },
    {
      "title": "Profile",
      "submenu": [{ "title": "Details" }, { "title": "Credentials" }]
    }
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetch("http://localhost:7000/showMenu");
  //       const jsondat = await data.json(); // Parse JSON from the response
  //       setmenu([
  //         {
  //           "title": "MENU",
  //           "inserSubMenu": [{ "title": "Sell" }, { "title": "Accounts" }]
  //         }
  //       ])
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty array ensures this runs only once, on component mount

  const toggleSubmenu = (index) => {
    setsubmenuOpen((prevState) => ({
      [index]: !prevState[index],
    }));
  };

  if (!Menus) {
    return <div>Error loading menu data</div>; // Display error state if menus is null
  }
  return (<>

    <div
      className={`absolute py-2 w-[280px]  h-screen ${!isopen ? "translate-x-[-100%] " : "translate-x-0  "
        } ease-in-out duration-500 bg-slate-800 `}
    >
      <div
        className="absolute z-10 text-2xl font-extrabold top-5 right-[-40px] cursor-pointer "

        onClick={() => setOpen((prev) => !prev)}
      >
        {!isopen ? <RiMenu2Line /> : <RxCross2 />}
      </div>

      <div className="py-3 flex flex-col items-center">

        <img className="w-28 h-28 object-cover rounded-full" src={userProfile} alt="" />

        <h3 className="text-xl font-bold mt-2 text-white text-center">Welcome, User</h3>
        <p className="text-base text-gray-300 mt-1 text-center">user@gmail.com</p>

        <ul className="w-[100%] mt-4">
          {Menus.map((value, index) => {
            return (
              <>
                <li
                  className="flex justify-between items-center w-[100%] px-6 py-3 font-bold text-gray-200  hover:bg-slate-600 bg-slate-700 border-b-[1px] border-b-slate-800"
                  onClick={() => {
                    toggleSubmenu(index);
                  }}
                >
                  {value.title}
                  {value.submenu && (
                    <FaAngleDown className="mt-1" />
                  )}
                </li>

                {value.submenu && submenuOpen[index] && (
                  <ul className="w-full">
                    {value.submenu.map((subMenus, index) => {
                      return (
                        <li
                          key={index}
                          className="cursor-pointer w-[100%] hover:bg-slate-600 bg-slate-800  font-semibold px-7 py-[6px] text-gray-200 border-b-[0.5px] border-b-slate-600"
                        >
                          {subMenus.title}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  </>
  );
}


export default Sidebar;
