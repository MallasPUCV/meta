const semesters = {
    1: [
        { code: "FIN100-16", name: "Desarrollo Integral y Comunicación para Ingeniería", prereq: [], credits: 3 },
        { code: "MAT1001", name: "Fundamentos de Matemáticas para Ingeniería", prereq: [], credits: 6 },
        { code: "MET143", name: "Fundamentos de Procesos Metalúrgicos", prereq: [], credits: 2 },
        { code: "QUI100", name: "Química para Ingeniería", prereq: [], credits: 5 },
        { code: "IER010", name: "Antropología Cristiana", prereq: [], credits: 2 }
    ],

    2: [
        { code: "EIQ120", name: "Fundamentos de Ingeniería", prereq: ["MET143"], credits: 4 },
        { code: "MAT1002", name: "Cálculo Diferencial e Integral", prereq: ["MAT1001"], credits: 6 },
        { code: "QUI161", name: "Química Inorgánica", prereq: ["QUI100"], credits: 5 },
        { code: "IER020", name: "Ética Cristiana", prereq: [], credits: 2 },
        { code: "FOFU1", name: "Formación Fundamental 1", prereq: [], credits: 2 }
    ],

    3: [
        { code: "EIQ220", name: "Balance de Materia", prereq: ["EIQ120"], credits: 4 },
        { code: "FIS1002", name: "Física para Ingeniería", prereq: ["MAT1002"], credits: 5 },
        { code: "ICA213", name: "Economía", prereq: ["MAT1001"], credits: 3 },
        { code: "ING9001", name: "Inglés 1", prereq: [], credits: 2 },
        { code: "MAT1003", name: "Cálculo en Varias Variables", prereq: ["MAT1002"], credits: 4 }
    ],

    4: [
        { code: "EIQ242", name: "Elementos de Físico Química", prereq: ["EIQ120"], credits: 4 },
        { code: "EIQ288", name: "Métodos Estadísticos en Ingeniería", prereq: ["MAT1003"], credits: 4 },
        { code: "ING9002", name: "Inglés 2", prereq: ["ING9001"], credits: 2 },
        { code: "MAT1005", name: "Ecuaciones Diferenciales", prereq: ["MAT1003"], credits: 4 },
        { code: "MET349", name: "Geología y Mineralogía", prereq: ["QUI161"], credits: 4 },
        { code: "FOFU2", name: "Formación Fundamental 2", prereq: [], credits: 2 }
    ],

    5: [
        { code: "EIQ262", name: "Ciencia de Materiales", prereq: ["QUI161"], credits: 4 },
        { code: "EIQ311", name: "Termodinámica de Procesos", prereq: ["EIQ242"], credits: 4 },
        { code: "EIQ312", name: "Administración de la Producción", prereq: ["ICA213"], credits: 3 },
        { code: "EIQ314", name: "Interpretación de Planos", prereq: ["EIQ220"], credits: 3 },
        { code: "ING9003", name: "Inglés 3", prereq: ["ING9002"], credits: 2 },
        { code: "MET359", name: "Conminución y Clasificación de Minerales", prereq: ["MET349"], credits: 4 }
    ],

    6: [
        { code: "EIQ356", name: "Mecánica de Fluidos", prereq: ["FIS1002"], credits: 4 },
        { code: "EIQ366", name: "Métodos Numéricos en Ingeniería", prereq: ["MAT1005"], credits: 4 },
        { code: "EIQ377", name: "Sistemas Eléctricos de Procesos", prereq: ["FIS1002"], credits: 4 },
        { code: "ING9004", name: "Inglés 4", prereq: ["ING9003"], credits: 2 },
        { code: "MET355", name: "Termodinámica Metalúrgica", prereq: ["EIQ311"], credits: 4 }
    ],

    7: [
        { code: "MET445", name: "Flotación", prereq: ["MET359"], credits: 5 },
        { code: "MET449", name: "Transferencia de Masa Metalúrgica", prereq: ["EIQ356"], credits: 4 },
        { code: "MET454", name: "Transferencia de Calor Metalúrgica", prereq: ["MET355"], credits: 4 },
        { code: "MET455", name: "Electrometalurgia", prereq: ["EIQ377"], credits: 4 },
        { code: "OPT1", name: "Optativo 1", prereq: [], credits: 4 }
    ],

    8: [
        { code: "EIQ476", name: "Ingeniería Económica", prereq: ["EIQ312"], credits: 3 },
        { code: "MET457", name: "Cinética de Procesos Metalúrgicos", prereq: ["MET449"], credits: 4 },
        { code: "MET458", name: "Prevención y Seguridad en Procesos Metalúrgicos", prereq: ["EIQ288"], credits: 3 },
        { code: "MET461", name: "Cálculo de Procesos Metalúrgicos", prereq: ["MET449"], credits: 4 },
        { code: "FOFU3", name: "Formación Fundamental 3", prereq: [], credits: 2 },
        { code: "OPT2", name: "Optativo 2", prereq: [], credits: 4 }
    ],

    9: [
        { code: "MET512", name: "Sustentabilidad Ambiental", prereq: ["EIQ476"], credits: 2 },
        { code: "MET514", name: "Espesamiento y Filtración", prereq: ["MET445"], credits: 5 },
        { code: "MET515", name: "Hidrometalurgia", prereq: ["MET457"], credits: 5 },
        { code: "MET517", name: "Simulación de Procesos Metalúrgicos", prereq: ["MET457"], credits: 4 },
        { code: "MET550", name: "Evaluación de Proyectos Metalúrgicos", prereq: ["MET461"], credits: 3 }
    ],

    10: [
        { code: "EIQ582", name: "Proyecto de Título 1", prereq: ["MET550"], credits: 6 },
        { code: "MET540", name: "Control de Procesos Metalúrgicos", prereq: ["MET517"], credits: 4 },
        { code: "MET544", name: "Pirometalurgia", prereq: ["MET454"], credits: 5 },
        { code: "MET548", name: "Procesos Metalúrgicos Industriales", prereq: ["MET515"], credits: 3 },
        { code: "OPT3", name: "Optativo 3", prereq: [], credits: 4 }
    ],

    11: [
        { code: "EIQ625", name: "Proyecto de Título 2", prereq: ["EIQ582"], credits: 16 }
    ]
};
