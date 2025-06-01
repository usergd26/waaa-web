// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
const App: React.FC = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isChatOpen, setIsChatOpen] = useState(false);
const statsChartRef = useRef<HTMLDivElement>(null);
const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
const [floatingElements, setFloatingElements] = useState<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }>>([]);
// Initialize floating elements
useEffect(() => {
const elements = [];
for (let i = 0; i < 15; i++) {
elements.push({
x: Math.random() * window.innerWidth,
y: Math.random() * window.innerHeight,
vx: (Math.random() - 0.5) * 0.5,
vy: (Math.random() - 0.5) * 0.5,
size: Math.random() * 30 + 10,
opacity: Math.random() * 0.5 + 0.1
});
}
setFloatingElements(elements);
const animateElements = () => {
setFloatingElements(prevElements =>
prevElements.map(el => {
// Update position
let newX = el.x + el.vx;
let newY = el.y + el.vy;
// Boundary check
if (newX < 0 || newX > window.innerWidth) el.vx *= -1;
if (newY < 0 || newY > window.innerHeight) el.vy *= -1;
// Cursor attraction
const dx = cursorRef.current.x - newX;
const dy = cursorRef.current.y - newY;
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance < 200) {
newX += dx * 0.01;
newY += dy * 0.01;
}
return {
...el,
x: newX,
y: newY
};
})
);
requestAnimationFrame(animateElements);
};
const animationId = requestAnimationFrame(animateElements);
return () => cancelAnimationFrame(animationId);
}, []);
// Track cursor position
useEffect(() => {
const handleMouseMove = (e: MouseEvent) => {
cursorRef.current = { x: e.clientX, y: e.clientY };
};
window.addEventListener('mousemove', handleMouseMove);
return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
// Initialize stats chart
useEffect(() => {
if (statsChartRef.current) {
const chart = echarts.init(statsChartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
axisPointer: {
type: 'shadow'
}
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: [
{
type: 'category',
data: ['Web Dev', 'APIs', 'Automation', 'AI Integration', 'UI/UX'],
axisTick: {
alignWithLabel: true
},
axisLine: {
lineStyle: {
color: 'rgba(255, 255, 255, 0.2)'
}
},
axisLabel: {
color: 'rgba(255, 255, 255, 0.7)'
}
}
],
yAxis: [
{
type: 'value',
axisLine: {
lineStyle: {
color: 'rgba(255, 255, 255, 0.2)'
}
},
axisLabel: {
color: 'rgba(255, 255, 255, 0.7)'
},
splitLine: {
lineStyle: {
color: 'rgba(255, 255, 255, 0.1)'
}
}
}
],
series: [
{
name: 'Projects Completed',
type: 'bar',
barWidth: '60%',
data: [124, 98, 87, 56, 112],
itemStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{ offset: 0, color: '#ff00cc' },
{ offset: 1, color: '#3333ff' }
])
}
}
]
};
chart.setOption(option);
const handleResize = () => {
chart.resize();
};
window.addEventListener('resize', handleResize);
return () => {
chart.dispose();
window.removeEventListener('resize', handleResize);
};
}
}, []);
// Counter animation for stats
const Counter = ({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
const [count, setCount] = useState(0);
const countRef = useRef(0);
const startTimeRef = useRef<number | null>(null);
useEffect(() => {
const animate = (timestamp: number) => {
if (!startTimeRef.current) startTimeRef.current = timestamp;
const progress = timestamp - startTimeRef.current;
const percentage = Math.min(progress / duration, 1);
countRef.current = Math.floor(percentage * end);
setCount(countRef.current);
if (percentage < 1) {
requestAnimationFrame(animate);
}
};
requestAnimationFrame(animate);
return () => {
startTimeRef.current = null;
};
}, [end, duration]);
return <span>{prefix}{count}{suffix}</span>;
};
return (
<div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white overflow-x-hidden">
{/* Floating Elements */}
<div className="fixed inset-0 pointer-events-none z-0">
{floatingElements.map((el, index) => (
<div
key={index}
className="absolute rounded-full"
style={{
  left: `${el.x}px`,
  top: `${el.y}px`,
  width: `${el.size}px`,
  height: `${el.size}px`,
  background: `radial-gradient(circle, rgba(255,0,204,${el.opacity}) 0%, rgba(51,51,255,${el.opacity}) 100%)`,
  transform: 'translate(-50%, -50%)',
  filter: 'blur(8px)',
}}
/>
))}
</div>
{/* Navigation */}
<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black bg-opacity-20 border-b border-white border-opacity-10">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
<div className="flex items-center">
<div className="flex-shrink-0">
<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">Waaa</span>
</div>
<div className="hidden md:block">
<div className="ml-10 flex items-baseline space-x-4">
{['Home', 'Services', 'Projects', 'About', 'Contact'].map((item) => (
<a
key={item}
href={`#${item.toLowerCase()}`}
className="px-3 py-2 rounded-md text-sm font-medium text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-300 cursor-pointer whitespace-nowrap"
>
{item}
</a>
))}
</div>
</div>
</div>
<div className="md:hidden">
<button
onClick={() => setIsMenuOpen(!isMenuOpen)}
className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
>
<i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
</button>
</div>
<div className="hidden md:block">
<button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
Get Started
</button>
</div>
</div>
</div>
{/* Mobile menu */}
<div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-md bg-black bg-opacity-30">
{['Home', 'Services', 'Projects', 'About', 'Contact'].map((item) => (
<a
key={item}
href={`#${item.toLowerCase()}`}
className="block px-3 py-2 rounded-md text-base font-medium text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 cursor-pointer"
>
{item}
</a>
))}
<button className="w-full mt-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
Get Started
</button>
</div>
</div>
</nav>
{/* Hero Section */}
<section className="relative min-h-screen flex items-center pt-16 overflow-hidden" id="home">
<div className="absolute inset-0 z-0">
<img
src="https://readdy.ai/api/search-image?query=futuristic%20digital%20landscape%20with%20abstract%20geometric%20shapes%2C%20neon%20purple%20and%20blue%20lights%2C%20tech%20particles%20floating%20in%20space%2C%20dark%20background%20with%20glowing%20elements%2C%20modern%20cyberpunk%20aesthetic%2C%208K%20ultra%20HD%2C%20depth%20of%20field&width=1920&height=1080&seq=hero-bg-1&orientation=landscape"
alt="Hero Background"
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"></div>
</div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="grid md:grid-cols-2 gap-8 items-center">
<div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
<span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 animate-pulse">Ultra-Modern</span>
<span className="block mt-2">Digital Experiences</span>
</h1>
<p className="text-xl text-gray-300 mb-8">
You dream it. We build it. Let's make the future happen — together at WAAA.
</p>
<div className="flex flex-wrap gap-4">
<button
onClick={() => {
const element = document.getElementById('schedule-call');
element?.scrollIntoView({ behavior: 'smooth' });
}}
className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 text-lg cursor-pointer !rounded-button whitespace-nowrap group relative overflow-hidden"
>
<span className="relative z-10">Schedule Free Call</span>
<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
</button>
</div>
{/* Schedule Call Form */}
<div id="schedule-call" className="mt-8 p-6 backdrop-blur-lg bg-black bg-opacity-30 rounded-2xl border border-white border-opacity-20">
<h3 className="text-xl font-bold mb-4">Schedule a Free Call & Get Our Blueprint</h3>
<form onSubmit={(e) => {
e.preventDefault();
// Here you would typically send this data to your backend
alert('Thank you! We will contact you shortly.');
}}>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
<input
type="text"
placeholder="Your Name"
className="w-full px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
required
/>
<input
type="email"
placeholder="Your Email"
className="w-full px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
required
/>
</div>
<input
type="tel"
placeholder="Phone Number"
className="w-full px-4 py-2 mb-4 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
required
/>
<button
type="submit"
className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
>
Get Free Blueprint
</button>
</form>
</div>
</div>
<div className="hidden md:block relative">
{/* This div is intentionally left empty as the hero background image covers this area */}
</div>
</div>
</div>
</section>
{/* Live Statistics Section */}
<section className="py-20 relative overflow-hidden" id="stats">
<div className="absolute inset-0 z-0">
<div className="absolute inset-0 bg-black bg-opacity-80"></div>
</div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Live Project Statistics</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Real-time updates on our project delivery metrics and performance indicators
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
{[
{ label: 'Projects Delivered', value: 1247, icon: 'fa-rocket' },
{ label: 'Happy Clients', value: 892, icon: 'fa-smile' },
{ label: 'Team Members', value: 156, icon: 'fa-users' },
{ label: 'Awards Won', value: 47, icon: 'fa-trophy' }
].map((stat, index) => (
<div
key={index}
className="backdrop-blur-lg bg-black bg-opacity-20 p-6 rounded-2xl border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300 transform hover:-translate-y-1"
>
<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500">
<i className={`fas ${stat.icon} text-2xl`}></i>
</div>
<h3 className="text-3xl md:text-4xl font-bold text-center mb-2">
<Counter end={stat.value} />
</h3>
<p className="text-center text-gray-300">{stat.label}</p>
</div>
))}
</div>
<div className="backdrop-blur-lg bg-black bg-opacity-20 p-6 rounded-2xl border border-white border-opacity-10">
<h3 className="text-2xl font-bold mb-6 text-center">Project Completion by Category</h3>
<div ref={statsChartRef} className="w-full h-80"></div>
</div>
</div>
</section>
{/* Services Showcase */}
<section className="py-20 relative overflow-hidden" id="services">
<div className="absolute inset-0 z-0">
<img
src="https://readdy.ai/api/search-image?query=abstract%20tech%20background%20with%20geometric%20shapes%2C%20dark%20purple%20and%20blue%20gradient%2C%20digital%20particles%2C%20futuristic%20technology%20concept%2C%20minimalist%20design%20with%20subtle%20grid%20pattern%2C%20professional%20lighting%2C%208K%20ultra%20HD&width=1920&height=1080&seq=services-bg-1&orientation=landscape"
alt="Services Background"
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm"></div>
</div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Cutting-edge digital solutions powered by the latest technologies
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{[
{
title: 'Web Development',
description: 'Modern, responsive websites with cutting-edge technologies and immersive user experiences.',
icon: 'fa-code',
image: 'https://readdy.ai/api/search-image?query=modern%20website%20interface%20with%20glowing%20elements%2C%20digital%20code%20visualization%2C%20futuristic%20web%20development%20concept%2C%20purple%20and%20blue%20neon%20accents%2C%20dark%20background%20with%20tech%20elements%2C%20professional%203D%20rendering%2C%20ultra%20HD&width=600&height=400&seq=web-dev-1&orientation=landscape'
},
{
title: 'API Integration',
description: 'Seamless integration of third-party APIs and development of custom API solutions.',
icon: 'fa-plug',
image: 'https://readdy.ai/api/search-image?query=api%20integration%20concept%20visualization%2C%20connected%20nodes%20with%20data%20flow%2C%20digital%20network%20with%20glowing%20connection%20lines%2C%20futuristic%20tech%20interface%2C%20purple%20and%20blue%20color%20scheme%2C%20dark%20background%20with%20tech%20elements%2C%20professional%203D%20rendering&width=600&height=400&seq=api-1&orientation=landscape'
},
{
title: 'Automation',
description: 'Streamline your workflows with intelligent automation solutions that save time and resources.',
icon: 'fa-robot',
image: 'https://readdy.ai/api/search-image?query=automation%20concept%20with%20robotic%20arms%20and%20digital%20workflow%2C%20futuristic%20factory%20automation%20visualization%2C%20purple%20and%20blue%20neon%20lights%2C%20dark%20tech%20background%2C%20professional%203D%20rendering%20with%20depth%20of%20field%2C%20ultra%20HD&width=600&height=400&seq=automation-1&orientation=landscape'
},
{
title: 'AI Integration',
description: 'Leverage the power of artificial intelligence to enhance your products and services.',
icon: 'fa-brain',
image: 'https://readdy.ai/api/search-image?query=artificial%20intelligence%20visualization%20with%20neural%20network%2C%20digital%20brain%20concept%20with%20glowing%20connections%2C%20futuristic%20AI%20technology%2C%20purple%20and%20blue%20color%20scheme%2C%20dark%20tech%20background%2C%20professional%203D%20rendering%20with%20depth%20of%20field&width=600&height=400&seq=ai-1&orientation=landscape'
},
{
title: 'UI/UX Design',
description: 'Create stunning user interfaces with intuitive experiences that delight your customers.',
icon: 'fa-paint-brush',
image: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20concept%20with%20wireframes%20and%20prototypes%2C%20digital%20interface%20elements%2C%20futuristic%20design%20workspace%2C%20purple%20and%20blue%20color%20accents%2C%20dark%20tech%20background%2C%20professional%203D%20rendering%20with%20depth%20of%20field&width=600&height=400&seq=uiux-1&orientation=landscape'
},
{
title: 'Blockchain Solutions',
description: 'Develop secure and transparent blockchain applications for various industries.',
icon: 'fa-link',
image: 'https://readdy.ai/api/search-image?query=blockchain%20technology%20visualization%20with%20connected%20blocks%2C%20digital%20ledger%20concept%2C%20cryptocurrency%20and%20smart%20contracts%2C%20purple%20and%20blue%20neon%20accents%2C%20dark%20tech%20background%2C%20professional%203D%20rendering%20with%20depth%20of%20field&width=600&height=400&seq=blockchain-1&orientation=landscape'
}
].map((service, index) => (
<div
key={index}
className="backdrop-blur-lg bg-black bg-opacity-20 rounded-2xl border border-white border-opacity-10 overflow-hidden group hover:border-opacity-30 transition-all duration-500 transform hover:-translate-y-2"
>
<div className="h-48 overflow-hidden">
<img
src={service.image}
alt={service.title}
className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
/>
</div>
<div className="p-6">
<div className="flex items-center mb-4">
<div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-3">
<i className={`fas ${service.icon}`}></i>
</div>
<h3 className="text-xl font-bold">{service.title}</h3>
</div>
<p className="text-gray-300 mb-4">{service.description}</p>
<a href="#" className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-300 cursor-pointer">
Learn more <i className="fas fa-arrow-right ml-2"></i>
</a>
</div>
</div>
))}
</div>
</div>
</section>
{/* About Us Section */}
<section className="py-20 relative overflow-hidden" id="about">
<div className="absolute inset-0 z-0">
<img
src="https://readdy.ai/api/search-image?query=modern%20office%20interior%20with%20creative%20team%20working%2C%20tech%20startup%20environment%2C%20collaborative%20workspace%20with%20glass%20walls%20and%20digital%20displays%2C%20purple%20and%20blue%20ambient%20lighting%2C%20professional%20photography%20with%20depth%20of%20field%2C%20ultra%20HD&width=1920&height=1080&seq=about-bg-1&orientation=landscape"
alt="About Us Background"
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm"></div>
</div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
From startup to industry leader: Our story of innovation and success
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
<div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
<h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
Transforming Ideas into Reality
</h3>
<p className="text-gray-300 mb-6">
Founded in 2020, Waaa began with a vision to revolutionize digital experiences. Our journey started with a small team of passionate innovators who believed in pushing the boundaries of what's possible in web development and digital solutions.
</p>
<p className="text-gray-300 mb-6">
Today, we've grown into a team of 32 experts, serving clients globally and delivering cutting-edge solutions that drive real business results. Our commitment to innovation and excellence has earned us recognition as a leader in the digital transformation space.
</p>
<div className="flex items-center gap-8">
<div className="text-center">
<div className="text-3xl font-bold text-pink-500 mb-2">
<Counter end={200} suffix="+" />
</div>
<p className="text-sm text-gray-400">Projects Completed</p>
</div>
<div className="text-center">
<div className="text-3xl font-bold text-blue-500 mb-2">
<Counter end={50} suffix="+" />
</div>
<p className="text-sm text-gray-400">Global Clients</p>
</div>
<div className="text-center">
<div className="text-3xl font-bold text-purple-500 mb-2">
<Counter end={15} suffix="+" />
</div>
<p className="text-sm text-gray-400">Industry Awards</p>
</div>
</div>
</div>
<div className="relative">
<div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl opacity-30 blur-lg"></div>
<div className="relative backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
<h3 className="text-2xl font-bold mb-6">Success Story: TechVision Transformation</h3>
<div className="mb-6">
<img
src="https://readdy.ai/api/search-image?query=modern%20tech%20company%20office%20transformation%2C%20before%20and%20after%20visualization%2C%20digital%20workspace%20evolution%2C%20sleek%20design%20with%20purple%20and%20blue%20accents%2C%20professional%20business%20environment%2C%20high%20quality%20corporate%20photography&width=800&height=400&seq=success-story-1&orientation=landscape"
alt="Success Story"
className="w-full h-48 object-cover rounded-lg mb-6"
/>
<p className="text-gray-300 mb-4">
When TechVision approached us in 2023, they were struggling with outdated systems and declining user engagement. Their challenge: modernize their digital infrastructure while maintaining business continuity.
</p>
<p className="text-gray-300 mb-4">
Our solution combined cutting-edge web development with AI integration, resulting in:
</p>
<ul className="space-y-2 text-gray-300 mb-6">
<li className="flex items-center">
<i className="fas fa-check-circle text-pink-500 mr-2"></i>
300% increase in user engagement
</li>
<li className="flex items-center">
<i className="fas fa-check-circle text-pink-500 mr-2"></i>
50% reduction in operational costs
</li>
<li className="flex items-center">
<i className="fas fa-check-circle text-pink-500 mr-2"></i>
95% improvement in system performance
</li>
</ul>
<div className="flex justify-end">
<button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
Read Full Case Study
</button>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{[
{
title: 'Our Mission',
description: 'To empower businesses with innovative digital solutions that drive growth and success in the modern digital landscape.',
icon: 'fa-rocket'
},
{
title: 'Our Vision',
description: 'To be the global leader in creating transformative digital experiences that shape the future of technology.',
icon: 'fa-eye'
},
{
title: 'Our Values',
description: 'Innovation, excellence, collaboration, and unwavering commitment to delivering value to our clients.',
icon: 'fa-heart'
}
].map((item, index) => (
<div key={index} className="backdrop-blur-lg bg-black bg-opacity-20 p-6 rounded-2xl border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300">
<div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mb-4">
<i className={`fas ${item.icon} text-xl`}></i>
</div>
<h3 className="text-xl font-bold mb-3">{item.title}</h3>
<p className="text-gray-300">{item.description}</p>
</div>
))}
</div>
</div>
</section>
{/* Projects Section */}
<section className="py-20 relative overflow-hidden" id="projects">
<div className="absolute inset-0 z-0">
<img
src="https://readdy.ai/api/search-image?query=modern%20tech%20workspace%20with%20multiple%20screens%20showing%20various%20digital%20projects%2C%20futuristic%20office%20environment%2C%20purple%20and%20blue%20ambient%20lighting%2C%20professional%20photography%20with%20depth%20of%20field%2C%20ultra%20HD&width=1920&height=1080&seq=projects-bg-1&orientation=landscape"
alt="Projects Background"
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm"></div>
</div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Our Featured Projects</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Transforming ideas into groundbreaking digital solutions
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{[
{
title: "NexusAI Trading Platform",
category: "AI & Blockchain",
description: "Revolutionary AI-powered trading platform with real-time market analysis",
image: "https://readdy.ai/api/search-image?query=futuristic%20trading%20platform%20interface%20with%20holographic%20charts%20and%20AI%20visualization%2C%20cryptocurrency%20and%20stock%20market%20data%2C%20dark%20theme%20with%20blue%20accents%2C%20professional%20UI%20design&width=600&height=400&seq=project-1&orientation=landscape"
},
{
title: "EcoTrack Smart City",
category: "IoT Solutions",
description: "Smart city management system for environmental monitoring",
image: "https://readdy.ai/api/search-image?query=smart%20city%20visualization%20with%20connected%20IoT%20devices%2C%20environmental%20monitoring%20dashboard%2C%20modern%20city%20landscape%2C%20futuristic%20interface%20design&width=600&height=400&seq=project-2&orientation=landscape"
},
{
title: "MediChain Health",
category: "Healthcare",
description: "Blockchain-based healthcare records management system",
image: "https://readdy.ai/api/search-image?query=medical%20data%20visualization%20interface%2C%20healthcare%20blockchain%20concept%2C%20secure%20patient%20records%20system%2C%20professional%20medical%20dashboard%20design&width=600&height=400&seq=project-3&orientation=landscape"
},
{
title: "VirtualLearn Academy",
category: "EdTech",
description: "Immersive VR-based learning platform for remote education",
image: "https://readdy.ai/api/search-image?query=virtual%20reality%20classroom%20environment%2C%20educational%20platform%20interface%2C%20interactive%20learning%20tools%2C%20modern%20educational%20technology&width=600&height=400&seq=project-4&orientation=landscape"
},
{
title: "FinFlow Banking",
category: "FinTech",
description: "Next-gen digital banking platform with AI-driven insights",
image: "https://readdy.ai/api/search-image?query=modern%20banking%20interface%20with%20financial%20analytics%2C%20digital%20payment%20system%2C%20secure%20transaction%20dashboard%2C%20professional%20fintech%20design&width=600&height=400&seq=project-5&orientation=landscape"
},
{
title: "RetailPro Analytics",
category: "Retail Tech",
description: "AI-powered retail analytics and inventory management system",
image: "https://readdy.ai/api/search-image?query=retail%20analytics%20dashboard%20with%20inventory%20management%2C%20sales%20prediction%20charts%2C%20modern%20store%20management%20interface&width=600&height=400&seq=project-6&orientation=landscape"
},
{
title: "SecureChain Defense",
category: "Cybersecurity",
description: "Advanced cybersecurity platform with blockchain integration",
image: "https://readdy.ai/api/search-image?query=cybersecurity%20interface%20with%20network%20protection%20visualization%2C%20security%20monitoring%20dashboard%2C%20digital%20threat%20detection&width=600&height=400&seq=project-7&orientation=landscape"
},
{
title: "SmartAgri Solutions",
category: "AgriTech",
description: "IoT-based smart agriculture monitoring system",
image: "https://readdy.ai/api/search-image?query=agricultural%20monitoring%20dashboard%20with%20crop%20analysis%2C%20weather%20data%2C%20smart%20farming%20interface%2C%20modern%20agritech%20design&width=600&height=400&seq=project-8&orientation=landscape"
},
{
title: "LogisticX Pro",
category: "Supply Chain",
description: "Blockchain-powered supply chain management platform",
image: "https://readdy.ai/api/search-image?query=supply%20chain%20management%20interface%20with%20logistics%20tracking%2C%20warehouse%20management%20dashboard%2C%20modern%20shipping%20analytics&width=600&height=400&seq=project-9&orientation=landscape"
}
].map((project, index) => (
<div
key={index}
className="backdrop-blur-lg bg-black bg-opacity-20 rounded-2xl border border-white border-opacity-10 overflow-hidden group hover:border-opacity-30 transition-all duration-500 transform hover:-translate-y-2"
>
<div className="h-48 overflow-hidden">
<img
src={project.image}
alt={project.title}
className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
/>
</div>
<div className="p-6">
<span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full text-sm font-medium mb-3">
{project.category}
</span>
<h3 className="text-xl font-bold mb-2">{project.title}</h3>
<p className="text-gray-300 mb-4">{project.description}</p>
<a href="#" className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-300 cursor-pointer">
View Details <i className="fas fa-arrow-right ml-2"></i>
</a>
</div>
</div>
))}
</div>
<div className="text-center mt-12">
<button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
View All Projects
</button>
</div>
</div>
</section>
{/* Testimonials Section */}
<section className="py-20 relative overflow-hidden" id="testimonials">
<div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900 to-black"></div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Hear what our clients have to say about their experience working with us
</p>
</div>
<div className="max-w-5xl mx-auto">
<Swiper
modules={[Pagination, Autoplay]}
pagination={{ clickable: true }}
autoplay={{ delay: 5000, disableOnInteraction: false }}
spaceBetween={30}
slidesPerView={1}
className="testimonial-swiper"
>
{[
{
name: 'Sarah Johnson',
position: 'CEO, TechVision',
image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20female%20CEO%20with%20modern%20business%20attire%2C%20neutral%20expression%2C%20studio%20lighting%2C%20clean%20background%2C%20high%20quality%20portrait%2C%20professional%20photography%2C%20realistic&width=200&height=200&seq=testimonial-1&orientation=squarish',
quote: 'Working with Waaa has been a game-changer for our business. Their innovative approach to web development and AI integration has helped us stay ahead of the competition. The team is responsive, creative, and technically brilliant.'
},
{
name: 'Michael Chen',
position: 'CTO, Innovate Labs',
image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20male%20CTO%20with%20modern%20business%20attire%2C%20neutral%20expression%2C%20studio%20lighting%2C%20clean%20background%2C%20high%20quality%20portrait%2C%20professional%20photography%2C%20realistic&width=200&height=200&seq=testimonial-2&orientation=squarish',
quote: 'The automation solutions provided by Waaa have revolutionized our internal processes. We\'ve seen a 40% increase in productivity and significant cost savings. Their technical expertise and attention to detail are unmatched in the industry.'
},
{
name: 'Emily Rodriguez',
position: 'Marketing Director, GrowthX',
image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20female%20marketing%20director%20with%20modern%20business%20attire%2C%20neutral%20expression%2C%20studio%20lighting%2C%20clean%20background%2C%20high%20quality%20portrait%2C%20professional%20photography%2C%20realistic&width=200&height=200&seq=testimonial-3&orientation=squarish',
quote: 'The UI/UX design work that Waaa delivered exceeded our expectations. Our website conversion rate has increased by 35% since the redesign. They truly understand how to create digital experiences that engage and convert visitors.'
}
].map((testimonial, index) => (
<SwiperSlide key={index}>
<div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 md:p-10 rounded-2xl border border-white border-opacity-10">
<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
<div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-pink-500">
<img
src={testimonial.image}
alt={testimonial.name}
className="w-full h-full object-cover"
/>
</div>
<div>
<div className="text-pink-400 mb-4">
<i className="fas fa-quote-left text-3xl opacity-50"></i>
</div>
<p className="text-lg mb-6 italic text-gray-300">"{testimonial.quote}"</p>
<div>
<h4 className="text-xl font-bold">{testimonial.name}</h4>
<p className="text-gray-400">{testimonial.position}</p>
</div>
</div>
</div>
</div>
</SwiperSlide>
))}
</Swiper>
</div>
</div>
</section>
{/* Contact Form */}
<section className="py-20 relative overflow-hidden" id="contact">
<div className="absolute inset-0 z-0">
<img
src="https://readdy.ai/api/search-image?query=futuristic%20contact%20center%20with%20holographic%20interfaces%2C%20digital%20communication%20concept%2C%20purple%20and%20blue%20neon%20lights%2C%20dark%20tech%20environment%2C%20professional%203D%20rendering%20with%20depth%20of%20field%2C%20ultra%20HD%20quality&width=1920&height=1080&seq=contact-bg-1&orientation=landscape"
alt="Contact Background"
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 bg-black bg-opacity-80 backdrop-filter backdrop-blur-sm"></div>
</div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
<p className="text-xl text-gray-300 max-w-3xl mx-auto">
Ready to start your next project? Contact us today for a free consultation
</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
<div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
<h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
<form>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
<div>
<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
<input
type="text"
id="name"
className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
placeholder="John Doe"
/>
</div>
<div>
<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
<input
type="email"
id="email"
className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
placeholder="john@example.com"
/>
</div>
</div>
<div className="mb-6">
<label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
<input
type="text"
id="subject"
className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
placeholder="Project Inquiry"
/>
</div>
<div className="mb-6">
<label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
<textarea
id="message"
rows={5}
className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
placeholder="Tell us about your project..."
></textarea>
</div>
<button
type="submit"
className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
>
Send Message
</button>
</form>
</div>
<div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
<h3 className="text-2xl font-bold mb-6">Contact Information</h3>
<div className="space-y-6">
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
<i className="fas fa-map-marker-alt"></i>
</div>
<div>
<h4 className="text-lg font-medium mb-1">Our Locations</h4>
<p className="text-gray-300">
123 Innovation Drive, Tech Hub, San Francisco, CA 94107<br/>
42 Tech Park, Electronic City, Bangalore 560100
</p>
</div>
</div>
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
<i className="fas fa-phone-alt"></i>
</div>
<div>
<h4 className="text-lg font-medium mb-1">Phone Numbers</h4>
<p className="text-gray-300">
US: +1 (555) 123-4567<br/>
India: +91 708-666-5218
</p>
</div>
</div>
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
<i className="fas fa-envelope"></i>
</div>
<div>
<h4 className="text-lg font-medium mb-1">Email Address</h4>
<p className="text-gray-300">info@waaa.tech</p>
</div>
</div>
</div>
<div className="mt-8">
<h4 className="text-lg font-medium mb-4">Follow Us</h4>
<div className="flex space-x-4">
{['fa-facebook-f', 'fa-twitter', 'fa-instagram', 'fa-linkedin-in', 'fa-github'].map((icon, index) => (
<a
key={index}
href="#"
className="w-10 h-10 rounded-full bg-black bg-opacity-50 border border-white border-opacity-20 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 transition-all duration-300 cursor-pointer"
>
<i className={`fab ${icon}`}></i>
</a>
))}
</div>
</div>
</div>
</div>
</div>
</section>
{/* Footer */}
<footer className="py-12 bg-black bg-opacity-90 border-t border-white border-opacity-10">
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
<div>
<h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 mb-4">Waaa</h3>
<p className="text-gray-400 mb-4">
Creating ultra-modern digital experiences with cutting-edge technology and immersive design.
</p>
<div className="flex space-x-4">
{['fa-facebook-f', 'fa-twitter', 'fa-instagram', 'fa-linkedin-in'].map((icon, index) => (
<a
key={index}
href="#"
className="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 transition-all duration-300 cursor-pointer"
>
<i className={`fab ${icon} text-sm`}></i>
</a>
))}
</div>
</div>
<div>
<h4 className="text-lg font-bold mb-4">Services</h4>
<ul className="space-y-2">
{['Web Development', 'API Integration', 'Automation', 'AI Integration', 'UI/UX Design', 'Blockchain Solutions'].map((item, index) => (
<li key={index}>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
{item}
</a>
</li>
))}
</ul>
</div>
<div>
<h4 className="text-lg font-bold mb-4">Company</h4>
<ul className="space-y-2">
{['About Us', 'Our Team', 'Careers', 'Blog', 'Contact Us', 'Privacy Policy'].map((item, index) => (
<li key={index}>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
{item}
</a>
</li>
))}
</ul>
</div>
<div>
<h4 className="text-lg font-bold mb-4">Newsletter</h4>
<p className="text-gray-400 mb-4">
Subscribe to our newsletter to receive updates on our latest projects and technologies.
</p>
<form className="flex">
<input
type="email"
placeholder="Your email"
className="flex-grow px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
/>
<button
type="submit"
className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-r-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-paper-plane"></i>
</button>
</form>
</div>
</div>
<div className="pt-8 border-t border-white border-opacity-10 text-center">
<p className="text-gray-400">
&copy; {new Date().getFullYear()} Waaa. All rights reserved.
</p>
<div className="flex justify-center space-x-4 mt-4">
{['fa-cc-visa', 'fa-cc-mastercard', 'fa-cc-paypal', 'fa-cc-apple-pay'].map((icon, index) => (
<i key={index} className={`fab ${icon} text-2xl text-gray-500`}></i>
))}
</div>
</div>
</div>
</footer>
{/* AI Chat Bot */}
<div className="fixed bottom-6 right-6 z-50" style={{ pointerEvents: 'auto' }}>
<button
onClick={() => setIsChatOpen(!isChatOpen)}
className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center shadow-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
>
<i className={`fas ${isChatOpen ? 'fa-times' : 'fa-robot'} text-2xl`}></i>
</button>
{isChatOpen && (
<div className="absolute bottom-20 right-0 w-80 backdrop-blur-lg bg-black bg-opacity-80 rounded-2xl border border-white border-opacity-20 shadow-2xl overflow-hidden">
<div className="p-4 bg-gradient-to-r from-pink-500 to-blue-500">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
<i className="fas fa-robot text-xl"></i>
</div>
<div>
<h3 className="font-bold">Waaa Assistant</h3>
<p className="text-sm text-white text-opacity-80">AI Powered Support</p>
</div>
</div>
</div>
<div className="h-80 p-4 overflow-y-auto">
<div className="flex flex-col space-y-4">
<div className="flex items-start">
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0">
<i className="fas fa-robot text-sm"></i>
</div>
<div className="bg-white bg-opacity-10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
<p className="text-sm">Hello! Welcome to Waaa. How can I assist you today?</p>
</div>
</div>
</div>
</div>
<div className="p-4 border-t border-white border-opacity-10">
<form className="flex">
<input
type="text"
placeholder="Type your message..."
className="flex-grow px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
/>
<button
type="submit"
className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-r-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-paper-plane"></i>
</button>
</form>
</div>
</div>
)}
</div>
</div>
);
};
export default App