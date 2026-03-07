const skills = [
  { name: "HTML / CSS", level: 90 },
  { name: "JavaScript", level: 80 },
  { name: "PHP", level: 75 },
  { name: "MySQL", level: 70 },
  { name: "Laravel", level: 65 },
  { name: "UI/UX Design", level: 70 },
  { name: "Git / Github", level: 75 },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-card/50">
      <div className="section-container">
        <h2 className="font-display text-3xl font-bold mb-2 text-center">
          <span className="gradient-text">Kỹ năng</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 font-display text-sm">Skills</p>

        <div className="max-w-2xl mx-auto grid gap-6">
          {skills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-display text-sm font-medium">{skill.name}</span>
                <span className="font-display text-sm text-primary">{skill.level}%</span>
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill animate-skill-fill"
                  style={{ "--skill-level": `${skill.level}%`, animationDelay: `${i * 0.1}s` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
