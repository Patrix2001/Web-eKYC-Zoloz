import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

const Dropdown = ({ text, data, action }) => {
    //Requirement => type data JSON : name and description
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    return (
      <>
        <div className="ml-3 item-center flex">
          <div className="w-44 my-auto">
            <p className="text-lg">{text}</p>
          </div>
          <Menu as="div">
            <Menu.Button className="bg-blue-700 rounded-md hover:bg-blue-800 px-4 py-2 text-md text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-90">
              {name ? name : text}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {data.map((arr, idx) => (
                    <Menu.Item key={idx}>
                      {({ active }) => (
                        <button
                          type="button"
                          className={`${active && "bg-blue-200"
                            } group w-full flex items-center rounded-md py-2 text-sm px-4`}
                          onClick={() => {
                            setName(arr.name);
                            setDescription(arr.description);
                            action(arr.name);
                          }}
                        >
                          {arr.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="mx-3 my-4">
          Description : {description}
        </div>
      </>
    )
  }

export default Dropdown;