import React from 'react';
import { Calendar, CheckSquare, FileText, BookOpen, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const sections = [
    {
      id: 'agenda',
      title: 'Agenda / Planning',
      description: 'Planifiez vos événements et rendez-vous',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'todo',
      title: 'To-Do List',
      description: 'Gérez vos tâches quotidiennes',
      icon: CheckSquare,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      id: 'notes',
      title: 'Notes',
      description: 'Notez vos idées et réflexions',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'guides',
      title: 'Guides',
      description: 'Consultez les guides d\'utilisation',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenue dans votre{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Digital Planner
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          Organisez votre vie avec nos outils de planification intuitifs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`${section.bgColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border border-white/50 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                {section.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700">
                {section.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Conseils d'utilisation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <p className="text-gray-700">Commencez par organiser votre agenda pour structurer vos journées</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <p className="text-gray-700">Utilisez les to-do lists pour ne rien oublier</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <p className="text-gray-700">Prenez des notes pour capturer vos idées</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <p className="text-gray-700">Consultez les guides pour optimiser votre productivité</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;