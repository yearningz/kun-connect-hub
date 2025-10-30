import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

const Identity = () => {
  const [formData, setFormData] = useState({
    realName: "",
    idType: "",
    idNumber: "",
    nationality: "",
    frontImage: null as File | null,
    backImage: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      [field]: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 模拟提交 - 实际应用需要后端API
    setTimeout(() => {
      toast({
        title: "提交成功",
        description: "您的身份信息正在审核中，请耐心等待",
      });
      navigate("/");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold mb-2">KUN Global</h1>
          </Link>
          <p className="text-muted-foreground">身份认证</p>
        </div>

        <div className="bg-card border rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">实名认证</h2>
            <p className="text-sm text-muted-foreground">
              为了保障您的账户安全，请完成实名认证
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="realName">真实姓名 *</Label>
              <Input
                id="realName"
                name="realName"
                type="text"
                placeholder="请输入真实姓名"
                value={formData.realName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idType">证件类型 *</Label>
                <Select
                  value={formData.idType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, idType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择证件类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id_card">身份证</SelectItem>
                    <SelectItem value="passport">护照</SelectItem>
                    <SelectItem value="driver_license">驾驶证</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">国籍 *</Label>
                <Select
                  value={formData.nationality}
                  onValueChange={(value) =>
                    setFormData({ ...formData, nationality: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择国籍" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="china">中国</SelectItem>
                    <SelectItem value="usa">美国</SelectItem>
                    <SelectItem value="uk">英国</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">证件号码 *</Label>
              <Input
                id="idNumber"
                name="idNumber"
                type="text"
                placeholder="请输入证件号码"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>证件照片 *</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="frontImage"
                    className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.frontImage ? formData.frontImage.name : "上传证件正面"}
                    </span>
                  </Label>
                  <input
                    id="frontImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "frontImage")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="backImage"
                    className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.backImage ? formData.backImage.name : "上传证件反面"}
                    </span>
                  </Label>
                  <input
                    id="backImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "backImage")}
                    required
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                请确保照片清晰，证件信息完整可见，支持JPG、PNG格式，单张不超过5MB
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                返回
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "提交中..." : "提交认证"}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>您的信息将被严格保密，仅用于身份验证</p>
        </div>
      </div>
    </div>
  );
};

export default Identity;
