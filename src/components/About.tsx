import { GraduationCap, Code, Heart } from "lucide-react";

const About = () => {
  const items = [
    { icon: GraduationCap, text: "Sinh viên năm cuối chuyên ngành Phát triển Phần mềm tại Cao đẳng FPT Polytechnic" },
    { icon: Heart, text: "Xây dựng giao diện hướng tới trải nghiệm người dùng tối ưu và phong cách thiết kế hiện đại" },
    { icon: Code, text: "Chuyên sâu về Framework Laravel (PHP) và hệ sinh thái VueJS cho các dự án Web hiệu năng cao" },
  ];


  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <h2 className="font-display text-3xl font-bold mb-2 text-center">
          <span className="gradient-text">Giới thiệu</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 font-display text-sm">About Me</p>

        <div className="max-w-3xl mx-auto grid gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border card-hover"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon size={20} className="text-primary" />
              </div>
              <p className="text-secondary-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
