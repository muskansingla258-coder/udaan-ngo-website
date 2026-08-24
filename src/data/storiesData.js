/**
 * Stories, Changemakers, and Testimonials Data
 * Syllabus Topics:
 * - ES6 array methods (.filter, .map, .find)
 * - Structured mock data for dynamic rendering
 */

export const featuredStories = [
  {
    id: 'aisha-tech',
    title: "Aisha's Journey to Tech",
    category: 'education',
    tag: 'EDUCATION',
    location: 'Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    summary: 'Aisha, a 14-year-old from a remote village, always dreamed of coding. Through Udaan\'s digital literacy program, she not only learned to program but built an app for her community.',
    fullStory: 'Growing up in a drought-prone district of Rajasthan, 14-year-old Aisha had limited access to electricity, let alone computers. When Udaan established a solar-powered digital center in her panchayat school, Aisha attended daily evening sessions. Within 9 months, she mastered basic web programming and created a simple mobile web app helping local farmers calculate market crop prices. She now dreams of studying computer science at university.',
    quote: '"Learning to code made me realize that geography cannot limit my ambition."'
  },
  {
    id: 'healing-community',
    title: 'Healing the Community',
    category: 'healthcare',
    tag: 'HEALTHCARE',
    location: 'Bihar, India',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    summary: 'When the local clinic closed, mothers in the valley had nowhere to go. Our mobile health units brought essential pediatric care directly to their doorsteps.',
    fullStory: 'In remote flood plains of Bihar, access to maternal and pediatric healthcare required a 30km boat-and-road journey. Udaan deployed two all-terrain mobile clinic vans equipped with ultrasound scanners, rapid diagnostics, and certified nurses. Over 2,400 infants received timely immunizations, reducing seasonal infections by 64% in under one year.',
    quote: '"The mobile clinic saved my child during high fever when no doctors were available."'
  },
  {
    id: 'colors-of-courage',
    title: 'Colors of Courage',
    category: 'arts',
    tag: 'ARTS & EXPRESSION',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    summary: 'Art therapy provided a safe space for trauma recovery. See how young artists are painting their paths forward and transforming public spaces in the city.',
    fullStory: 'Through Udaan\'s weekly expressional art workshops in Dharavi, over 300 children facing traumatic urban displacement found healing and voice through mural painting, sketching, and sculpture. In 2023, the children organized a municipal art gallery exhibition, selling artwork to fund school supplies for their younger siblings.',
    quote: '"When I hold a paintbrush, I feel I can reshape the world around me."'
  }
];

export const videoStories = [
  {
    id: 'video-1',
    title: 'From Classroom to Future: Raju\'s Dream',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    duration: '3:45',
    description: 'Follow 11-year-old Raju as he takes his first steps in the Udaan community school.'
  },
  {
    id: 'video-2',
    title: 'Nutrition on Wheels: The Village Health Van',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    duration: '4:20',
    description: 'A day in the life of Dr. Ananya riding across 6 villages to deliver critical nutrition kits.'
  }
];

export const changemakers = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'LEAD EDUCATOR',
    bio: 'Sarah brings 10 years of experience in rural education and curriculum development.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'david-lee',
    name: 'David Lee',
    role: 'VOLUNTEER COORDINATOR',
    bio: 'David manages our incredible network of over 500 active community volunteers.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    role: 'HEALTH PROGRAMS MANAGER',
    bio: 'Priya oversees all mobile clinic operations and community health outreach.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
  }
];

export const communityQuotes = [
  {
    id: 'quote-1',
    quote: 'The new community center has given my children a safe place to learn and play after school. It\'s changed everything for us.',
    author: 'Meera D.',
    location: 'Local Resident'
  },
  {
    id: 'quote-2',
    quote: 'Before Udaan\'s mobile clinic, the nearest doctor was a two-hour walk away. Now, basic healthcare is finally accessible.',
    author: 'Anil K.',
    location: 'Village Elder'
  }
];

export const homeImpactStories = [
  {
    id: 'story-poonam',
    title: "Poonam's Journey",
    subtitle: 'From out-of-school girl to district topper',
    content: 'Poonam was forced to drop out in 6th grade due to family financial distress. Udaan enrolled her into our evening bridge course and provided learning materials. In 2023, she cleared her 10th board exams with 88% marks and is now mentoring 12 younger girls in her village.'
  },
  {
    id: 'story-manikan',
    title: "Manikan's Story",
    subtitle: 'Overcoming malnutrition with community support',
    content: 'At age two, Manikan suffered from severe acute malnutrition. Through Udaan\'s targeted maternal nutrition drive and daily fortified meals, he regained normal developmental milestones within four months.'
  }
];
