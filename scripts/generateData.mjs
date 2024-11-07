import fetch from 'node-fetch';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const token = '';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Nouvelle fonction pour récupérer les compétences
async function fetchProjectCompetencies(projectId, token) {
    try {
        const response = await fetch(
            `https://api.openclassrooms.com/projects/${projectId}/learning-outcomes`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const competencies = await response.json();
        console.log(`Compétences récupérées pour le projet ${projectId}:`, competencies);
        return competencies.map(comp => ({
            id: comp.id,
            title: comp.name,
            description: comp.description,
            language: comp.language
        }));
    } catch (error) {
        console.error(`Erreur lors de la récupération des compétences pour le projet ${projectId}:`, error);
        return [];
    }
}

async function generateData() {
    console.log('Début de la génération des données...');
    
    try {
        console.log('Récupération des étudiants...');
        const studentsResponse = await fetch('https://api.openclassrooms.com/mentors/6685751/students', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!studentsResponse.ok) {
            throw new Error(`HTTP error! status: ${studentsResponse.status}`);
        }
        
        const students = await studentsResponse.json();
        console.log(`${students.length} étudiants trouvés`);

        const studentsWithPaths = [];
        for (const student of students) {
            console.log(`Traitement de l'étudiant ${student.displayName}...`);
            await delay(1000);
            
            try {
                const pathResponse = await fetch(
                    `https://api.openclassrooms.com/users/${student.id}/followed-path`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                
                if (!pathResponse.ok) {
                    throw new Error(`HTTP error! status: ${pathResponse.status}`);
                }
                
                const path = await pathResponse.json();

                // Récupération des compétences du projet en cours
                let currentProjectCompetencies = [];
                if (student.followedProject?.id) {
                    console.log(`Récupération des compétences pour le projet ${student.followedProject.id}...`);
                    currentProjectCompetencies = await fetchProjectCompetencies(student.followedProject.id, token);
                }

                studentsWithPaths.push({
                    ...student,
                    path: {
                        title: path.title,
                        completion: path.completion.actual,
                        status: path.completion.status,
                        expectedCompletion: path.completion.expected,
                        currentProject: {
                            ...student.followedProject,
                            competencies: currentProjectCompetencies  // Ajout des compétences ici
                        },
                        projects: path.projects
                    }
                });

                console.log(`✓ Données récupérées pour ${student.displayName}`);
            } catch (error) {
                console.error(`Erreur pour l'étudiant ${student.id}:`, error);
                studentsWithPaths.push(student);
            }
        }

        console.log('Création du dossier data si nécessaire...');
        if (!fs.existsSync('./src/data')) {
            fs.mkdirSync('./src/data', { recursive: true });
        }

        console.log('Écriture du fichier JSON...');
        fs.writeFileSync(
            './src/data/students.json', 
            JSON.stringify(studentsWithPaths, null, 2)
        );

        console.log('✓ Données générées avec succès !');
    } catch (error) {
        console.error('Erreur lors de la génération des données:', error);
        process.exit(1);
    }
}

generateData();