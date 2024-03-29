import { writable } from 'svelte/store';

export const refreshSession = writable({});

export const API_URL = "https://api.joinconecty.com";
export const INDUSTRIES = [
  "agremiaciones y camaras de comercio", 
  "agroindustria", 
  "arquitectura y diseño", 
  "aseo", 
  "auditoria", 
  "automotriz", 
  "banca e inversión", 
  "construccion", 
  "construcción de maquinaria", 
  "consultoria", 
  "consumo masivo", 
  "educación", 
  "electricidad", 
  "gas y agua", 
  "entretenimiento", 
  "explotación de bienes inmuebles",
  "fabricación de productos químicos",
  "fundaciones y entidades sin animo de lucro",
  "industria del papel",
  "imprenta y editoriales",
  "industrias de bebidas",
  "industrias del tabaco",
  "industrias manufactureras",
  "industrias metálicas",
  "institutos de investigación y científicos",
  "logistica y distribución",
  "manufactura",
  "medios de comunicación",
  "mineria petroleo y canteras",
  "otros productos",
  "otros servicios",
  "producción agropecuaria",
  "productos alimenticios",
  "publicidad y marketing",
  "quimica",
  "restaurantes",
  "retail",
  "salud",
  "sector público",
  "seguros",
  "servicios contables",
  "servicios financieros",
  "servicios juridicos",
  "servicios tributarios",
  "servicios técnicos",
  "tecnología",
  "telecomunicaciones",
  "textil y marroquinería",
  "transporte",
  "turismo y hoteles"
]

export const CATEGORY = [
  "agriculture",
  "agroindustry",
  "clothing",
  "other"
];
