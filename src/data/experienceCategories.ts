/** Map experience item title to video path(s) (served from `public/`). */
export type VideoMapValue = string | string[];

const brandRevealVideos: string[] = [
  '/Brand/Axis securities_3.mp4',
  '/Brand/Bayers HighRess.mp4',
  '/Brand/Copy of Legrand Render Music And Sfx_compress.mp4',
  '/Brand/Final OC Video.mp4',
  '/Brand/Flexi Term Pro with Audio Compressed.mp4',
  '/Brand/Kotak_Plan of action_v1.mp4',
  '/Brand/motion graphics_Merck Animation Final .mp4',
  '/Brand/motion graphics_Values Video.mp4',
  '/Brand/RI Video - Housing Societies_v2_compress.mp4',
  '/Brand/Welcome_wall_osaka.mp4',
];

const logoAnimations: string[] = [
  '/logoanimations/1 Logo Animation V2.mp4',
  '/logoanimations/2 Logo Animation V2.mp4',
  '/logoanimations/ignite logo animation v2.mp4',
  '/logoanimations/master logo 9_16.mp4',
  '/logoanimations/Pidilite titan of triumph logo animation.mp4',
  '/logoanimations/ReAssure-3.0 Logo Animation_Final 1.mp4',
];

const trophyAnimations: string[] = [
  '/trophyanimations/Trophy 01_11.mp4',
  '/trophyanimations/trophy 9x16 high res.mp4',
  '/trophyanimations/Trophy high res.mp4',
  '/trophyanimations/trophy reveal 2.mp4',
  '/trophyanimations/Trophy reveal 6048x1512.mp4',
  '/trophyanimations/trophy reveal final.mp4',
  '/trophyanimations/TROPHY REVEAL_New.mp4',
  '/trophyanimations/Trophy V2.mp4',
];

const destinationReveals: string[] = [
  '/destinationreveal/Bangkok Invite 4.mp4',
  '/destinationreveal/Invitation 2.mp4',
  '/destinationreveal/Vietnam Invitation.mp4',
  '/destinationreveal/Yes Bank London AV .mp4',
];

const speakerIntros: string[] = [
  '/speakerintro/Go Goa Grand 2024.mp4',
  '/speakerintro/intro slate test portrait.mp4',
  '/speakerintro/nesarajan.mp4',
  '/speakerintro/Nilesh Barbade & M Padmakar Rao + Abhijit Roy.mp4',
  '/speakerintro/Prashant Kumar.mp4',
  '/speakerintro/sohit gupta.mp4',
];

const anamorphicDisplays: string[] = [
  '/anamorphic/CBIC_Anamorphic.mp4',
  '/anamorphic/Dabour.mp4',
  '/anamorphic/DLF_Cybercity.MOV',
  '/anamorphic/Invest india For LEd.mp4',
  '/anamorphic/INVEST_INDIA.mp4',
  '/anamorphic/Kotak_Anamorphic_1TEST.mp4',
  '/anamorphic/Pulse.mp4',
  '/anamorphic/Tribeca27s.mp4',
];

export const experienceVideoMap: Record<string, VideoMapValue> = {
  'Quiz Game AV LinkedIn': '/4.mp4',
  'Fruit Cutter Game AV LinkedIn': '/1.mp4',
  'Kinect Game AV LinkedIn': '/2.mp4',
  'Pepsi AR Booth Video': '/6.mp4',
  'AR Photo Booth Reel': '/3.mp4',
  'AI Video Booth Video': '/5.mp4',

  // Visual Displays
  'Anamorphic Displays': anamorphicDisplays,

  // Brand Activations items - randomly pick from these lists
  'Brand Reveal Videos': brandRevealVideos,
  'Logo Animations': logoAnimations,
  'Trophy Animations': trophyAnimations,
  'Destination Reveals': destinationReveals,
  'Speaker Intros': speakerIntros,
};

export const experienceCategories = [
  {
    sectionId: 'visual-displays',
    title: 'Visual Displays',
    description:
      'Jaw-dropping visual installations from LED walls to anamorphic displays that captivate and mesmerize audiences.',
    items: [
      'Anamorphic Displays',
      'LED Wall Installations',
      'Holographic Displays',
      'Projection Mapping',
      'Interactive Screens',
    ],
    gradient: 'from-primary to-accent',
  },
  {
    sectionId: 'brand-activations',
    title: 'Brand Activations',
    description:
      'Custom experiential activations designed to create unforgettable brand moments and drive engagement.',
    items: [
      'Brand Reveal Videos',
      'Logo Animations',
      'Trophy Animations',
      'Destination Reveals',
      'Speaker Intros',
    ],
    gradient: 'from-secondary to-primary',
  },
  {
    sectionId: 'gaming-interactive',
    title: 'Gaming & Interactive',
    description:
      'Engaging gaming experiences and interactive installations powered by the latest technology for maximum event impact.',
    items: [
      'Quiz Game AV LinkedIn',
      'Fruit Cutter Game AV LinkedIn',
      'Kinect Game AV LinkedIn',
    ],
    gradient: 'from-accent to-primary',
  },
  {
    sectionId: 'ar-visual-experiences',
    title: 'AR & Visual Experiences',
    description:
      'Cutting-edge augmented reality and visual booth experiences creating unforgettable shareable moments.',
    items: [
      'Pepsi AR Booth Video',
      'AR Photo Booth Reel',
      'AI Video Booth Video',
    ],
    gradient: 'from-primary to-neon-pink',
  },
];
