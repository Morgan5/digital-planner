import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Calendar, CheckSquare, Target, Clock } from 'lucide-react';
import { Guide } from '../types';

const Guides: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const guides: Guide[] = [
    {
      id: '1',
      title: 'Bien organiser son planning',
      category: 'Organisation',
      content: `
      Je suis à cours d'inspi, c'est à toi de voirr
      `,
    },
    {
      id: '2',
      title: 'Astuces pour rester productif',
      category: 'Productivité',
      content: `
      Je suis à cours d'inspi, c'est à toi de voirr
      `,
    },
    {
      id: '3',
      title: 'Utiliser efficacement les to-do lists',
      category: 'Organisation',
      content: `
      Je suis à cours d'inspi, c'est à toi de voirr
      `,
    },
  ];

  if (selectedGuide) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedGuide(null)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux guides</span>
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-sm">
          <div className="mb-6">
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {selectedGuide.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800">{selectedGuide.title}</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {selectedGuide.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Guides d'utilisation</h1>
        <p className="text-gray-600">Découvrez des conseils pour optimiser votre productivité</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {guides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {guide.id === '1' && <Calendar className="w-6 h-6 text-white" />}
                    {guide.id === '2' && <Target className="w-6 h-6 text-white" />}
                    {guide.id === '3' && <CheckSquare className="w-6 h-6 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                        {guide.category}
                      </span>
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700">
                      Cliquez pour lire le guide complet et améliorer votre organisation.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 border border-white/50 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span>À propos des guides</span>
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="bg-white/60 rounded-lg p-3">
                📚 <strong>Objectif :</strong> Ces guides vous aident à maîtriser les meilleures pratiques d'organisation.
              </p>
              <p className="bg-white/60 rounded-lg p-3">
                🎯 <strong>Application :</strong> Mettez en pratique ces conseils dans votre quotidien.
              </p>
              <p className="bg-white/60 rounded-lg p-3">
                📈 <strong>Résultat :</strong> Une productivité accrue et moins de stress.
              </p>
            </div>

            <div className="mt-6 bg-white/60 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Temps de lecture</h4>
              <div className="space-y-2 text-sm">
                {guides.map((guide) => (
                  <div key={guide.id} className="flex justify-between">
                    <span className="truncate mr-2">{guide.title}</span>
                    <span className="font-medium text-purple-600">~3 min</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;