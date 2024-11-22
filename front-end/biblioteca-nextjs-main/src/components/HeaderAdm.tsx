"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import Image from "next/image";

const HeaderAdm = () => {
    return (
        <Navbar className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <NavbarBrand>
                <Link href="/">
                    <div className="relative w-32 h-8">
                        <Image
                            src="/image/logoverde.png"
                            alt="Logo"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/catalogo">Catálogo</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/books">Livros</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/emprestimos">Empréstimos</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/">Alunos</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default HeaderAdm;


