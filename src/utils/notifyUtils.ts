import { toast, type ToastOptions } from 'react-toastify';

// Opciones básicas para todas las notificaciones
const baseOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"
};

// Opciones personalizadas para cada tipo de notificación
const successOptions: ToastOptions = {
  ...baseOptions,
  className: 'toast-success',
  style: {
    background: '#f0fdf4', // Light green background
    borderLeft: '4px solid #22c55e', // Green border
    color: '#166534' // Dark green text
  }
};

const errorOptions: ToastOptions = {
  ...baseOptions,
  className: 'toast-error',
  style: {
    background: '#fef2f2', // Light red background
    borderLeft: '4px solid #ef4444', // Red border
    color: '#991b1b' // Dark red text
  }
};

const infoOptions: ToastOptions = {
  ...baseOptions,
  className: 'toast-info',
  style: {
    background: '#eff6ff', // Light blue background
    borderLeft: '4px solid #3b82f6', // Blue border
    color: '#1e40af' // Dark blue text
  }
};

// Funciones para mostrar notificaciones
export const notifySuccess = (message: string) => {
  console.log('Mostrando notificación de éxito:', message);
  return toast.success(message, successOptions);
};

export const notifyError = (message: string) => {
  console.log('Mostrando notificación de error:', message);
  return toast.error(message, errorOptions);
};

export const notifyInfo = (message: string) => {
  console.log('Mostrando notificación de info:', message);
  return toast.info(message, infoOptions);
};
