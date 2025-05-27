import {create} from 'zustand'
import type {Patient} from "../types/Patient.ts";

type PatientState = {
  patients: Patient[]
}

export const usePatientStore = create<PatientState>(() => ({
  patients: [],
}))

