import {create} from 'zustand'
import type {DraftPatient, Patient} from "../types/Patient.ts";
import {v4 as uuidv4} from 'uuid'
import { notifySuccess, notifyError } from '../utils/notifyUtils';

type PatientState = {
  patients: Patient[]
  patientToEdit: Patient | null
  addPatient: (patient: DraftPatient) => void
  deletePatient: (id: string) => void
  setPatientToEdit: (patient: Patient) => void
  clearPatientToEdit: () => void
  updatePatient: (updatedPatient: Patient) => void
}

const createPatient = (patient: DraftPatient): Patient => ({
  ...patient,
  id: uuidv4()
})

export const usePatientStore = create<PatientState>((setState, getState) => ({
  patients: [],
  
  addPatient: (patient: DraftPatient) => {
    try {
      const newPatient = createPatient(patient)
      setState(() => ({
        patients: [...getState().patients, newPatient]
      }))
      notifySuccess(`Paciente ${patient.name} registrado correctamente`);
    } catch (error) {
      notifyError('Hubo un error al registrar el paciente');
      console.error('Error al añadir paciente:', error);
    }
  },
  
  deletePatient: (id: string) => {
    try {
      // Obtener el nombre del paciente antes de eliminarlo para usarlo en la notificación
      const patientToDelete = getState().patients.find(patient => patient.id === id);
      
      setState(() => ({
        patients: getState().patients.filter(patient => patient.id !== id),
        // Si estamos eliminando el paciente que estamos editando, limpiar patientToEdit
        patientToEdit: getState().patientToEdit?.id === id ? null : getState().patientToEdit
      }))
      
      if (patientToDelete) {
        notifySuccess(`Paciente ${patientToDelete.name} eliminado correctamente`);
      }
    } catch (error) {
      notifyError('Hubo un error al eliminar el paciente');
      console.error('Error al eliminar paciente:', error);
    }
  },
  
  // Estado para el paciente en edición
  patientToEdit: null,

  // Establecer paciente para editar
  setPatientToEdit: (patient: Patient) => {
    setState(() => ({patientToEdit: patient}))
  },

  // Limpiar paciente en edición
  clearPatientToEdit: () => {
    setState(() => ({patientToEdit: null}))
  },

  // Actualizar paciente existente
  updatePatient: (updatedPatient: Patient) => {
    try {
      setState((state) => ({
        patients: state.patients.map(patient =>
          patient.id === updatedPatient.id ? updatedPatient : patient
        ),
        patientToEdit: null // Limpiar después de actualizar
      }))
      notifySuccess(`Paciente ${updatedPatient.name} actualizado correctamente`);
    } catch (error) {
      notifyError('Hubo un error al actualizar el paciente');
      console.error('Error al actualizar paciente:', error);
    }
  }
}))

