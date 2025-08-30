import React, { useState } from 'react';
import { Plus, FileText, Edit, Trash2, X } from 'lucide-react';
import { Note } from '../types';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      if (editingNote) {
        setNotes(notes.map(note =>
          note.id === editingNote.id
            ? { ...note, title: formData.title, content: formData.content }
            : note
        ));
      } else {
        const newNote: Note = {
          id: Date.now().toString(),
          title: formData.title,
          content: formData.content,
          createdAt: new Date().toLocaleDateString('fr-FR'),
        };
        setNotes([...notes, newNote]);
      }
      setFormData({ title: '', content: '' });
      setShowForm(false);
      setEditingNote(null);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setFormData({ title: '', content: '' });
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notes</h1>
          <p className="text-gray-600">Capturez vos idées et réflexions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {notes.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/50">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune note pour le moment</h3>
              <p className="text-gray-500">Commencez par créer votre première note</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {note.title}
                    </h3>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {note.content}
                  </p>
                  
                  <div className="text-xs text-gray-500 flex items-center space-x-2">
                    <FileText className="w-3 h-3" />
                    <span>Créée le {note.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 border border-white/50 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Guide rapide</span>
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="bg-white/60 rounded-lg p-3">
                📝 <strong>Conseil :</strong> Les notes sont parfaites pour écrire des idées, réflexions ou détails rapides.
              </p>
              <p className="bg-white/60 rounded-lg p-3">
                💭 <strong>Astuce :</strong> Utilise-les comme un carnet digital accessible partout.
              </p>
              <p className="bg-white/60 rounded-lg p-3">
                🔍 <strong>Recommandation :</strong> Donne des titres clairs à tes notes pour les retrouver facilement.
              </p>
            </div>

            {notes.length > 0 && (
              <div className="mt-6 bg-white/60 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Statistiques</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total des notes :</span>
                    <span className="font-medium">{notes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mots moyens par note :</span>
                    <span className="font-medium">
                      {Math.round(notes.reduce((acc, note) => acc + note.content.split(' ').length, 0) / notes.length)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingNote ? 'Modifier la note' : 'Nouvelle note'}
              </h2>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Titre de votre note..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  rows={8}
                  placeholder="Écrivez votre note ici..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  {editingNote ? 'Modifier' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;