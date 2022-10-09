import { Button } from "@components/basic/button";
import { Logo } from "@components/basic/logo";

import { Container } from "./container";

export const Navbar = () => {
  return (
    <header className="flex items-center py-6">
      <Container className="flex w-full items-center justify-between">
        <Logo />
        <Button>Get started</Button>
      </Container>
    </header>
  );
};
