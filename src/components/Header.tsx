import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">KUN</div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm hover:text-secondary transition-colors">
              产品与解决方案
            </a>
            <a href="#about" className="text-sm hover:text-secondary transition-colors">
              关于我们
            </a>
            <a href="#join" className="text-sm hover:text-secondary transition-colors">
              加入我们
            </a>
            <a href="#platform" className="text-sm hover:text-secondary transition-colors">
              开放平台
            </a>
            <a href="#contact" className="text-sm hover:text-secondary transition-colors">
              联系我们
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="secondary" size="sm" className="rounded-full px-6">
                登录
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="sm" className="rounded-full px-6 border-secondary text-secondary hover:bg-secondary hover:text-primary">
                注册
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
