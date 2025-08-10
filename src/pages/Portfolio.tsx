
import { ExternalLink, Globe, Smartphone, Monitor, Zap, Users } from 'lucide-react';

function Portfolio() {
  const websites = [
    {
      id: 1,
      title: "COLLAB JUNCTION",
      description: "Creative showcase for designers and developers",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "Stripe"],
      url: "https://www.collabjn.com/",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "UOMO Ecommerce Website",
      description: " Modern online shopping experience with seamless checkout",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Tailwind", "Framer"],
      url: "https://uomo-ecommerce-website.netlify.app/",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: " ACADEMIA",
      description: "Analytics and management platform for businesses",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Vue.js", "Firebase", "Chart.js"],
      url: "https://scintill",
      color: "from-orange-500 to-pink-600"
    }
  ];

  const additionalProjects = [
    {
      id: 4,
      title: "Marsex Agency ",
      description: "Convert visitors into app downloads with compelling design",
      image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Responsive Design", "App Store Integration", "User Analytics"],
      url: "https://marsexserviceagency.com/",
      icon: Smartphone,
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 5,
      title: " Frozen Dream",
      description: "Professional presence for established businesses",
      image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["SEO Optimized", "CMS Integration", "Multi-language"],
      url: "https://v1ctorbarbosa.github.io/Frozen-Dreams/",
      icon: Monitor,
      color: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-slate-800">Web Showcase</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our collection of beautifully crafted websites and digital experiences
          </p>
        </div>

        {/* First Row - 3 Website Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {websites.map((site) => (
            <div
              key={site.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Website Preview */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={site.image}
                  alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${site.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Globe className="h-4 w-4 text-slate-700" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{site.title}</h3>
                <p className="text-slate-600 mb-4 line-clamp-2">{site.description}</p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {site.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(site.url, '_blank')}
                    className={`flex-1 bg-gradient-to-r ${site.color} text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </button>
                  <button className="px-4 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                    <Zap className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - 2 Larger Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {additionalProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <project.icon className="h-6 w-6 text-slate-700" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{project.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${project.color}`} />
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.open(project.url, '_blank')}
                      className={`flex-1 bg-gradient-to-r ${project.color} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
                    >
                      <ExternalLink className="h-5 w-5" />
                      Explore Project
                    </button>
                    <button className="px-4 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                      <Users className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8">
          <p className="text-slate-500">Ready to bring your vision to life?</p>
          <button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;