package com.minsih.chronoman.data;

// CSTE
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.minsih.chronoman.model.PredefinedActivity;
import com.minsih.chronoman.model.PredefinedTask;
import com.minsih.chronoman.repository.PredefinedActivityRepository;
import com.minsih.chronoman.repository.PredefinedTaskRepository;
// Analyse et Programmation des reseaux informatique, (Configuration des modems, routers,Analyse de traffique, microtik, cisco et autre, gestion des bande passante)

// @Component
public class DatabaseSeeder implements CommandLineRunner {

    private final PredefinedActivityRepository predefinedActivityRepository;
    private final PredefinedTaskRepository predefinedTaskRepository;

    public DatabaseSeeder(PredefinedActivityRepository predefinedActivityRepository,
            PredefinedTaskRepository predefinedTaskRepository) {
        this.predefinedActivityRepository = predefinedActivityRepository;
        this.predefinedTaskRepository = predefinedTaskRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedPredefinedActivities();
        seedPredefinedTasks();
    }

    private void seedPredefinedActivities() {
        String[] activityNames = {
                "Préparation du site",
                "Fondations",
                "Structure",
                "Systèmes électriques et de plomberie",
                "Revêtements extérieurs",
                "Toiture",
                "Travaux intérieurs",
                "Finitions",
                "Aménagement extérieur",
                "Nettoyage final du chantier"
        };

        for (String name : activityNames) {
            PredefinedActivity predefinedActivity = new PredefinedActivity();
            predefinedActivity.setName(name);
            predefinedActivityRepository.save(predefinedActivity);
        }
    }

    private void seedPredefinedTasks() {

        String[][] tasks = {
                // Tasks for "Préparation du site"
                { "Délimitation du chantier", "Défrichage et débroussaillage", "Démolition des structures existantes",
                        "Nivellement du terrain" },
                // Tasks for "Fondations"
                { "Excavation", "Coulage de béton", "Installation des armatures" },
                // Tasks for "Structure"
                { "Érection des murs", "Pose des planchers", "Installation des poutres et des charpentes" },
                // Tasks for "Systèmes électriques et de plomberie"
                { "Câblage électrique", "Installation des conduites d'eau et de gaz",
                        "Pose des équipements sanitaires" },
                // Tasks for "Revêtements extérieurs"
                { "Pose des revêtements de façade", "Installation des portes et fenêtres" },
                // Tasks for "Toiture"
                { "Installation de la charpente de toit", "Pose de la couverture (tuiles, bardeaux, etc.)" },
                // Tasks for "Travaux intérieurs"
                { "Cloisonnement intérieur", "Pose des revêtements de sol et de mur",
                        "Installation des équipements (cuisine, salle de bains, etc.)" },
                // Tasks for "Finitions"
                { "Peinture", "Installation des luminaires", "Finitions décoratives" },
                // Tasks for "Aménagement extérieur"
                { "Création des espaces verts", "Installation des clôtures et portails",
                        "Aménagement des allées et des accès" },
                // Tasks for "Nettoyage final du chantier"
                { "Enlèvement des déchets de construction", "Balayage et nettoyage général" }
        };

        for (int i = 0; i < tasks.length; i++) {
            for (String taskName : tasks[i]) {
                PredefinedTask predefinedTask = new PredefinedTask();
                predefinedTask.setPredefinedActivity(predefinedActivityRepository.findById((long) (i + 1)).orElse(null));
                predefinedTask.setName(taskName);
                predefinedTaskRepository.save(predefinedTask);
            }
        }
    }

}
