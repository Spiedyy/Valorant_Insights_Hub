"use client";

import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "../assets/image.jpg";
import { motion } from "framer-motion";

export function NavbarComp() {
  return (
    <Navbar fluid rounded className="bg-black">
      <Navbar.Brand>
        <Image src={Logo} alt="Flowbite logo" width={40} height={40} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">Valorant Insights</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          className="bg-neutral-800 p-2 px-4 hover:bg-neutral-700 text-white rounded-md font-bold"
        >Login
        </motion.button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="font-bold" href="#" active>Home</Navbar.Link>
        <Navbar.Link className="font-bold" href="#">About</Navbar.Link>
        <Navbar.Link className="font-bold" href="#">Services</Navbar.Link>
        <Navbar.Link className="font-bold" href="#">Pricing</Navbar.Link>
        <Navbar.Link className="font-bold" href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
