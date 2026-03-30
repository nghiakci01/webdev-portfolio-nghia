import { ArrowDown, Github, Facebook, Linkedin } from "lucide-react";
import avatarImg from "@/assets/1.jpg";
import { contactInfo } from "@/lib/config";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center section-container relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center w-full pt-20 pb-10">
        {/* Text */}
        <div className="order-2 md:order-1 animate-fade-up">
          <p className="font-display text-primary text-sm mb-4">Xin chào, mình là</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-tight mb-4 tracking-tight">
            Nguyễn Tuấn{" "}
            <span className="gradient-text">Nghĩa</span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-muted-foreground font-display mb-8">
            Web Developer
          </h2>
          <p className="text-muted-foreground max-w-md mb-10 leading-relaxed text-base">
            Xây dựng website hiện đại, tối ưu trải nghiệm người dùng và mang đậm dấu ấn cá nhân.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Xem dự án
              <ArrowDown size={16} />
            </a>
            
            <div className="flex items-center gap-5">
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:-translate-y-1">
                <Facebook size={22} />
              </a>
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:-translate-y-1">
                <Github size={22} />
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:-translate-y-1">
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="order-1 md:order-2 flex justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden glow-border animate-float">
              <img
                src={avatarImg}
                alt="Nguyễn Tuấn Nghĩa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-primary/10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
