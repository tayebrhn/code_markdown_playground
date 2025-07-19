interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
  features: Feature[];
  screenshots: Screenshot[];
}

// Example data - replace with your project details
  export const projectData:ProjectData = {
    title: "Ethiopian Calendar App",
    subtitle: "Cross-platform cultural calendar with date conversion",
    description:
      "A Flutter-based mobile application that seamlessly converts between Ethiopian and Gregorian calendars, featuring local holidays, cultural events, and an intuitive date picker interface.",
    githubUrl: "https://github.com/yourusername/ethiopian-calendar",
    liveUrl: "https://yourusername.github.io/ethiopian-calendar-demo",
    techStack: ["Flutter", "Dart", "Material Design", "Local Storage"],
    features: [
      {
        title: "Date Conversion",
        description:
          "Seamlessly convert between Ethiopian and Gregorian calendar systems with accuracy",
        icon: <Monitor className="w-6 h-6" />,
      },
      {
        title: "Cultural Events",
        description:
          "Display Ethiopian holidays, festivals, and important cultural dates",
        icon: <Smartphone className="w-6 h-6" />,
      },
      {
        title: "Intuitive Interface",
        description: "Clean, user-friendly design optimized for daily use",
        icon: <Code className="w-6 h-6" />,
      },
    ],
    screenshots: [
      {
        src: "/api/placeholder/400/600",
        alt: "Main calendar view",
        caption: "Main calendar interface with date conversion",
      },
      {
        src: "/api/placeholder/400/600",
        alt: "Cultural events view",
        caption: "Cultural events and holidays display",
      },
      {
        src: "/api/placeholder/400/600",
        alt: "Date picker interface",
        caption: "Intuitive date picker component",
      },
    ],
  };