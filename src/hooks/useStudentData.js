import { useState, useEffect } from 'react';
import studentsData from '../data/students.json';

export const useStudentData = (studentId) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('Recherche de l\'étudiant avec ID:', studentId);
      console.log('Données disponibles:', studentsData);
      
      const foundStudent = studentsData.find(s => {
        console.log('Comparaison:', s.id, studentId, s.id === studentId);
        return String(s.id) === String(studentId);  // Conversion en string pour la comparaison
      });

      if (foundStudent) {
        console.log('Étudiant trouvé:', foundStudent);
        setStudent(foundStudent);
      } else {
        console.log('Aucun étudiant trouvé avec cet ID');
        setError('Étudiant non trouvé');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { student, loading, error };
};