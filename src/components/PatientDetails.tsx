import type {Patient} from "../types/Patient.ts";
import {formatDatePeru} from "../utils/dateFormatter.ts";

type PatientDetailsProps = {
  patient: Patient
}

const PatientDetails = ({patient}: PatientDetailsProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-gray-800 text-xl">
          {patient.name}
          <span className="ml-2 text-sm font-normal bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            Paciente
          </span>
        </h3>
        <div className="bg-gray-50 rounded-full px-3 py-1 text-xs font-semibold text-gray-500">
          Alta: {formatDatePeru(patient.date)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 font-bold mb-1">Propietario:</p>
          <p className="text-gray-800 mb-3">{patient.caretaker}</p>
          
          <p className="text-gray-600 font-bold mb-1">Email:</p>
          <p className="text-gray-800 mb-3 break-words">{patient.email}</p>
        </div>
        
        <div>
          <p className="text-gray-600 font-bold mb-1">Síntomas:</p>
          <p className="text-gray-800">{patient.symptoms}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="py-2 px-4 cursor-pointer uppercase bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>
        
        <button
          type="button"
          className="py-2 px-4 cursor-pointer uppercase bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  )
}
export default PatientDetails
