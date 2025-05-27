import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import type { DraftPatient, Patient } from "../types/Patient.ts"
import { v4 as uuidv4 } from 'uuid'
import { notifySuccess, notifyError } from '../utils/notifyUtils'

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

// Combinación de persist y devtools manteniendo ambas funcionalidades
export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set, get) => ({
        patients: [],
        patientToEdit: null,
        
        addPatient: (patient: DraftPatient) => {
          try {
            const newPatient = createPatient(patient)
            set({ patients: [...get().patients, newPatient] })
            notifySuccess(`Paciente ${patient.name} registrado correctamente`)
          } catch (error) {
            notifyError('Hubo un error al registrar el paciente')
            console.error('Error al añadir paciente:', error)
          }
        },
        
        deletePatient: (id: string) => {
          try {
            const patientToDelete = get().patients.find(patient => patient.id === id)
            
            set({
              patients: get().patients.filter(patient => patient.id !== id),
              patientToEdit: get().patientToEdit?.id === id ? null : get().patientToEdit
            })
            
            if (patientToDelete) {
              notifySuccess(`Paciente ${patientToDelete.name} eliminado correctamente`)
            }
          } catch (error) {
            notifyError('Hubo un error al eliminar el paciente')
            console.error('Error al eliminar paciente:', error)
          }
        },
        
        setPatientToEdit: (patient: Patient) => {
          set({ patientToEdit: patient })
        },
        
        clearPatientToEdit: () => {
          set({ patientToEdit: null })
        },
        
        updatePatient: (updatedPatient: Patient) => {
          try {
            set((state) => ({
              patients: state.patients.map(patient =>
                patient.id === updatedPatient.id ? updatedPatient : patient
              ),
              patientToEdit: null
            }))
            notifySuccess(`Paciente ${updatedPatient.name} actualizado correctamente`)
          } catch (error) {
            notifyError('Hubo un error al actualizar el paciente')
            console.error('Error al actualizar paciente:', error)
          }
        }
      }),
      {
        name: 'patients-storage', // Nombre único para identificar en localStorage
        storage: createJSONStorage(() => localStorage), // Usar localStorage
        partialize: (state) => ({ patients: state.patients }), // Solo persistir los pacientes
      }
    ),
    {
      name: 'Patients Store', // Nombre para DevTools
      enabled: true
    }
  )
)

