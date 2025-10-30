import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">KUN</div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm hover:text-secondary transition-colors">
              Products and Solutions
            </a>
            <a href="#about" className="text-sm hover:text-secondary transition-colors">
              About Us
            </a>
            <a href="#join" className="text-sm hover:text-secondary transition-colors">
              Join Us
            </a>
            <a href="#platform" className="text-sm hover:text-secondary transition-colors">
              Open Platform
            </a>
            <a href="#contact" className="text-sm hover:text-secondary transition-colors">
              Contact Us
            </a>
          </nav>

          <Button variant="secondary" size="sm" className="rounded-full px-6">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
