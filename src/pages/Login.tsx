import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import {AuthService} from "@/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 模拟登录 - 实际应用需要后端API
    /*setTimeout(() => {
      if (email && password) {
        toast({
          title: "登录成功",
          description: "欢迎回来！",
        });
        navigate("/");
      } else {
        toast({
          title: "登录失败",
          description: "请填写完整的登录信息",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);*/
    try {
      const response = await AuthService.login({
        email:"user@example.com",
        password: "password123"
      });

      if (response.success) {
        setIsLoading(false);
        // 登录成功，保存 token
        localStorage.setItem('auth_token', response.data.token);
        toast({
          title: "登录成功",
          description: "欢迎回来！",
        });
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      // 错误已由拦截器统一处理
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold mb-2">KUN Global</h1>
          </Link>
          <p className="text-muted-foreground">登录您的账户</p>
        </div>

        <div className="bg-card border rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to="/register" className="text-primary hover:underline">
                还没有账户？注册
              </Link>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                忘记密码？
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          登录即表示您同意我们的
          <a href="#" className="text-primary hover:underline ml-1">
            服务条款
          </a>
          和
          <a href="#" className="text-primary hover:underline ml-1">
            隐私政策
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
