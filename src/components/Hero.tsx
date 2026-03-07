import { ArrowDown } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center section-container relative">
      <div className="grid md:grid-cols-2 gap-12 items-center w-full pt-16">
        {/* Text */}
        <div className="order-2 md:order-1 animate-fade-up">
          <p className="font-display text-primary text-sm mb-4">Xin chào, mình là</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-4">
            Nguyễn Tuấn{" "}
            <span className="gradient-text">Nghĩa</span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-muted-foreground font-display mb-6">
            Web Developer
          </h2>
          <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
            Xây dựng website hiện đại và tối ưu trải nghiệm người dùng.
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Xem dự án
            <ArrowDown size={16} />
          </a>
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
