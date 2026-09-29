export type CaseStudyMedia =
  | { type: "image"; src: string; alt: string; layout?: "wide" | "side" }
  | { type: "video"; src: string; poster: string; alt: string; layout?: "wide" | "side" };

export type CaseStudySection = {
  title: string;
  paragraphs: string[];
  media?: CaseStudyMedia[];
  titleLayout?: "inline" | "stacked";
};

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  caption: string;
  services: string[];
  heroMedia:
    | { type: "image"; src: string; alt: string }
    | { type: "video"; src: string; poster: string; alt: string };
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "finca-sol-y-cielo",
    category: "Estate, country property, or farm",
    title: "A Sanctuary Where the Sun, Sky & Earth Unite",
    caption:
      "Bold design. Smooth shopping. Faster checkouts. We build high-performing stores that turn clicks into customers and scale with your business.",
    services: ["Logo Design", "Branding Design", "Social Media Creatives"],
    heroMedia: {
      type: "video",
      src: "/images/case-studies-list-images/case-study-1/video1.mp4",
      poster: "/images/case-studies-list-images/case-study-1/featuredimage.webp",
      alt: "Finca Sol y Cielo brand introduction video",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Steffi and Claudia are two sisters with a dream to open a Bed & Breakfast in Málaga, Spain. They approached us to craft a brand identity that would reflect their vision of a home away from home. Nestled among olive groves with panoramic ocean views, Finca Sol y Cielo needed a brand that balanced tranquility and adventure for international guests seeking comfort and an unforgettable experience.",
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "To position Finca Sol y Cielo effectively, we took a deep-dive into the competitive landscape, focusing on the top searched hotels and B&Bs in the area. Commonly they leaned into a luxurious aesthetic or overly relaxed and bohemian feel. Few truly captured the homey and contemporary essence we aimed to create.",
          "Based on this insight we began to set the scene for a brand direction that felt welcoming and stylish, but embraced a playful charm within its storytelling and visuals. By integrating warmth and a sense of authenticity, our aim was to establish a clear identity that will resonate with guests looking for a genuine Andalusian retreat.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/featuredimage.webp",
            alt: "Finca Sol y Cielo courtyard identity",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The design phase kicked-off with extensive moodboarding to align the visual direction with the brand's essence. Drawing from the surrounding landscape, we developed a warm and earthy colour palette inspired by the nearby surrounds. These natural tones reinforce the brand's connection to its environment while maintaining a cozy and inviting feel. Each design decision made, ensured that Finca Sol y Cielo exuded a sense of place where one felt both rooted in tradition with a fresh execution.",
        ],
        media: [
          {
            type: "video",
            src: "/images/case-studies-list-images/case-study-1/video2.mp4",
            poster: "/images/case-studies-list-images/case-study-1/Design1.webp",
            alt: "Finca Sol y Cielo design process video",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/Design1.webp",
            alt: "Finca Sol y Cielo brand moodboard",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/Design2.webp",
            alt: "Finca Sol y Cielo stationery and identity applications",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/Design3.webp",
            alt: "Finca Sol y Cielo landscape identity graphic",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
          titleLayout: "stacked",
        paragraphs: [
          "The logo is a visual representation of the heart of Finca Sol y Cielo: the unity of two sisters and the breathtaking horizon viewed from the B&B courtyard. The elegant, flowing typography reflects the organic forms of Andalusian architecture, while the composition embodies a sense of harmony, connection, and serenity.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/Logo.webp",
            alt: "Finca Sol y Cielo logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Launch Assets",
        paragraphs: [
          "We completed the brand suite with a social media strategy designed to build engagement and awareness. Through a discovery exercise, we established four key brand pillars, a structured posting pattern, and a set of editable branded templates. This approach ensures a content mix that is both informative and valuable to potential guests and followers while maintaining a cohesive and visually compelling social media presence.",
        ],
        media: [
          {
            type: "video",
            src: "/images/case-studies-list-images/case-study-1/video3.mp4",
            poster: "/images/case-studies-list-images/case-study-1/last-image.webp",
            alt: "Finca Sol y Cielo launch assets video",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-1/last-image.webp",
            alt: "Finca Sol y Cielo final launch visual",
            layout: "wide",
          },
        ],
      },
    ],
  },
  {
    slug: "appcues-product-adoption",
    category: "Estate, country property, or farm",
    title: "Reimagining Product Adoption for Appcues",
    caption:
      "Bold design. Smooth shopping. Faster checkouts. We build high-performing stores that turn clicks into customers and scale with your business.",
    services: ["Logo Design", "Branding Design", "Social Media Creatives"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-2/featuredimage.webp",
      alt: "Appcues product adoption featured visual",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Steffi and Claudia are two sisters with a dream to open a Bed & Breakfast in Málaga, Spain. They approached us to craft a brand identity that would reflect their vision of a home away from home. Nestled among olive groves with panoramic ocean views, Finca Sol y Cielo needed a brand that balanced tranquility and adventure for international guests seeking comfort and an unforgettable experience.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/the-challangeimage.webp",
            alt: "Appcues challenge overview visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "To position Finca Sol y Cielo effectively, we took a deep-dive into the competitive landscape, focusing on the top searched hotels and B&Bs in the area. Commonly they leaned into a luxurious aesthetic or overly relaxed and bohemian feel. Few truly captured the homey and contemporary essence we aimed to create.",
          "Based on this insight we began to set the scene for a brand direction that felt welcoming and stylish, but embraced a playful charm within its storytelling and visuals. By integrating warmth and a sense of authenticity, our aim was to establish a clear identity that will resonate with guests looking for a genuine Andalusian retreat.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/the-discover.webp",
            alt: "Appcues discovery research visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The design phase kicked-off with extensive moodboarding to align the visual direction with the brand's essence. Drawing from the surrounding landscape, we developed a warm and earthy colour palette inspired by the nearby surrounds. These natural tones reinforce the brand's connection to its environment while maintaining a cozy and inviting feel. Each design decision made, ensured that Finca Sol y Cielo exuded a sense of place where one felt both rooted in tradition with a fresh execution.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/design1.webp",
            alt: "Appcues design exploration one",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/design2.webp",
            alt: "Appcues design exploration two",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        paragraphs: [
          "The logo is a visual representation of the heart of Finca Sol y Cielo: the unity of two sisters and the breathtaking horizon viewed from the B&B courtyard. The elegant, flowing typography reflects the organic forms of Andalusian architecture, while the composition embodies a sense of harmony, connection, and serenity.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/logo.webp",
            alt: "Appcues logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Launch Assets",
        paragraphs: [
          "We completed the brand suite with a social media strategy designed to build engagement and awareness. Through a discovery exercise, we established four key brand pillars, a structured posting pattern, and a set of editable branded templates. This approach ensures a content mix that is both informative and valuable to potential guests and followers while maintaining a cohesive and visually compelling social media presence.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/ui1.webp",
            alt: "Appcues UI screen one",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/ui2.webp",
            alt: "Appcues UI screen two",
            layout: "wide",
          },
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-2/ui3.webp",
            alt: "Appcues UI screen three",
            layout: "wide",
          },
        ],
      },
    ],
  },
  {
    slug: "agent-bounty",
    category: "Estate, country property, or farm",
    title: "AgentBounty",
    caption:
      "Bold design. Smooth shopping. Faster checkouts. We build high-performing stores that turn clicks into customers and scale with your business.",
    services: ["Logo Design", "Branding Design", "Social Media Creatives"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-3/1.webp",
      alt: "AgentBounty featured visual",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Steffi and Claudia are two sisters with a dream to open a Bed & Breakfast in Málaga, Spain. They approached us to craft a brand identity that would reflect their vision of a home away from home. Nestled among olive groves with panoramic ocean views, Finca Sol y Cielo needed a brand that balanced tranquility and adventure for international guests seeking comfort and an unforgettable experience.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/1.webp",
            alt: "AgentBounty challenge overview visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "To position Finca Sol y Cielo effectively, we took a deep-dive into the competitive landscape, focusing on the top searched hotels and B&Bs in the area. Commonly they leaned into a luxurious aesthetic or overly relaxed and bohemian feel. Few truly captured the homey and contemporary essence we aimed to create.",
          "Based on this insight we began to set the scene for a brand direction that felt welcoming and stylish, but embraced a playful charm within its storytelling and visuals. By integrating warmth and a sense of authenticity, our aim was to establish a clear identity that will resonate with guests looking for a genuine Andalusian retreat.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/1.webp",
            alt: "AgentBounty discovery research visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The design phase kicked-off with extensive moodboarding to align the visual direction with the brand's essence. Drawing from the surrounding landscape, we developed a warm and earthy colour palette inspired by the nearby surrounds. These natural tones reinforce the brand's connection to its environment while maintaining a cozy and inviting feel. Each design decision made, ensured that Finca Sol y Cielo exuded a sense of place where one felt both rooted in tradition with a fresh execution.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/1.webp",
            alt: "AgentBounty design exploration",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        paragraphs: [
          "The logo is a visual representation of the heart of Finca Sol y Cielo: the unity of two sisters and the breathtaking horizon viewed from the B&B courtyard. The elegant, flowing typography reflects the organic forms of Andalusian architecture, while the composition embodies a sense of harmony, connection, and serenity.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/1.webp",
            alt: "AgentBounty logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Launch Assets",
        paragraphs: [
          "We completed the brand suite with a social media strategy designed to build engagement and awareness. Through a discovery exercise, we established four key brand pillars, a structured posting pattern, and a set of editable branded templates. This approach ensures a content mix that is both informative and valuable to potential guests and followers while maintaining a cohesive and visually compelling social media presence.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-3/1.webp",
            alt: "AgentBounty launch assets visual",
            layout: "wide",
          },
        ],
      },
    ],
  },
  {
    slug: "synthesis",
    category: "Estate, country property, or farm",
    title: "Synthesis",
    caption:
      "Bold design. Smooth shopping. Faster checkouts. We build high-performing stores that turn clicks into customers and scale with your business.",
    services: ["Logo Design", "Branding Design", "Social Media Creatives"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-4/3.webp",
      alt: "Synthesis featured visual",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Steffi and Claudia are two sisters with a dream to open a Bed & Breakfast in Málaga, Spain. They approached us to craft a brand identity that would reflect their vision of a home away from home. Nestled among olive groves with panoramic ocean views, Finca Sol y Cielo needed a brand that balanced tranquility and adventure for international guests seeking comfort and an unforgettable experience.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/3.webp",
            alt: "Synthesis challenge overview visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "To position Finca Sol y Cielo effectively, we took a deep-dive into the competitive landscape, focusing on the top searched hotels and B&Bs in the area. Commonly they leaned into a luxurious aesthetic or overly relaxed and bohemian feel. Few truly captured the homey and contemporary essence we aimed to create.",
          "Based on this insight we began to set the scene for a brand direction that felt welcoming and stylish, but embraced a playful charm within its storytelling and visuals. By integrating warmth and a sense of authenticity, our aim was to establish a clear identity that will resonate with guests looking for a genuine Andalusian retreat.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/3.webp",
            alt: "Synthesis discovery research visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The design phase kicked-off with extensive moodboarding to align the visual direction with the brand's essence. Drawing from the surrounding landscape, we developed a warm and earthy colour palette inspired by the nearby surrounds. These natural tones reinforce the brand's connection to its environment while maintaining a cozy and inviting feel. Each design decision made, ensured that Finca Sol y Cielo exuded a sense of place where one felt both rooted in tradition with a fresh execution.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/3.webp",
            alt: "Synthesis design exploration",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        paragraphs: [
          "The logo is a visual representation of the heart of Finca Sol y Cielo: the unity of two sisters and the breathtaking horizon viewed from the B&B courtyard. The elegant, flowing typography reflects the organic forms of Andalusian architecture, while the composition embodies a sense of harmony, connection, and serenity.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/3.webp",
            alt: "Synthesis logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Launch Assets",
        paragraphs: [
          "We completed the brand suite with a social media strategy designed to build engagement and awareness. Through a discovery exercise, we established four key brand pillars, a structured posting pattern, and a set of editable branded templates. This approach ensures a content mix that is both informative and valuable to potential guests and followers while maintaining a cohesive and visually compelling social media presence.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-4/3.webp",
            alt: "Synthesis launch assets visual",
            layout: "wide",
          },
        ],
      },
    ],
  },
  {
    slug: "richtech-robotics",
    category: "Estate, country property, or farm",
    title: "RichTech Robotics",
    caption:
      "Bold design. Smooth shopping. Faster checkouts. We build high-performing stores that turn clicks into customers and scale with your business.",
    services: ["Logo Design", "Branding Design", "Social Media Creatives"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-5/4.webp",
      alt: "RichTech Robotics featured visual",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Steffi and Claudia are two sisters with a dream to open a Bed & Breakfast in Málaga, Spain. They approached us to craft a brand identity that would reflect their vision of a home away from home. Nestled among olive groves with panoramic ocean views, Finca Sol y Cielo needed a brand that balanced tranquility and adventure for international guests seeking comfort and an unforgettable experience.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-5/4.webp",
            alt: "RichTech Robotics challenge overview visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "To position Finca Sol y Cielo effectively, we took a deep-dive into the competitive landscape, focusing on the top searched hotels and B&Bs in the area. Commonly they leaned into a luxurious aesthetic or overly relaxed and bohemian feel. Few truly captured the homey and contemporary essence we aimed to create.",
          "Based on this insight we began to set the scene for a brand direction that felt welcoming and stylish, but embraced a playful charm within its storytelling and visuals. By integrating warmth and a sense of authenticity, our aim was to establish a clear identity that will resonate with guests looking for a genuine Andalusian retreat.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-5/4.webp",
            alt: "RichTech Robotics discovery research visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The design phase kicked-off with extensive moodboarding to align the visual direction with the brand's essence. Drawing from the surrounding landscape, we developed a warm and earthy colour palette inspired by the nearby surrounds. These natural tones reinforce the brand's connection to its environment while maintaining a cozy and inviting feel. Each design decision made, ensured that Finca Sol y Cielo exuded a sense of place where one felt both rooted in tradition with a fresh execution.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-5/4.webp",
            alt: "RichTech Robotics design exploration",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        paragraphs: [
          "The logo is a visual representation of the heart of Finca Sol y Cielo: the unity of two sisters and the breathtaking horizon viewed from the B&B courtyard. The elegant, flowing typography reflects the organic forms of Andalusian architecture, while the composition embodies a sense of harmony, connection, and serenity.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-5/4.webp",
            alt: "RichTech Robotics logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Launch Assets",
        paragraphs: [
          "We completed the brand suite with a social media strategy designed to build engagement and awareness. Through a discovery exercise, we established four key brand pillars, a structured posting pattern, and a set of editable branded templates. This approach ensures a content mix that is both informative and valuable to potential guests and followers while maintaining a cohesive and visually compelling social media presence.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-5/4.webp",
            alt: "RichTech Robotics launch assets visual",
            layout: "wide",
          },
        ],
      },
    ],
  },
  {
    slug: "myatoms",
    category: "Estate, country property, or farm",
    title: "MyAtoms",
    caption:
      "Bold design. Smooth shopping. Faster checkouts. We build high-performing stores that turn clicks into customers and scale with your business.",
    services: ["Logo Design", "Branding Design", "Social Media Creatives"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-6/5.webp",
      alt: "MyAtoms featured visual",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Steffi and Claudia are two sisters with a dream to open a Bed & Breakfast in Málaga, Spain. They approached us to craft a brand identity that would reflect their vision of a home away from home. Nestled among olive groves with panoramic ocean views, Finca Sol y Cielo needed a brand that balanced tranquility and adventure for international guests seeking comfort and an unforgettable experience.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-6/5.webp",
            alt: "MyAtoms challenge overview visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "To position Finca Sol y Cielo effectively, we took a deep-dive into the competitive landscape, focusing on the top searched hotels and B&Bs in the area. Commonly they leaned into a luxurious aesthetic or overly relaxed and bohemian feel. Few truly captured the homey and contemporary essence we aimed to create.",
          "Based on this insight we began to set the scene for a brand direction that felt welcoming and stylish, but embraced a playful charm within its storytelling and visuals. By integrating warmth and a sense of authenticity, our aim was to establish a clear identity that will resonate with guests looking for a genuine Andalusian retreat.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-6/5.webp",
            alt: "MyAtoms discovery research visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The design phase kicked-off with extensive moodboarding to align the visual direction with the brand's essence. Drawing from the surrounding landscape, we developed a warm and earthy colour palette inspired by the nearby surrounds. These natural tones reinforce the brand's connection to its environment while maintaining a cozy and inviting feel. Each design decision made, ensured that Finca Sol y Cielo exuded a sense of place where one felt both rooted in tradition with a fresh execution.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-6/5.webp",
            alt: "MyAtoms design exploration",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        paragraphs: [
          "The logo is a visual representation of the heart of Finca Sol y Cielo: the unity of two sisters and the breathtaking horizon viewed from the B&B courtyard. The elegant, flowing typography reflects the organic forms of Andalusian architecture, while the composition embodies a sense of harmony, connection, and serenity.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-6/5.webp",
            alt: "MyAtoms logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Launch Assets",
        paragraphs: [
          "We completed the brand suite with a social media strategy designed to build engagement and awareness. Through a discovery exercise, we established four key brand pillars, a structured posting pattern, and a set of editable branded templates. This approach ensures a content mix that is both informative and valuable to potential guests and followers while maintaining a cohesive and visually compelling social media presence.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-6/5.webp",
            alt: "MyAtoms launch assets visual",
            layout: "wide",
          },
        ],
      },
    ],
  },
  {
    slug: "dashi",
    category: "Estate, country property, or farm",
    title: "Dashi",
    caption:
      "Bold design. Smooth shopping. Faster checkouts. We build high-performing stores that turn clicks into customers and scale with your business.",
    services: ["Logo Design", "Branding Design", "Social Media Creatives"],
    heroMedia: {
      type: "image",
      src: "/images/case-studies-list-images/case-study-7/6.webp",
      alt: "Dashi featured visual",
    },
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Steffi and Claudia are two sisters with a dream to open a Bed & Breakfast in Málaga, Spain. They approached us to craft a brand identity that would reflect their vision of a home away from home. Nestled among olive groves with panoramic ocean views, Finca Sol y Cielo needed a brand that balanced tranquility and adventure for international guests seeking comfort and an unforgettable experience.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-7/6.webp",
            alt: "Dashi challenge overview visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Discover",
        paragraphs: [
          "To position Finca Sol y Cielo effectively, we took a deep-dive into the competitive landscape, focusing on the top searched hotels and B&Bs in the area. Commonly they leaned into a luxurious aesthetic or overly relaxed and bohemian feel. Few truly captured the homey and contemporary essence we aimed to create.",
          "Based on this insight we began to set the scene for a brand direction that felt welcoming and stylish, but embraced a playful charm within its storytelling and visuals. By integrating warmth and a sense of authenticity, our aim was to establish a clear identity that will resonate with guests looking for a genuine Andalusian retreat.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-7/6.webp",
            alt: "Dashi discovery research visual",
            layout: "wide",
          },
        ],
      },
      {
        title: "Design",
        paragraphs: [
          "The design phase kicked-off with extensive moodboarding to align the visual direction with the brand's essence. Drawing from the surrounding landscape, we developed a warm and earthy colour palette inspired by the nearby surrounds. These natural tones reinforce the brand's connection to its environment while maintaining a cozy and inviting feel. Each design decision made, ensured that Finca Sol y Cielo exuded a sense of place where one felt both rooted in tradition with a fresh execution.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-7/6.webp",
            alt: "Dashi design exploration",
            layout: "wide",
          },
        ],
      },
      {
        title: "Logo",
        titleLayout: "stacked",
        paragraphs: [
          "The logo is a visual representation of the heart of Finca Sol y Cielo: the unity of two sisters and the breathtaking horizon viewed from the B&B courtyard. The elegant, flowing typography reflects the organic forms of Andalusian architecture, while the composition embodies a sense of harmony, connection, and serenity.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-7/6.webp",
            alt: "Dashi logo mark",
            layout: "side",
          },
        ],
      },
      {
        title: "Launch Assets",
        paragraphs: [
          "We completed the brand suite with a social media strategy designed to build engagement and awareness. Through a discovery exercise, we established four key brand pillars, a structured posting pattern, and a set of editable branded templates. This approach ensures a content mix that is both informative and valuable to potential guests and followers while maintaining a cohesive and visually compelling social media presence.",
        ],
        media: [
          {
            type: "image",
            src: "/images/case-studies-list-images/case-study-7/6.webp",
            alt: "Dashi launch assets visual",
            layout: "wide",
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);

  if (index === -1 || caseStudies.length < 2) return undefined;

  return caseStudies[(index + 1) % caseStudies.length];
}
