const SITE = {
  name: "Muhammad Umer",
  role: "3D artist, Programmer, and Game Developer",
  tagline: "Blender renders, C++ and Godot projects, and open source work.",
  
  // Email split into two strings to hide from basic web scrapers
  email: "Umerharoon4590" + "@" + "gmail.com",

  // Your usernames. While github is "yourname" the site shows placeholder
  // contribution data; set your real username to load live data
  github: "BlazerUmer",
  
  // Update this below if you change your custom URL on LinkedIn!
  linkedin: "muhammad-umer-fast",
  instagram: "kms_umer",

  // Add a render: put the image in /images and add a line here.
  renders: [
    { src: "images/render-1.png", title: "The Donut. My Very First Render.", tools: "Blender" },
    { src: "images/render-2.png", title: "Cup and Vase Practise Model", tools: "Blender" },
    { src: "images/render-3.png", title: "Coming Soon", tools: "Blender" },
    { src: "images/render-4.png", title: "Coming Soon", tools: "Blender" }
  ],

  // icon: godot | github | code | cpp | blender | git
  projects: [
    {
      title: "Slime Fighter a Godot Game",
      desc: "A small 2D platforming game made with Godot Called Slime Fighter.",
      tags: ["Godot", "GDScript"],
      url: "https://github.com/BlazerUmer/My-First-game-in-godot.-Slime-Fighter",
      icon: "godot"
    },
    {
      title: "Programming Fundamentals Coursework",
      desc: "C++ projects with a focus on efficiency and learning ability.",
      tags: ["C++", "GitHub"],
      url: "https://github.com/BlazerUmer/Programming-Fundamentals-Assignments",
      icon: "github"
    },
    {
      title: "Another project",
      desc: "Coming Soon.",
      tags: ["C++", "Open Source"],
      url: "",
      icon: "code"
    }
  ],

  events: [
    {
      title: "ACM Game Development Seminar",
      date: "September 2026",
      place: "FAST NUCES Lahore",
      text: "Game Developers from Game District were invited and our team got the opportunity to present a game idea. We went with a story game called Ethan's Memoir which sadly did not win but we got an opportunity to learn and grow.",
      photos: [
        { src: "images/events/acm game dev.jpg", title: "Taken from FAST-NUCES Lahore Facebook" },
        //add more if needed
      ]
    }
  ]
};