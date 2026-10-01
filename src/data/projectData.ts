export interface ProjectStat {
  label: string;
  value: string;
  subtext: string;
  isPlaceholder?: boolean;
}

export const projectMeta = {
  name: "Advanced MPIDISM",
  fullName: "Multilingual Political Ideology Detection in Indian Social Media",
  shortPitch: "Classifying election discourse in Hindi, Hinglish, Bengali, Tamil, and English across pro-, anti-, and neutral stances for major Indian political parties.",
  repositoryUrl: "https://github.com/adiris123/election-data-pipeline",
  coreModel: "google/muril-base-cased",
  languages: [
    { code: "hi", name: "Hindi", script: "Devanagari" },
    { code: "hi-en", name: "Hinglish", script: "Roman Latin" },
    { code: "bn", name: "Bengali", script: "Bengali" },
    { code: "ta", name: "Tamil", script: "Tamil" },
    { code: "en", name: "English", script: "Latin" },
  ],
  parties: [
    { code: "BJP", name: "Bharatiya Janata Party", color: "#f97316" },
    { code: "Congress", name: "Indian National Congress", color: "#3b82f6" },
    { code: "AAP", name: "Aam Aadmi Party", color: "#06b6d4" },
    { code: "TMC", name: "All India Trinamool Congress", color: "#10b981" },
  ],
  keyMetrics: [
    {
      label: "Languages Analyzed",
      value: "5",
      subtext: "Hindi, Hinglish, Bengali, Tamil, English",
      isPlaceholder: false,
    },
    {
      label: "Political Entities",
      value: "4 Parties",
      subtext: "BJP, Congress, AAP, TMC + Neutral",
      isPlaceholder: false,
    },
    {
      label: "Ideology Classes",
      value: "9 Classes",
      subtext: "Pro/Anti per party + 1 Neutral",
      isPlaceholder: false,
    },
    {
      label: "Core Target F1",
      value: ">= 0.88",
      subtext: "Prototype 3 MuRIL fine-tuning target",
      isPlaceholder: false,
    },
    {
      label: "Estimated Tweets / Posts",
      value: "~50,000+",
      subtext: "IndiaVotes2024 + RSS + Reddit collector",
      isPlaceholder: true,
    },
    {
      label: "Constituencies Mapped",
      value: "543 Seats",
      subtext: "2024 Lok Sabha election results integration",
      isPlaceholder: false,
    }
  ] as ProjectStat[],
};
