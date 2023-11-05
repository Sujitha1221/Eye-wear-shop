import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Person2Icon from "@mui/icons-material/Person2";

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  return (
    <>
      <div className="h-[64px] w-10xl fixed top-0 w-full flex justify-between px-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)]  z-10 bg-white relative flex items-center">
        <Menu
          as="div"
          className="absolute right-[20px] w-10xl"
        >
          <div>
            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-cyan-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-700">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Person2Icon
                style={{ color: "white", height: "30px", width: "30px" }}
                aria-hidden="false"
              ></Person2Icon>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default Header;
