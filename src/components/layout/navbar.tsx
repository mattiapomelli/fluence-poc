import { Button } from "@components/basic/button";
import { Logo } from "@components/basic/logo";
import { ThemeToggle } from "@components/basic/theme-toggle";

import { Container } from "./container";

export const Navbar = () => {
  return (
    <header className="flex items-center py-6">
      <Container className="flex w-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button>Get started</Button>
        </div>
      </Container>
    </header>
  );
};
