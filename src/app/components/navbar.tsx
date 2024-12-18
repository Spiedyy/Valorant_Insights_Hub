"use client";

import { Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "../assets/image.jpg";
import { usePathname } from "next/navigation";

export function NavbarComp() {
  const pathname = usePathname();

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
        <Navbar.Link className="font-bold text-neutral-500" href="/" active={pathname === '/'}>Home</Navbar.Link>
        <Navbar.Link className="font-bold text-neutral-500" href="../agents" active={pathname === '/agents'}>Agents</Navbar.Link>
        <Navbar.Link className="font-bold text-neutral-500" href="/" active={pathname === 'stats'}>Stats</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
