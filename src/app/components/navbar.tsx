"use client";

import { Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "../assets/image.jpg";

export function NavbarComp() {
  return (
    <Navbar fluid rounded className="bg-black">
      <Navbar.Brand>
        <Image src={Logo} alt="Flowbite logo" width={40} height={40} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">Valorant Insights</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="font-bold text-neutral-500" href="/" active>Home</Navbar.Link>
        <Navbar.Link className="font-bold text-neutral-500" href="../agents">Agents</Navbar.Link>
        <Navbar.Link className="font-bold text-neutral-500" href="#">Stats</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
