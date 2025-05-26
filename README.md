# Seguimiento de Pacientes Veterinaria

Este proyecto es una aplicación web diseñada para facilitar el seguimiento y la gestión de pacientes en una clínica veterinaria. Permite registrar nuevos pacientes, ver su información y administrar sus datos de manera eficiente.

## Tecnologías Utilizadas

La aplicación está construida con un stack moderno de tecnologías de desarrollo web:

-   ![React](https://img.shields.io/badge/React-19.1.0-%2361DAFB?style=for-the-badge&logo=react&logoColor=black)
-   ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)
-   ![Vite](https://img.shields.io/badge/Vite-6.3.5-%23646CFF?style=for-the-badge&logo=vite&logoColor=white)
-   ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
-   ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.56.4-%23EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
-   ![Zustand](https://img.shields.io/badge/Zustand-brightgreen?style=for-the-badge&logo=zustand&logoColor=white) <!-- No encontré un logo oficial específico para Zustand en shields.io, usando un color genérico -->

## Características Principales

-   **Registro de Pacientes**: Formulario para ingresar la información de nuevos pacientes.
-   **Listado de Pacientes**: Visualización de los pacientes registrados.
-   **Componente de Errores**: Muestra mensajes de error de validación en los formularios.
-   **Interfaz Responsiva**: Diseño adaptable a diferentes tamaños de pantalla.

## Estructura del Proyecto

El código fuente se organiza principalmente en la carpeta `src`, donde se encuentran:

-   `App.tsx`: Componente principal que orquesta la aplicación.
-   `main.tsx`: Punto de entrada de la aplicación React.
-   `components/`: Directorio que contiene los componentes reutilizables:
    -   `PatientForm.tsx`: Formulario para agregar y editar pacientes.
    -   `PatientsList.tsx`: Componente para mostrar la lista de pacientes.
    -   `Error.tsx`: Componente para mostrar mensajes de error.
-   `index.css`: Estilos globales y configuración de Tailwind CSS.

## Configuración de ESLint

Si estás desarrollando una aplicación de producción, te recomendamos actualizar la configuración para habilitar reglas de lint con reconocimiento de tipos:

```javascript
export default tseslint.config({
  extends: [
    // Elimina ...tseslint.configs.recommended y reemplaza con esto
    ...tseslint.configs.recommendedTypeChecked,
    // Alternativamente, usa esto para reglas más estrictas
    ...tseslint.configs.strictTypeChecked,
    // Opcionalmente, añade esto para reglas estilísticas
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // otras opciones...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```