import {create} from 'zustand'
import type {DraftPatient, Patient} from "../types/Patient.ts";
import {v4 as uuidv4} from 'uuid'

type PatientState = {
  patients: Patient[]
  addPatient: (patient: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => ({
  ...patient,
  id: uuidv4()
})

export const usePatientStore = create<PatientState>((setState, getState) => ({
  patients: [],
  addPatient: (patient: DraftPatient) => {
    const newPatient = createPatient(patient)
    setState(() => ({
      patients: [...getState().patients, newPatient]
    }))
  }
}))

